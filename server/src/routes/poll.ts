import { z } from "zod";
import ShortUniqueId from "short-unique-id";

import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return {
      count,
    };
  });

  fastify.get(
    "/pools",
    {
      onRequest: [authenticate],
    },
    async (req, reply) => {
      const polls = await prisma.pool.findMany({
        where: {
          participants: {
            some: {
              id: req.user.sub,
            },
          },
        },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },
          participants: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return reply.status(200).send({ polls });
    }
  );

  fastify.get("/pools/:id", async (req, reply) => {
    const getPoolParams = z.object({
      id: z.string(),
    });

    const { id } = getPoolParams.parse(req.params);

    const poolInfo = await prisma.pool.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return reply.status(200).send({ poolInfo });
  });

  fastify.post("/pools", async (req, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    try {
      await req.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: req.user.sub,

          participants: {
            create: {
              userId: req.user.sub,
            },
          },
        },
      });
    } catch (err) {
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }

    return reply.status(201).send({ code });
  });

  fastify.post(
    "/pools/join",
    {
      onRequest: [authenticate],
    },
    async (req, reply) => {
      const joinPoolBody = z.object({
        code: z.string(),
      });

      const { code } = joinPoolBody.parse(req.body);

      const poll = await prisma.pool.findUnique({
        where: { code },
        include: {
          participants: {
            where: {
              userId: req.user.sub,
            },
          },
        },
      });

      if (!poll) {
        return reply.status(400).send({ message: "Bolão não encontrado" });
      }

      if (poll.participants.length > 0) {
        return reply
          .status(400)
          .send({ message: "Você já está participando nesse bolão" });
      }

      if (!poll.ownerId) {
        await prisma.pool.update({
          where: {
            id: poll.id,
          },
          data: {
            ownerId: req.user.sub,
          },
        });
      }

      await prisma.participant.create({
        data: {
          userId: req.user.sub,
          poolId: poll.id,
        },
      });

      return reply.status(201).send();
    }
  );
}

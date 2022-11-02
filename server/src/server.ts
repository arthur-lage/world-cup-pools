import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import ShortUniqueId from 'short-unique-id'

import cors from "@fastify/cors";

import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, { origin: true });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return {
      count,
    };
  });

  fastify.post("/pools", async (req, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });

  fastify.get("/users/count", async () => {
    const count = await prisma.user.count()
    
    return {
      count
    }
  })

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count()
    
    return {
      count
    }
  })

  await fastify.listen({ port: Number(PORT), host: "0.0.0.0" });
}

bootstrap();

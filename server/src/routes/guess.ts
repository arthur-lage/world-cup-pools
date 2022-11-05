import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return {
      count,
    };
  });

  fastify.post(
    "/pools/:poolId/games/:gameId/guesses",
    { onRequest: [authenticate] },
    async (req, reply) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      });

      const createGuessBody = z.object({
        firstTeamScore: z.number(),
        secondTeamScore: z.number(),
      });

      const { gameId, poolId } = createGuessParams.parse(req.params);
      const { firstTeamScore, secondTeamScore } = createGuessBody.parse(
        req.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: req.user.sub,
          },
        },
      });

      if (!participant) {
        return reply
          .status(400)
          .send({ message: "Você não pode criar um palpite nesse bolão" });
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          },
        },
      });

      if (guess) {
        return reply
          .status(400)
          .send({
            messaage: "Você já tem um palpite para esse jogo nesse bolão.",
          });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return reply.status(400).send({ message: "Jogo não encontrado." });
      }

      if (game.date < new Date()) {
        return reply
          .status(400)
          .send({
            message: "Você não pode criar um palpite para um jogo passado.",
          });
      }

      await prisma.guess.create({
        data: {
          firstTeamScore,
          secondTeamScore,
          gameId,
          participantId: participant.id
        }
      })

      return reply.status(201).send();
    }
  );
}

import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/pools/:id/games",
    { onRequest: [authenticate] },
    async (req, reply) => {
      const listGamesParams = z.object({
        id: z.string(),
      });

      const { id } = listGamesParams.parse(req.params);

      const games = await prisma.game.findMany({
        include: {
          guesses: {
            where: {
              participant: {
                poolId: id,
                userId: req.user.sub,
              },
            },
          },
        },
        orderBy: { date: "desc" },
      });

      reply.status(200).send(
        games.map((game) => {
          return {
            ...games,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          };
        })
      );
    }
  );
}

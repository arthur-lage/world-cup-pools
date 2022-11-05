import Fastify from "fastify";

import jwt from "@fastify/jwt"
import cors from "@fastify/cors";

const PORT = process.env.PORT || 3001;

import {
  gameRoutes,
  authRoutes,
  guessRoutes,
  pollRoutes,
  userRoutes,
} from "./routes";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, { origin: true });

  await fastify.register(jwt, {
    secret: String(process.env.JWT_SECRET),
  })

  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(userRoutes)
  await fastify.register(pollRoutes)
  await fastify.register(guessRoutes)

  await fastify.listen({ port: Number(PORT), host: "0.0.0.0" });
}

bootstrap();

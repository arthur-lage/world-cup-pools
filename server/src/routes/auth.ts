import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/me", {
    onRequest: [authenticate]
  }, async (req, reply) => {
    reply.status(200).send({ user: req.user });
  });

  fastify.post("/users", async (req, reply) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(req.body);

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = userResponse.data;

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          googleId: userInfo.id,
        },
      });
    }

    const token = fastify.jwt.sign(
      { name: user.name, avatarUrl: user.avatarUrl },
      {
        sub: user.id,
        expiresIn: "7d",
      }
    );

    reply.status(200).send({ token });
  });
}

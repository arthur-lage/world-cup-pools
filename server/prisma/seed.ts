import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "johndoe@example.com",
      name: "John Doe",
      avatarUrl: "https://github.com/arthur-lage.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      code: "POOL01",
      title: "My Pool",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-23T12:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE"
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-23T12:00:00.201Z",
      firstTeamCountryCode: "JP",
      secondTeamCountryCode: "US",

      guesses: {
        create: {
          firstTeamScore: 2,
          secondTeamScore: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main();

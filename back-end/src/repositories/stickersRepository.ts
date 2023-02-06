import prisma from "../database/database";

//tipar os retornos das queries
export async function findStickers(userId) {
  return prisma.countries.findMany({
    include: {
      stickers: {
        where: {
          userStickers: {
            none: {
              userId
            }
          }
        },
        include: {
          userStickers: true
        },
        orderBy: {
          id: "asc"
        }
      }
    }
  });
}

export async function findAllUserStickers(userId: number) {
  return prisma.countries.findMany({
    include: {
      stickers: {
        where: {
          userStickers: {
            some: {
              userId,
              amount: {
                gt: 0
              }
            }
          }
        },
        include: {
          userStickers: true
        },
        orderBy: {
          id: "asc"
        }
      }
    }
  });
}

export async function findDoubledStickers(userId: number) {
  return prisma.countries.findMany({
    include: {
      stickers: {
        where: {
          userStickers: {
            some: {
              userId,
              amount: {
                gt: 1
              }
            }
          }
        },
        include: {
          userStickers: true
        },
        orderBy: {
          id: "asc"
        }
      }
    }
  });
}

export async function updateDoubledSticker(userStickerId: number) {
  return prisma.userStickers.updateMany({
    where: {
      id: userStickerId,
      amount: {
        gt: 0
      }
    },
    data: {
      amount: {
        decrement: 1
      }
    }
  });
}

export async function findSingleUserSticker(userId: number, stickerId: number) {
  return prisma.userStickers.findFirst({
    where: {
      userId,
      stickerId
    }
  });
}

export async function createUserSticker(userId: number, stickerId: number) {
  return prisma.userStickers.create({
    data: {
      userId,
      stickerId,
      amount: 1
    }
  });
}

export async function updateMissingSticker(userStickerId: number) {
  return prisma.userStickers.update({
    where: {
      id: userStickerId
    },
    data: {
      amount: {
        increment: 1
      }
    }
  });
}

export async function resetUserSticker(userId: number, stickerId: number) {
  return prisma.userStickers.deleteMany({
    where: {
      userId,
      stickerId
    }
  });
}
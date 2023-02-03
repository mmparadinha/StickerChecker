import prisma from "../database/database";

//tipar os retornos das queries

export async function findStickers() {
    return prisma.stickers.findMany({
        where: {
            rarityId: {
                equals: 1
            }
        },
        include: {
            countries: true
        },
        orderBy: {
            stickerNumber: "asc"
        }
    });
}

export async function findAllUserStickers(userId: number) {
    return prisma.userStickers.findMany({
        where: {
            userId,
            amount: {
                gt: 0
            }
        },
        include: {
            stickers: {
                include: {
                    countries: true
                }
            }
        },
        orderBy: {
            stickers: {
                stickerNumber: "asc"
            }
        }
    });
}

export async function findDoubledStickers(userId: number) {
    return prisma.userStickers.findMany({
        where: {
            userId,
            amount: {
                gt: 1
            }
        },
        include: {
            stickers: {
                include: {
                    countries: true
                }
            }
        },
        orderBy: {
            stickers: {
                stickerNumber: "asc"
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
    return prisma.userStickers.updateMany({
        where: {
            userId,
            stickerId
        },
        data: {
            amount: 0
        }
    });
}
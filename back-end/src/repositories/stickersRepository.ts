import prisma from "../database/database";

export async function findUserStickers(userId: number) {
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

export async function findMissingStickers(userId: number) {
    return prisma.userStickers.findMany({
        where: {
            userId,
            amount: {
                equals: 0
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

export async function updateMissingSticker(userStickerId: number) {
    return prisma.userStickers.updateMany({
        where: {
            id: userStickerId,
            amount: {
                equals: 0
            }
        },
        data: {
            amount: {
                increment: 1
            }
        }
    });
}

export async function deleteUserSticker(userStickerId: number) {
    return prisma.userStickers.delete({
        where: {
            id: userStickerId
        }
    });
}
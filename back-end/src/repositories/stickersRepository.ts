import prisma from "../database/database";

export async function findUserStickers(userId: number) {
    return prisma.userStickers.findMany({
        where: {
            userId,
            amount: {
                gt: 0
            }
        },
        select: {
            stickers: {
                select: {
                    id: true,
                    stickerNumber: true,
                    rarityId: true,
                    countries: {
                        select: {
                            name: true
                        }
                    }
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

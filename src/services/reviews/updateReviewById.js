import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReviewById = async (id, updatedReview) => {
    const prisma = new PrismaClient();

    const { userId, propertyId, ...rest } = updatedReview;

    const review = await prisma.review.update({
        where: { id },
        data: {
            user: userId
                ? {
                    connect: { id: userId }
                }
                : undefined,
            property: propertyId
                ? {
                    connect: { id: propertyId }
                }
                : undefined,
            ...rest
        }
    })

    if (!review || review.count === 0) {
        throw new NotFoundError("Review", id);
    }

    return review;
};

export default updateReviewById;
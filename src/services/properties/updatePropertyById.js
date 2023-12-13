import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updatePropertyById = async (id, updatedProperty) => {
    const prisma = new PrismaClient();

    const { hostId, amenities, ...rest } = updatedProperty;

    const property = await prisma.property.update({
        where: { id },
        data: {
            ...rest,
            host: hostId
                ? {
                    connect: { id: hostId }
                }
                : undefined,
            amenities: amenities
                ? {
                    set: amenities.map((id) => ({ id }))
                }
                : undefined,
        }
    })

    if (!property || property.count === 0) {
        throw new NotFoundError("Property", id);
    }

    return property;
};

export default updatePropertyById;
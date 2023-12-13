import { PrismaClient } from "@prisma/client";

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, amenities) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            host: {
                connect: { id: hostId }
            },
            amenities: {
                connect: amenities.map((id) => ({ id }))
            }
        }
    })

    return property;
};

export default createProperty;
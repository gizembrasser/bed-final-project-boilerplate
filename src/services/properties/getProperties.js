import { PrismaClient } from "@prisma/client";

const getProperties = async (title, location) => {
    const prisma = new PrismaClient();
    const properties = await prisma.property.findMany({
        where: {
            title: {
                contains: title
            },
            location: {
                contains: location
            }
        }
    })

    return properties;
};

export default getProperties;
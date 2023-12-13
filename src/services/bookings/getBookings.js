import { PrismaClient } from "@prisma/client";

// Allows for the argument 'userId' to be used as a query filter.
const getBookings = async (userId) => {
    const prisma = new PrismaClient();

    const bookings = await prisma.booking.findMany({
        where: {
            userId: {
                contains: userId
            }
        }
    })

    return bookings;
};

export default getBookings;
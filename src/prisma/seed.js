import { PrismaClient } from "@prisma/client";
import amenityData from "../data/amenities.json" assert { type: "json" };
import bookingData from "../data/bookings.json" assert { type: "json" };
import hostData from "../data/hosts.json" assert { type: "json" };
import propertyData from "../data/properties.json" assert { type: "json" };
import reviewData from "../data/reviews.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
    const { amenities } = amenityData;
    const { bookings } = bookingData;
    const { hosts } = hostData;
    const { properties } = propertyData;
    const { reviews } = reviewData;
    const { users } = userData;

    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity
        });
    }
    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        });
    }
    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        });
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
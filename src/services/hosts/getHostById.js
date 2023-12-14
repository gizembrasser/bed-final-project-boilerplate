import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHostById = async (id) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.findUnique({
        where: { id }
    })

    if (!host || host.count === 0) {
        throw new NotFoundError("Host", id);
    }

    // Returns the host's info, except password.
    const { password, ...rest } = host;
    return rest;
};

export default getHostById;
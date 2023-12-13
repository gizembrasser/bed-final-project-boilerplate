import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateHostById = async (id, updatedHost) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.updateMany({
        where: { id },
        data: updatedHost
    })

    if (!host || host.count === 0) {
        throw new NotFoundError("Host", id);
    }

    return {
        message: `Host with id ${id} was updated.`
    }
};

export default updateHostById;
import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
    const prisma = new PrismaClient();
    const hosts = await prisma.host.findMany({
        where: {
            name: {
                contains: name
            }
        }
    })

    // Returns all host info, except their passwords.
    return hosts.map(host => {
        const { password, ...rest } = host;
        return rest;
    })
};

export default getHosts;
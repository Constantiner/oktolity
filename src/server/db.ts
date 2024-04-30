import { PrismaClient, type Prisma } from "@prisma/client";

import { env } from "@/env";

type PrismaClientOptions = {
	log: Prisma.LogLevel[];
};

export type DbClient = PrismaClient<PrismaClientOptions>;

const prismaClientOptions: PrismaClientOptions = {
	log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
};

const createPrismaClient = (): DbClient => new PrismaClient(prismaClientOptions);

const globalForPrisma = globalThis as unknown as {
	prisma: DbClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

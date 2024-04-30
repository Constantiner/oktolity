import { PrismaClient, type Prisma } from "@prisma/client";

import { environment } from "@/environment";

type PrismaClientOptions = {
	log: Prisma.LogLevel[];
};

export type DatabaseClient = PrismaClient<PrismaClientOptions>;

const prismaClientOptions: PrismaClientOptions = {
	log: environment.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
};

const createPrismaClient = (): DatabaseClient => new PrismaClient(prismaClientOptions);

const globalForPrisma = globalThis as unknown as {
	prisma: DatabaseClient | undefined;
};

export const database = globalForPrisma.prisma ?? createPrismaClient();

if (environment.NODE_ENV !== "production") globalForPrisma.prisma = database;

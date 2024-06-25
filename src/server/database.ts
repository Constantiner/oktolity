import { PrismaClient, type Prisma } from "@prisma/client";

import { environment } from "@/environment";

type PrismaClientOptions = {
	log: Prisma.LogLevel[];
};

const prismaClientOptions: PrismaClientOptions = {
	log: environment.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createPrismaClient = () => new PrismaClient(prismaClientOptions);

export type DatabaseClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
	prisma: DatabaseClient | undefined;
};

export const database = globalForPrisma.prisma ?? createPrismaClient();

if (environment.NODE_ENV !== "production") globalForPrisma.prisma = database;

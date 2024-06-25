import type { Tag } from "@prisma/client";

export type UserTag = Omit<Tag, "createdById">;
export type UserTagId = UserTag["id"];

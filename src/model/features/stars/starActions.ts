import type { AppCreateAsyncThunkConfig } from "@/model/store";
import type { StarredRepo } from "@/server/api/routers/stars";
import { isTRPCClientError } from "@/trpc/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStars = createAsyncThunk<Readonly<Readonly<StarredRepo>[]>, void, AppCreateAsyncThunkConfig>(
	"stars/getStars",
	async (_, { extra }) => {
		try {
			const starredRepositories = await extra.trpcClient.stars.list.query();
			return starredRepositories;
		} catch (error) {
			if (isTRPCClientError(error) && error.data?.code === "FORBIDDEN") {
				throw new Error("Not authorized");
			}
			throw new Error("An error occurred");
		}
	}
);

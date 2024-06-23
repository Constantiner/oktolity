import { createAppAsyncThunk } from "@/model/hooks";
import type { GitHubRepo } from "@/server/api/routers/stars";
import { isTRPCClientError } from "@/trpc/client";

export const getStars = createAppAsyncThunk<Readonly<Readonly<GitHubRepo>[]>, void>(
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

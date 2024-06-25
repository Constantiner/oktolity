import { createAppAsyncThunk } from "@/model/hooks";
import type { GitHubRepo, GutHubRepoId } from "@/server/api/routers/stars";
import { isTRPCClientError } from "@/trpc/client";
import { match } from "ts-pattern";
import type { UserTag } from "./starTypes";

class StarsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "StarsError"; // Set the error name to the class name
	}
}

const isStarsError = (error: unknown): error is StarsError => error instanceof StarsError;

const createStarsError = (error: unknown): StarsError =>
	match(error)
		.when(
			error => isTRPCClientError(error) && error.data?.code === "FORBIDDEN",
			() => new StarsError("Not authorized")
		)
		.when(isStarsError, error => error)
		.otherwise(() => new StarsError("An error occurred"));

export const getStars = createAppAsyncThunk<Readonly<Readonly<GitHubRepo>[]>, void>(
	"stars/getStars",
	async (_, { extra }) => {
		try {
			const starredRepositories = await extra.trpcClient.stars.listAll.query();
			return starredRepositories;
		} catch (error) {
			throw createStarsError(error);
		}
	}
);

export const getFavorites = createAppAsyncThunk<Readonly<Readonly<GutHubRepoId>[]>, void>(
	"stars/getFavorites",
	async (_, { extra }) => {
		try {
			const starredRepositories = await extra.trpcClient.stars.listFavorites.query();
			return starredRepositories;
		} catch (error) {
			throw createStarsError(error);
		}
	}
);

export const getTags = createAppAsyncThunk<Readonly<Readonly<UserTag>[]>, void>(
	"stars/getTags",
	async (_, { extra }) => {
		try {
			const tags = await extra.trpcClient.stars.listTags.query();
			return tags;
		} catch (error) {
			throw createStarsError(error);
		}
	}
);

export const initAction = createAppAsyncThunk<void, void>("stars/init", async (_, { dispatch, getState }) => {
	try {
		if (getState().stars.initialized) {
			return;
		}
		await Promise.all([
			dispatch(getStars()).unwrap(),
			dispatch(getFavorites()).unwrap(),
			dispatch(getTags()).unwrap()
		]);
	} catch (error) {
		throw createStarsError(error);
	}
});

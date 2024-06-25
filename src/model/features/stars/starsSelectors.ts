import { isNonNullable } from "@/lib/types/nullable";
import type { RootState } from "@/model/store";
import type { GutHubRepoId } from "@/server/api/routers/stars";
import { createSelector } from "@reduxjs/toolkit";
import { repositoriesAdapter, type StarsSliceState } from "./starsSlice";

const repositoriesSelectors = repositoriesAdapter.getSelectors();

const selectSelf = (state: RootState): StarsSliceState => state.stars;

const selectStarredRepositoryIds = (state: RootState): Readonly<Readonly<GutHubRepoId>[]> =>
	state.stars.starredRepositories;
export const selectStarredRepositories = createSelector(
	[selectSelf, selectStarredRepositoryIds],
	(state, starredRepositoryIds) =>
		starredRepositoryIds.map(id => repositoriesSelectors.selectById(state.repositories, id)).filter(isNonNullable)
);

const selectFavoriteStarredRepositoryIds = (state: RootState): Readonly<Readonly<GutHubRepoId>[]> =>
	state.stars.favoriteStarredRepositories;
export const selectFavoriteStarredRepositories = createSelector(
	[selectSelf, selectFavoriteStarredRepositoryIds],
	(state, starredRepositoryIds) =>
		starredRepositoryIds.map(id => repositoriesSelectors.selectById(state.repositories, id)).filter(isNonNullable)
);

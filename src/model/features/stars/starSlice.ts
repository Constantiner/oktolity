import type { GitHubRepo, GutHubRepoId } from "@/server/api/routers/stars";
import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import { castDraft } from "immer";
import { createAppSlice } from "../../createAppSlice";
import { getFavorites, getStars, getTags, initAction } from "./starActions";
import type { UserTag, UserTagId } from "./starTypes";

export const tagsAdapter = createEntityAdapter<UserTag>();

export const repositoriesAdapter = createEntityAdapter<GitHubRepo>();

export interface StarsSliceState {
	repositories: Readonly<EntityState<Readonly<GitHubRepo>, GutHubRepoId>>;
	tags: Readonly<EntityState<Readonly<UserTag>, UserTagId>>;
	starredRepositories: ReadonlyArray<GutHubRepoId>;
	favoriteStarredRepositories: ReadonlyArray<GutHubRepoId>;
	initialStateLoading: boolean;
	initialized: boolean;
	initialStateErrorMessage?: string;
}

const initialState: StarsSliceState = {
	repositories: repositoriesAdapter.getInitialState(),
	tags: tagsAdapter.getInitialState(),
	starredRepositories: [],
	favoriteStarredRepositories: [],
	initialStateLoading: false,
	initialized: false
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const starsSlice = createAppSlice({
	name: "stars",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		startInitialLoading: create.reducer(state => {
			state.initialStateLoading = true;
		})
	}),
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
			.addCase(initAction.pending, state => {
				delete state.initialStateErrorMessage;
			})
			.addCase(initAction.fulfilled, (state, action) => {
				if (action.payload) {
					state.initialStateLoading = false;
					state.initialized = true;
				}
			})
			.addCase(initAction.rejected, (state, action) => {
				state.initialStateErrorMessage = action.error.message;
				state.initialStateLoading = false;
			})
			.addCase(getStars.fulfilled, (state, action) => {
				state.starredRepositories = action.payload.map(repo => repo.id);
				repositoriesAdapter.setMany(state.repositories, action.payload);
			})
			.addCase(getFavorites.fulfilled, (state, action) => {
				state.favoriteStarredRepositories = castDraft(action.payload);
			})
			.addCase(getTags.fulfilled, (state, action) => {
				tagsAdapter.setMany(state.tags, action.payload);
			});
	},
	selectors: {
		selectInitialStateLoading: state => state.initialStateLoading,
		selectInitialStateLoadingErrorMessage: state => state.initialStateErrorMessage
	}
});

// Action creators are generated for each case reducer function.
export const { startInitialLoading } = starsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectInitialStateLoading, selectInitialStateLoadingErrorMessage } = starsSlice.selectors;

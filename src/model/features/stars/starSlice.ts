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
	errorMessage?: string;
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
		increment: create.reducer(() => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			// state.stars = [];
		})
	}),
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed

		builder
			.addCase(initAction.pending, state => {
				state.initialStateLoading = true;
				delete state.errorMessage;
			})
			.addCase(initAction.fulfilled, state => {
				state.initialStateLoading = false;
				state.initialized = true;
			})
			.addCase(initAction.rejected, (state, action) => {
				state.errorMessage = action.error.message;
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
		selectIsStarsLoading: state => state.initialStateLoading,
		selectStarsErrorMessage: state => state.errorMessage
	}
});

// Action creators are generated for each case reducer function.
export const { increment } = starsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsStarsLoading, selectStarsErrorMessage } = starsSlice.selectors;

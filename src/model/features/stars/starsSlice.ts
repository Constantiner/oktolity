import type { GitHubRepo, GutHubRepoId } from "@/server/api/routers/stars";
import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { getStars } from "./starActions";

export const repositoriesAdapter = createEntityAdapter<GitHubRepo>();

export interface StarsSliceState {
	repositories: Readonly<EntityState<Readonly<GitHubRepo>, GutHubRepoId>>;
	starredRepositories: Readonly<Readonly<GutHubRepoId>[]>;
	initialStateLoading: boolean;
	errorMessage?: string;
}

const initialState: StarsSliceState = {
	repositories: repositoriesAdapter.getInitialState(),
	starredRepositories: [],
	initialStateLoading: false
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
			.addCase(getStars.pending, state => {
				state.initialStateLoading = true;
				delete state.errorMessage;
			})
			.addCase(getStars.fulfilled, (state, action) => {
				state.starredRepositories = action.payload.map(repo => repo.id);
				repositoriesAdapter.setMany(state.repositories, action.payload);
				state.initialStateLoading = false;
			})
			.addCase(getStars.rejected, (state, action) => {
				state.errorMessage = action.error.message;
				state.initialStateLoading = false;
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

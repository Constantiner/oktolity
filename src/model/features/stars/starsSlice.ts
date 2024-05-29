import type { StarredRepo } from "@/server/api/routers/stars";
import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { getStars } from "./starActions";

const starsAdapter = createEntityAdapter<StarredRepo>();
const starsSelectors = starsAdapter.getSelectors();

export interface StarsSliceState {
	stars: Readonly<EntityState<Readonly<StarredRepo>, number>>;
	starsLoading: boolean;
	starsErrorMessage?: string;
}

const initialState: StarsSliceState = {
	stars: starsAdapter.getInitialState(),
	starsLoading: false
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
				state.starsLoading = true;
				delete state.starsErrorMessage;
			})
			.addCase(getStars.fulfilled, (state, action) => {
				starsAdapter.setAll(state.stars, action.payload);
				state.starsLoading = false;
			})
			.addCase(getStars.rejected, (state, action) => {
				state.starsErrorMessage = action.error.message;
				state.starsLoading = false;
			});
	},
	selectors: {
		selectStarred: state => starsSelectors.selectAll(state.stars),
		selectIsStarsLoading: state => state.starsLoading,
		selectStarsErrorMessage: state => state.starsErrorMessage
	}
});

// Action creators are generated for each case reducer function.
export const { increment } = starsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStarred, selectIsStarsLoading, selectStarsErrorMessage } = starsSlice.selectors;

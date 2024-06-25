import { trpcClient } from "@/trpc/client";
import type { Action, SerializableStateInvariantMiddlewareOptions, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore, isPlain } from "@reduxjs/toolkit";
import { starsSlice } from "./features/stars/starSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(starsSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSerializable = (value: any): boolean => value instanceof Date || isPlain(value) || value instanceof File;

const serializableCheck: SerializableStateInvariantMiddlewareOptions = {
	isSerializable
};

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== "production",
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						trpcClient
					}
				},
				serializableCheck
			})
	});

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

type AppThunkExtraArguments = {
	trpcClient: typeof trpcClient;
};
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, AppThunkExtraArguments, Action>;

export type AppCreateAsyncThunkConfig<ErrorType = unknown> = {
	state: RootState;
	dispatch: AppDispatch;
	extra: AppThunkExtraArguments;
} & { rejectValue: ErrorType };

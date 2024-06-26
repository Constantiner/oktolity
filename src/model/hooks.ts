// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppCreateAsyncThunkConfig, AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<AppCreateAsyncThunkConfig>();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAppAsyncThunkFactory = <ErrorType = unknown>() =>
	createAsyncThunk.withTypes<AppCreateAsyncThunkConfig<ErrorType>>();

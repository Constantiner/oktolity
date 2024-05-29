// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppCreateAsyncThunkConfig, AppDispatch, AppStore, RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<AppCreateAsyncThunkConfig>();

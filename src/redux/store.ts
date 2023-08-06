import { configureStore } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";

import { codeReducer } from "./slices/codeSlice";
import CodeType from "../model/CodeType";
import CodePayload from "../model/CodePayload";
import { advReducer } from "./slices/objectSlice";
import Advert from "../model/Advert";

export const store = configureStore({
    reducer: {
     
     codeState: codeReducer,
     advState: advReducer
    }
});

export function useSelectorCode() {
    return useSelector<any, CodePayload>(state => state.codeState.codeMessage);
}

export function useSelectorAdv() {
    return useSelector<any, Advert>(state => state.advState.advert);
}

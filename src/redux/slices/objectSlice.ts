import {createSlice} from "@reduxjs/toolkit";
import CodeType from "../../model/CodeType";
import CodePayload from "../../model/CodePayload";
import Advert from "../../model/Advert";

const initialState: {advert: Advert} =  {
    advert: {name: "", category: "", price: 0}
}

const advSlice = createSlice({
    initialState,
    name: 'advState',
    reducers: {
        set: (state, data) => {

            state.advert = data.payload;
            
        },
        reset: (state) => {
            state.advert = initialState.advert;
        }
    }
});
export const advActions = advSlice.actions;
export const advReducer = advSlice.reducer;

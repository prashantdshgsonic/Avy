import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    desiredDistance: false,
    char1Distance: false,
    char2Distance: false,
    char3Distance: false,
    char4Distance: false,
    char5Distance: false,
    char6Distance: false,
    char7Distance: false,
    char8Distance: false,
    char9Distance: false,
    char10Distance: false,
    map: null
}

const distanceSlice = createSlice({
    name: "distance",
    initialState,
    reducers: {
        setMapScene: (state, { payload }) => {
            state.map = payload
        },
        setChar1Distance: (state, { payload }) => {
            state.char1Distance = payload
        },
        setChar2Distance: (state, { payload }) => {
            state.char2Distance = payload
        },
        setChar3Distance: (state, { payload }) => {
            state.char3Distance = payload
        },
        setChar4Distance: (state, { payload }) => {
            state.char4Distance = payload
        },
        setChar5Distance: (state, { payload }) => {
            state.char5Distance = payload
        },
        setChar6Distance: (state, { payload }) => {
            state.char6Distance = payload
        },
        setChar7Distance: (state, { payload }) => {
            state.char7Distance = payload
        },
        setChar8Distance: (state, { payload }) => {
            state.char8Distance = payload
        },
        setChar9Distance: (state, { payload }) => {
            state.char9Distance = payload
        },
        setChar10Distance: (state, { payload }) => {
            state.char10Distance = payload
        }
    }
})

export const { 
    setMapScene,
    setChar1Distance,
    setChar2Distance,
    setChar3Distance,
    setChar4Distance,
    setChar5Distance,
    setChar6Distance,
    setChar7Distance,
    setChar8Distance,
    setChar9Distance,
    setChar10Distance
} = distanceSlice.actions;
export default distanceSlice.reducer;
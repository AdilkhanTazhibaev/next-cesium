import React, { createContext, useReducer } from "react";
import { CESIUM_VIEWER } from "./actions/type";
const initialState = {
  cesiumViewer: null,
};

function init(initialState) {
  return { ...initialState };
}

const reducer = (state, action) => {
  switch (action.type) {
    case CESIUM_VIEWER:
      return {
        ...state,
        cesiumViewer: action.payload,
      };
    default:
      return state;
  }
};

export const CustomReducer = createContext(null);

export function CustomReducerProvider(props) {
  const [state, update] = useReducer(reducer, initialState, init);

  return (
    <CustomReducer.Provider value={{ state, update }}>
      {props.children}
    </CustomReducer.Provider>
  );
}

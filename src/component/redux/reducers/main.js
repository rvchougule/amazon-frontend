import { getProductsReducer }  from "./ProductsReducers";
import {combineReducers } from "redux";

const rootreducers = combineReducers({
    getProductsdata: getProductsReducer
});

export default rootreducers;
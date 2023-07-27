import { combineReducers } from "redux";
import repoReducer from "./reposReducer";

const reducers = combineReducers({
    repos: repoReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
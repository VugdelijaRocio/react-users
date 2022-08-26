import { combineReducers } from "redux";

import usersReducer, { UsersInitialState } from "./users.reducer";

export interface RootState {
    users: UsersInitialState;
}

export const rootReducer = combineReducers({
    users: usersReducer,
});

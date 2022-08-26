import { ErrorMessage } from "../../interfaces/errors";
import { User, UsersFilters } from "../../interfaces/user";
import { types } from "../actions/users/action.types";

export interface UsersInitialState {
    users?: User[];
    filters: UsersFilters;
    errorMessage: ErrorMessage;
    loading: boolean;
}

export const FiltersInitials = {
    first: undefined,
    last: undefined,
    city: undefined,
    country: undefined,
    phone: undefined,
    cell: undefined,
    email: undefined,
};

const initialState: UsersInitialState = {
    users: undefined,
    filters: FiltersInitials,
    errorMessage: {
        message: "",
        status: null,
    },
    loading: false,
};

const usersReducer = (state = initialState, action?: any) => {
    switch (action.type) {
        case types.SET_USERS_DATA: {
            return {
                ...state,
                users: action.payload,
            };
        }
        case types.EDIT_USER_DATA: {
            return {
                ...state,
                users: state.users?.map((u) => (u.id === action.payload.id ? {...u, ...action.payload} : u))
            };
        }
        case types.SET_USERS_FILTERS: {
            return {
                ...state,
                filters: action.payload,
            };
        }
        case types.SET_USERS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case types.SET_USERS_ERROR:
            return {
                ...state,
                errorMessage: {
                    message: action.payload.message,
                    status: action.payload.status,
                },
            };
        case types.REMOVE_USERS_ERROR: {
            return {
                ...state,
                errorMessage: initialState.errorMessage,
            };
        }
        case types.REMOVE_USERS_DATA: {
            return {
                ...state,
                users: initialState.users,
                loading: initialState.loading,
            };
        }
        default: {
            return state;
        }
    }
};

export default usersReducer;

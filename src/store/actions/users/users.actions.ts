import { AnyAction, Dispatch } from "redux";

import API from "../../../api";
import { UsersResponse } from "../../../interfaces/api-responses/users";
import { User, UsersFilters } from "../../../interfaces/user";

import { types } from "./action.types";

export const getUsersData = () => {
    return async (dispatch: Dispatch<AnyAction>) => {

        try {
            dispatch({
                type: types.SET_USERS_LOADING,
                payload: true,
            });
            const { data } = await API.get<UsersResponse>("/?results=12");

            const mappedData: User[] = data.results.filter((u) => (u.login.uuid)).map((d) => ({
                id: d.login.uuid,
                name: d.name,
                location: d.location,
                email: d.email,
                phone: d.phone,
                cell: d.cell,
                picture: d.picture,
            }))

            dispatch({
                type: types.SET_USERS_DATA,
                payload: mappedData,
            });

            dispatch({
                type: types.REMOVE_USERS_ERROR,
            });
        } catch (error: any) {
            dispatch({
                type: types.SET_USERS_ERROR,
                payload: {
                    message: error?.toString(),
                    status: error?.response ? error.response.status : "500",
                },
            });
        } finally {
            dispatch({
                type: types.SET_USERS_LOADING,
                payload: false,
            });
        }
    };
};

export const editUserData = (userData: Partial<User> & Pick<User, 'id'>) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: types.EDIT_USER_DATA,
            payload: userData,
        });
    };
};

export const setFilters = (filters: UsersFilters) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: types.SET_USERS_FILTERS,
            payload: filters,
        });
    };
};

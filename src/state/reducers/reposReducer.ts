import { Action } from '../actions';
import { ActionType } from '../action-types';

interface repoState {
    loading: boolean,
    err: string | null,
    data: [string]
}

const initialState: repoState = {
    loading: false,
    err: null,
    data: [""]
};


export const reducer = (
    state: repoState = initialState,
    action: Action
): repoState => {
    switch (action.type) {
        case ActionType.SEARCH_REPOS:
            return { loading: true, err: null, data: [""] };
        case ActionType.SEARCH_REPOS_SUCCESS:
            return { loading: false, err: null, data: action.payload };
        case ActionType.SEARCH_REPOS_ERROR:
            return { loading: false, err: action.payload, data: [""] };
        default:
            return state;
    }
}

export default reducer;
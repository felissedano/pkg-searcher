import { Action, ReposData } from '../actions';
import { ActionType } from '../action-types';



interface RepoState {
    loading: boolean,
    err: string | null,
    data?: ReposData[]
}

// const defaultReposData: ReposData {
//     repoName
// }

const initialState: RepoState = {
    loading: false,
    err: null,
    data: undefined
    // data: [{
    //     repoName: "",
    //     authorName: "",
    //     version: "",
    //     githubLink: "",
    // }]
};


export const reducer = (
    state: RepoState = initialState,
    action: Action
): RepoState => {
    switch (action.type) {
        case ActionType.SEARCH_REPOS:
            return { loading: true, err: null, data: undefined };
        case ActionType.SEARCH_REPOS_SUCCESS:
            console.log(action.payload);
            return { loading: false, err: null, data: action.payload };
        case ActionType.SEARCH_REPOS_ERROR:
            return { loading: false, err: action.payload, data: undefined };
        default:
            return state;
    }
}

export default reducer;
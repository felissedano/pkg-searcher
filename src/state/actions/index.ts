import { ActionType } from '../action-types';

interface SearchReposAction {
    type: ActionType.SEARCH_REPOS
}

interface SearchReposSuccessAction {
    type: ActionType.SEARCH_REPOS_SUCCESS,
    payload: ReposData[]
}

interface SearchReposErrorAction {
    type: ActionType.SEARCH_REPOS_ERROR,
    payload: string
}

export type Action =     
| SearchReposAction 
| SearchReposSuccessAction 
| SearchReposErrorAction

export interface ReposData {
    repoName: string,
    authorName: string,
    version: string,
    githubLink: string,
    githubAvatarLink?: string,
    githubStarredCount?: string

}
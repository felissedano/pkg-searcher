import { ActionType, RepoMangerType } from '../action-types';
import { Action } from '../actions';
import { Dispatch } from 'redux';
import { createPayload } from './payloadCreator';

export const searchRepos = (term: string, repoManagerSite: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOS
        });

        try {

            console.log("about to search repos");

            switch (repoManagerSite) {
                // Search using cargo api
                case RepoMangerType.CARGO: {
                    const repos = await createPayload(term,repoManagerSite)


                    dispatch({
                        type: ActionType.SEARCH_REPOS_SUCCESS,
                        payload: repos
                    });

                    break;
                }

                // Search using npm api
                case RepoMangerType.NPM: {
                    const repos = await createPayload(term, repoManagerSite);

                    dispatch({
                        type: ActionType.SEARCH_REPOS_SUCCESS,
                        payload: repos 
                    });

                    // const { data } = await axios.get(
                    //     'http://registry.npmjs.org/-/v1/search',
                    //     {
                    //         params: {
                    //             text: term
                    //         }
                    //     }
                    // );

                    // const names = data.objects.map((result: any) => {
                    //     return result.package.name;
                    // });

                    // dispatch({
                    //     type: ActionType.SEARCH_REPOS_SUCCESS,
                    //     payload: names
                    // });
                    // break;
                }



            }


        } catch (error: any) {
            console.log("error happened, the messagge is " + error.message);
            dispatch({
                type: ActionType.SEARCH_REPOS_ERROR,
                payload: error.message
            });
        }

    }
}
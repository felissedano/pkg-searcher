import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Dispatch } from 'redux';

export const searchRepos = (term: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOS
        });

        try {
            console.log("about to search repos");

            const { data } = await axios.get(
                'https://crates.io/api/v1/crates',
                {
                    params: {
                        q: term
                    }
                }
            );

            console.log(data);

            

            // const { data } = await axios.get(
            //     'http://registry.npmjs.org/-/v1/search',
            //     {
            //         params: {
            //             text: term
            //         }
            //     }
            // );

            const names = data.crates.map((result: any) => {
                return result.name;
            });

            // const names = data.objects.map((result: any) => {
            //     return result.package.name;
            // });

            dispatch({
                type: ActionType.SEARCH_REPOS_SUCCESS,
                payload: names
            });

        } catch (error: any) {
            console.log("error happened, the messagge is " + error.message);
            dispatch({
                type: ActionType.SEARCH_REPOS_ERROR,
                payload: error.message
            });
        }

    }
}
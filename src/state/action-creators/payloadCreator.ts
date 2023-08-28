import axios from "axios";
import { RepoMangerType } from "../action-types";
import { ReposData } from "../actions";
import createCargoPayload from "./createCargoPayload";
import createNpmPayload from "./crateNpmPayload";

export const createPayload = async (term: string, repoManagerSite: string) : Promise<ReposData[]> => {
    try {

        console.log("about to search repos");

        const placeHolder: ReposData = {
            repoName: "string",
            authorName: "string",
            version: "string",
            githubLink: "string",


        }

        switch (repoManagerSite) {
            // Search using cargo api
            case RepoMangerType.CARGO: {
                console.log("inside cargo switch statment");
                const { data } = await axios.get(
                    'https://crates.io/api/v1/crates',
                    {
                        params: {
                            q: term
                        }
                    }
                );

                console.log("about to call createCargoPayload");
                const repos = await createCargoPayload(data);
                // repos.forEach(repo => console.log(repo.authorName));

                return repos;

            }

            case RepoMangerType.NPM: {
                console.log("inside npm switch")
                const { data } = await axios.get(
                    'http://registry.npmjs.org/-/v1/search',
                    {
                        params: {
                            text: term
                        }
                    }
                );

                const repos = await createNpmPayload(data);
                repos.forEach(repo => console.log(repo.authorName));

                return repos;
            }

            default:
                console.log("inside daulft swithc")
                return [placeHolder];

        }
    } catch (error: any) {
        console.log("error happened, inside playloadCreator " + error.message);
        throw (error);

    }
}



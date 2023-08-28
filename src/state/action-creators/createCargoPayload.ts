import axios from "axios";
import { ReposData } from "../actions";
import { RepoManagerURLType } from "../action-types";

const createCargoPayload = async (data: any): Promise<ReposData[]> => {
    console.log("inside the cargoPayloadCreator");
    console.log("about to map cargo payload");

    console.log("we got the object and the length is " + data.crates.length);

    try {

        let reposs: ReposData[] = new Array<ReposData>(data.crates.length);
        for(let i = 0; i < data.crates.length; i++) {
            const result: any = data.crates[i]
            if (result.repository) {
                console.log("yoooooooooo");
                let githubUrl: string = result.repository as string;
                console.log(githubUrl)
                // if there are more than 4 '/' charactor then we need to remove the last two, as it will return a status 404
                // i.e if we get https://github.com/facebook/react/tree/master, it needs to become https://github.com/facebook/react
                if ((githubUrl.split("/").length - 1) > 4) {
                    console.log("weird url, needs to reproccess it, the url is " + githubUrl);
                    // for cargo there is situation like github.com/<user>/<repo>/ and need to remove the last '/'
                    githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('/'))); 
                    console.log("after process, the url is " + githubUrl);
                }

                if (githubUrl.charAt(githubUrl.length -4) === "." ) {
                    githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('.')));
                }
                
                const githubData = await axios.get(RepoManagerURLType.GITHUB_API_URL + githubUrl.replace(RepoManagerURLType.GITHUB_URL,""), {})
                
    
                const tempRepo: ReposData = {
                    repoName: result.name, // cargo api does not provide the publisher name, so using the github owner name
                    authorName: githubData.data.owner.login,
                    version: result.max_version,
                    githubLink: result.repository,
                    githubStarredCount: githubData.data.stargazers_count,
                    githubAvatarLink: githubData.data.owner.avatar_url
                };
    
                reposs[i] = tempRepo;
    
    
            } else {
                console.log("NOOOOOOOOO URLLLLLLLLL");
                const tempRepo: ReposData = {
                    repoName: result.package.name,
                    authorName: result.package.publisher.username,
                    version: result.package.version,
                    githubLink: result.package.links.repository,
                };
    
                console.log("No lInk  " + tempRepo.repoName);
    
                reposs[i] = tempRepo;
            }
            
    
        }

        return reposs;

    } catch (err: any) {
        throw err;
    }


} 

export default createCargoPayload;
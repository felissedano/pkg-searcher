import axios from "axios";
import { ReposData } from "../actions";
import { RepoManagerURLType } from "../action-types";

const createNpmPayload = async (data: any): Promise<ReposData[]> => {
    console.log("about to map npm payload");

    console.log("wegot the object and the length is " + data.objects.length);

    try {

        let reposs: ReposData[] = new Array<ReposData>(data.objects.length);
        for(let i = 0; i < data.objects.length; i++) {
            const result: any = data.objects[i]
            if (result.package.links.repository) {
                console.log("yoooooooooo");
                let githubUrl: string = result.package.links.repository as string;
                // if there are more than 4 '/' charactor then we need to remove the last two, as it will return a status 404
                // i.e if we get https://github.com/facebook/react/tree/master, it needs to become https://github.com/facebook/react
                if ((githubUrl.split("/").length - 1) > 4) {
                    console.log("weird url, needs to reproccess it, the url is " + githubUrl);
                    githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('/')));
                    githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('/'))); // remove it twice
                    console.log("after process, the url is " + githubUrl);
                }
    
                const githubData = await axios.get(RepoManagerURLType.GITHUB_API_URL + githubUrl.replace(RepoManagerURLType.GITHUB_URL,""), {})
                
    
                const tempRepo: ReposData = {
                    repoName: result.package.name,
                    authorName: result.package.publisher.username,
                    version: result.package.version,
                    githubLink: result.package.links.repository,
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

    // const repos: [ReposData] = await data.objects.map( async (result: any): Promise<ReposData> => {
    //     console.log("reulst is githubLink: " + result.package.links.repository);
    //     if (!result.package.links.repository) {
    //         console.log("hello world");
    //     }
    
    //     // let githubData; // the axios data from calling github api, since url might have weird cases we cannot initialize it immedietly.

    //     if (result.package.links.repository) {
    //         let githubUrl: string = result.package.links.repository as string;
    //         // if there are more than 4 '/' charactor then we need to remove the last two, as it will return a status 404
    //         // i.e if we get https://github.com/facebook/react/tree/master, it needs to become https://github.com/facebook/react
    //         if ((githubUrl.split("/").length - 1) > 4) {
    //             console.log("weird url, needs to reproccess it, the url is " + githubUrl);
    //             githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('/')));
    //             githubUrl = (githubUrl.slice(0,githubUrl.lastIndexOf('/'))); // remove it twice
    //             console.log("after process, the url is " + githubUrl);
    //         }

    //         const githubData = await axios.get(RepoManagerURLType.GITHUB_API_URL + githubUrl.replace(RepoManagerURLType.GITHUB_URL,""), {})
            

    //         const tempRepo: ReposData = {
    //             repoName: result.package.name,
    //             authorName: result.package.publisher.username,
    //             version: result.package.version,
    //             githubLink: result.package.links.repository,
    //             githubStarredCount: githubData.data.stargazers_count,
    //             githubAvatarLink: githubData.data.owner.avatar_url
    //         };

    //         console.log("Has link so  " + tempRepo.githubStarredCount);


    //         return tempRepo;


    //     } else {
    //         console.log("NOOOOOOOOO URLLLLLLLLL");
    //         const tempRepo: ReposData = {
    //             repoName: result.package.name,
    //             authorName: result.package.publisher.username,
    //             version: result.package.version,
    //             githubLink: result.package.links.repository,
    //         };

    //         console.log("No lInk  " + tempRepo.repoName);

    //         return tempRepo;
    //     }

    // });

    // console.log("test test " + repos.length + " dsqdwqd " + typeof repos + " dsadw " + typeof repos[0])

    // const tempppp: [ReposData] = data.objects.map( (result: any) => {
    //     return {
    //         repoName: result.package.name,
    //         authorName: result.package.publisher.username,
    //         version: result.package.version,
    //         githubLink: result.package.links.repository,
    //     };

    // });

    // console.log("test test " + tempppp.length + " dsqdwqd " + typeof tempppp + " dsadw " + typeof tempppp[0]);


    // return tempppp;




} 

export default createNpmPayload;
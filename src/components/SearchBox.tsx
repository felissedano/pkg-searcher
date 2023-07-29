import { useState, useRef } from "react";
import { RepoMangerType } from "../state/action-types";
import { useActions } from "../hooks/useActions";
// import { useTypedSelector } from "../hooks/useTypedSelector";
import './index.css'
import './SearchBox.css';

const SearchBox: React.FC = () => {
    const termRef = useRef("");
    const [term, ChangeTerm] = useState("");
    const [repoManager, changeRepoManger] = useState<string>(RepoMangerType.NPM)
    const { searchRepos } = useActions();
    // const repoSate = useTypedSelector((state) => state.repos);

    const submitRepoToSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        console.log(repoManager);
        searchRepos(term, repoManager);
    }

    return <div id="search-box">
        <h1 id="title"> Search From Your Package Manger of Choice!</h1>
        <div className="form-container">
            <form id="keyword-form" onSubmit={submitRepoToSearch}>
                <select name="repo-manager" id="repo-manager-select" 
                onChange={(e) => {changeRepoManger(e.target.value); console.log(e.target.value + " and " + repoManager)}}
                // value={repoManager} 
                // onChange={(e) => {changeRepoManger(RepoMangerType[e.target.value as keyof typeof RepoMangerType]); console.log(e.target.value + " " + repoManager)}}
                // onChange={(e) => {
                //     const newRepoSite: RepoMangerType = e.target.value as keyof typeof RepoMangerType;
                //     changeRepoManger(newRepoSite); 
                //     console.log(e.target.value + " " + repoManager)}}
                >
                    <option value={RepoMangerType.NPM}>{RepoMangerType.NPM}</option>
                    <option value={RepoMangerType.CARGO}>{RepoMangerType.CARGO}</option>               
                    {/* <option value={RepoMangerType.CARGO}>{RepoMangerType.CARGO}</option>
                    <option value={RepoMangerType.NPM}>{RepoMangerType.NPM}</option> */}
                    {/* {(Object.keys(RepoMangerType) as Array<keyof typeof RepoMangerType>).map((key) => {return <option value={key}>{key}</option>})} */}
                </select>
                <input onChange={(e) => termRef.current = e.target.value} />
 
                <button className="button" id="search-button" onClick={(e) => ChangeTerm(termRef.current)}>
                    Search
                </button>
                
            </form>

        </div>

    </div>
}

export default SearchBox;
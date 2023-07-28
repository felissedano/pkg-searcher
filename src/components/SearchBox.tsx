import { useState, useRef } from "react";
import { RepoMangerType } from "../state/action-types";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const SearchBox: React.FC = () => {
    const termRef = useRef("");
    const [term, ChangeTerm] = useState("");
    const [repoManager, changeRepoManger] = useState(RepoMangerType.NPM)
    const { searchRepos } = useActions();
    const repoSate = useTypedSelector((state) => state.repos);

    const submitRepoToSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        searchRepos(term);
    }


    return <div>
        <h1 id="title"> Search From Your Package Manger of Choice!</h1>
        <div>
            <form onSubmit={submitRepoToSearch}>
                <select name="repo-manager" id="repo-manager-select">
                    {(Object.keys(RepoMangerType) as Array<keyof typeof RepoMangerType>).map((key) => {return <option value={key}>{key}</option>})}
                    {/* <option value={repoManager.}>{RepoMangerType.NPM}</option> */}
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
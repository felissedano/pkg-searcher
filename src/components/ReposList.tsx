import { useState } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const ReposList: React.FC = () => {
    const [term,changeTerm] = useState('');
    const { searchRepos } = useActions();
    const repoSate = useTypedSelector((state) => state.repos);

    const submitRepoToSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        searchRepos(term);
    }

    return <div>
        <form onSubmit={submitRepoToSearch}>
            <input type="text" onChange={(e) => changeTerm(e.target.value)} />
            <button>Search</button>
        </form>
        {repoSate.err && <h3> {repoSate.err} </h3>}
        {repoSate.loading && <h3>Loading NPM Packages...</h3>}
        {!repoSate.err && !repoSate.loading 
        && repoSate.data.map((repo) => <p>{repo}</p>) }

    </div>
}

export default ReposList
import { Provider } from "react-redux";
import { store } from "../state";
import ReposList from "./ReposList";
import SearchBox from "./SearchBox";

const App = () => {
    return <Provider store={store}>
        <div>
            <SearchBox />
            <h1>Search for a Rust package</h1>
            <ReposList />
        </div>

    </Provider>
}

export default App
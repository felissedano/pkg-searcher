import { Provider } from "react-redux";
import { store } from "../state";
import ReposList from "./ReposList";
import SearchBox from "./SearchBox";
import './App.css';

const App = () => {
    return <Provider store={store}>
        <div className="app--main">
            <SearchBox />
            <ReposList />
        </div>

    </Provider>
}

export default App
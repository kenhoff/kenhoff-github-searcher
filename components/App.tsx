import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import SearchView from "./SearchView";
import RepoDetailsView from "./RepoDetailsView";

const App = () => {
    return(
        <Router>
            <SearchView />
            <Route path="/:user/:repo">
                <RepoDetailsView />
            </Route>
        </Router>
    );
};
export default App;

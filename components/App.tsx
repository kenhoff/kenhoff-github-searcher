import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";

import SearchView from "./SearchView";
import RepoDetailsView from "./RepoDetailsView";

const App = () => {
    return (
        <Router>
            <Container>
                <h1><a href="https://hoff.tech" target="_blank" rel="noopener noreferrer">Ken Hoff</a>'s GitHub Searcher</h1>
                <p><a href="https://github.com/kenhoff/kenhoff-github-searcher" target="_blank" rel="noopener noreferrer">Source code</a> - <a href="mailto:ken@hoff.tech" target="_blank" rel="noopener noreferrer">ken@hoff.tech</a></p>
                <Row>
                    <Col xs="4">
                        <SearchView />
                    </Col>
                    <Col>
                        <Route path="/:user/:repo">
                            <RepoDetailsView />
                        </Route>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};
export default App;

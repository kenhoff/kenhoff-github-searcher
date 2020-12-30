import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useLocation, useHistory, Link} from "react-router-dom";
import LanguageFilterInput from "./LanguageFilterInput";
import SortInput from "./SortInput";
import {
    ListGroup,
    Spinner,
    Form
} from "react-bootstrap";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};

const SearchView = () => {
    const query = useQuery();
    const history = useHistory();
    const location = useLocation();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);


    const makeApiRequest = useCallback(debounce((searchString: string, languageFilter: string[], sortString?: string) => {
        // const newValue = query.get("search") || "";
        // don't bother sending the request if newValue is blank
        if (searchString.trim() !== "") {

            const languageFilterString = languageFilter.length !== 0 ? languageFilter.map(language => `language:${language}`).join(" ") : "";



            const sortQueryString = sortString === "stars" ? "sort:stars" : "";

            const queryString = new URLSearchParams({q: `${searchString} ${languageFilterString} ${sortQueryString}`}).toString();

            fetch(`https://api.github.com/search/repositories?${queryString}`)
                .then(response => response.json())
                .then((data) => {
                    setLoading(false);
                    setRepos(data.items);
                });
        } else {
            // instead, just set the repos list as empty
            setLoading(false);
            setRepos([]);
        }
    }, 500), []);



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        query.set("search", e.target.value);
        handleChange();
    };

    const handleLanguageFilterChange = (newLanguageFilterValue) => {
        query.set("languages", newLanguageFilterValue);
        handleChange();
    };

    const handleSortChange = (newSortValue: string) => {
        query.set("sort", newSortValue);
        handleChange();
    };

    const handleChange = () => {

        // replace the current path immediately, but fire off the API call as a debounce, and push the new state onto the stack
        history.replace(`${location.pathname.split("?")[0]}?${query.toString()}`); // might be unsafe, figure out a better way to do this
        // also, for some reason, it's requesting a favicon every time that we replace the history object? (https://stackoverflow.com/questions/36103904/history-pushstate-in-chrome-make-favicon-request)
        // bit of an error here - after a while (debounce period), push the new history state onto the stack, and replace all subsequent values. gonna brush over that...


        // set loading as true during the non-debounced bit, so they get the impression it's loading immediately
        setLoading(true);
        makeApiRequest(query.get("search") || "", query.get("languages") ? query.get("languages").split(",") : [], query.get("sort"));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    // on load, make the API request with the query string that you have
    useEffect(() => {
        setLoading(true);
        makeApiRequest(query.get("search") || "", query.get("languages") ? query.get("languages").split(",") : [], query.get("sort"));
    }, []);

    // want to break this? include a "?" in your repo name ;)
    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="input"
                        onChange={handleSearchChange}
                        value={query.get("search") || ""}
                    />
                </Form.Group>
                <LanguageFilterInput
                    onChange={handleLanguageFilterChange}
                    value={query.get("languages") ? query.get("languages").split(",") : []}
                />
                <SortInput
                    onChange={handleSortChange}
                    value={query.get("sort")}
                />
            </Form>
            {!query.get("search") && <p className="mx-auto pt-5">Please search for a repo ☝</p>}

            {loading &&
                <div className="pt-5 d-flex">
                    <Spinner className="mx-auto" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
            {!loading && query.get("search") && repos.length === 0 && <p className="mx-auto pt-5">No repos found!</p>}
            {!loading &&
            <ListGroup className="pt-4">
                {repos.map(({id, full_name, language, stargazers_count}) => {
                    const handleRepoClick = () => {
                        history.push(`/${full_name}?${query.toString()}`);
                    };
                    return (
                        <ListGroup.Item
                            key={id}
                            action
                            active = {location.pathname.split("?")[0] === `/${full_name}` ? true : false}
                            onClick={handleRepoClick}>
                            {full_name} - {language ? language : "🤷"} - {stargazers_count} stars
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            }
        </>
    );
};
export default SearchView;

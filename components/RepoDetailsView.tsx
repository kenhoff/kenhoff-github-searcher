import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const RepoDetailsView = () => {
    const {user: userNameParam, repo: repoNameParam} = useParams();
    const [repoInfo, setRepoInfo] = useState(null);
    useEffect(() => {
        setRepoInfo(null);
        // want to cache this? set up redux, or useReducer
        fetch(`https://api.github.com/repos/${userNameParam}/${repoNameParam}`)
            .then(response => response.json())
            .then((data) => {
                setRepoInfo(data);
            });
    }, [userNameParam, repoNameParam]);
    // repository name, description, number of stars, language, and the owners name
    if (!repoInfo) {
        return <div>Loading repo details...</div>;
    }
    return (
        <ul>
            <li>repo name: {repoInfo.name}</li>
            <li>repo description: {repoInfo.description}</li>
            <li>number of stars: {repoInfo.stargazers_count}</li>
            <li>language: {repoInfo.language}</li>
            <li>owner's name: {repoInfo.owner.login}</li>
        </ul>
    );
};

export default RepoDetailsView;

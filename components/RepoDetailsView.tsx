import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, Image, Row, Col, Spinner} from "react-bootstrap";

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
        return (<div className="pt-5 d-flex">
            <Spinner className="mx-auto" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>);
    }

    return (
        <div className="pt-4">
            <Card>
                <Row>
                    <Col xs={3}>
                        <Image src={repoInfo.owner.avatar_url} fluid rounded/>
                    </Col>
                    <Col>

                        <Card.Body>
                            <Card.Title>
                                {repoInfo.full_name}
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2">
                                {[repoInfo.language ? repoInfo.language : "🤷", `⭐${repoInfo.stargazers_count}`].join(" - ")}
                            </Card.Subtitle>
                            <Card.Text>
                                {repoInfo.description}
                            </Card.Text>

                            <Card.Link href={repoInfo.owner.html_url} target="_blank" rel="noopener noreferrer">@{repoInfo.owner.login}</Card.Link>
                            <Card.Link href={repoInfo.html_url} target="_blank" rel="noopener noreferrer">Repository</Card.Link>
                        </Card.Body>
                    </Col></Row>
            </Card>
        </div>
    );
};

export default RepoDetailsView;

import * as React from "react";
import {Form, Button, ButtonGroup} from "react-bootstrap";

const SortInput = ({value = "bestmatch", onChange}) => {
    const handleBestMatchClick = () => {
        onChange("bestmatch");
    };

    const handleStarsClick = () => {
        onChange("stars");
    };

    // todo: refactor so that I'm not creating separate click handlers for each button
    return (
        <>
            <Form.Label>Sort by:</Form.Label>
            <div>
                <ButtonGroup>
                    <Button active={value === "bestmatch"} onClick={handleBestMatchClick}>Best Match</Button>
                    <Button active={value === "stars"} onClick={handleStarsClick}>Stars</Button>
                </ButtonGroup>
            </div>
        </>
    );
};

export default SortInput;

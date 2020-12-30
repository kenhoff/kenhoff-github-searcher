import * as React from "react";
import {Form, InputGroup, Button, Col} from "react-bootstrap";
// languages come from langauges.yml, copied from github linguist, processed through convertLanguages.js
import languages from "../languages";

const LanguageFilterInput = ({value = [], onChange}) => {
    const handleChange = (e) => {
        // convert it down to an array of strings to start -
        onChange([e.target.value]);
    };

    const handleClearFilterClick = () => {
        onChange([]);
    };

    // temp til we get react-select multiselect in
    const selectedValue = value.length === 0 ? "" : value[0];

    return (
        <>
            <Form.Label>Filter by language:</Form.Label>
            <Form.Row>
                <Form.Group as={Col} xs="9">
                    <Form.Control
                        as="select"
                        value={selectedValue}
                        onChange={handleChange}
                    >
                        <option disabled value="">Select a language...</option>
                        {languages.map((language: string) => {
                            return <option value={language} key={language}>{language}</option>;
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs="3">
                    <Button onClick={handleClearFilterClick}>Clear</Button>
                </Form.Group>
            </Form.Row>
            <div>
            </div>
        </>
    );
};

export default LanguageFilterInput;

import * as React from "react";

// hardcoded for now, matches the language strings from github.
const languages = [
    "JavaScript",
    "Python",
    "COBOL"
];

const LanguageFilterInput = ({value = [], onChange}) => {
    const handleChange = (e) => {
        // convert it down to an array of strings to start -
        onChange([e.target.value]);
    };

    // temp til we get react-select multiselect in
    const selectedValue = value.length === 0 ? "" : value[0];

    return <select value={selectedValue} onChange={handleChange}>
        <option disabled value="">Filter by language....</option>
        {languages.map((language) => {
            return <option value={language} key={language}>{language}</option>;
        })}
    </select>;
};

export default LanguageFilterInput;

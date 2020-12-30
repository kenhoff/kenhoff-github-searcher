import * as React from "react";
// languages come from langauges.yml, copied from github linguist, processed through convertLanguages.js
import languages from "../languages";

const LanguageFilterInput = ({value = [], onChange}) => {
    const handleChange = (e) => {
        // convert it down to an array of strings to start -
        onChange([e.target.value]);
    };

    const handleClearFilterClick = () => {
        onChange([]);
    }

    // temp til we get react-select multiselect in
    const selectedValue = value.length === 0 ? "" : value[0];

    return <><select value={selectedValue} onChange={handleChange}>
        <option disabled value="">Filter by language....</option>
        {languages.map((language: string) => {
            return <option value={language} key={language}>{language}</option>;
        })}
    </select>
    <button onClick={handleClearFilterClick}>clear language filter</button></>;
};

export default LanguageFilterInput;

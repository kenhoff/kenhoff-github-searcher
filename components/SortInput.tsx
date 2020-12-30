import * as React from "react";

const SortInput = ({value = "bestmatch", onChange}) => {
    const handleChange = (e) => {
        // convert value down
        onChange(e.target.value);
    };
    return <select value={value} onChange={handleChange}>
        <option value="bestmatch">best match</option>
        <option value="stars">stars</option>
    </select>;
};

export default SortInput;

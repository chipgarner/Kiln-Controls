import './LabelledNumber.css';
import React from "react";

function LabelledNumber(label: string, number: number) {
    return (
        <div className="labelled">
            <p>{label}</p>
            <h3>{number}</h3>
        </div>
    )
}

export default LabelledNumber;
import React, { useState } from "react";
import axios from "axios";
import PathwayGraph from "./components/PathwayGraph";  // Update the path here
import "./components/GraphStyles.css";  // Update the path here
  // Updated CSS filename

const App = () => {
    const [technology, setTechnology] = useState("");
    const [pathway, setPathway] = useState([]);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/pathways/generate", {
                technology,
            });

            if (response.data.pathway) {
                setPathway(response.data.pathway);
                setError("");
            } else {
                setError("Unexpected data format from API.");
            }
        } catch (err) {
            setError("Failed to fetch pathway data.");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Learning Pathway Generator</h1>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter a technology..."
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={handleGenerate}
                    style={{
                        marginLeft: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Generate Pathway
                </button>
            </div>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <PathwayGraph pathway={pathway} />
        </div>
    );
};

export default App;


// import React, { useState } from 'react';
// import InputForm from './components/InputForm';
// import PathwayGraph from './components/PathwayGraph';
// import './styles.css';

// const App = () => {
//     const [pathway, setPathway] = useState([]);

//     return (
//         <div className="app-container">
//             <h1 className="app-header">Learning Pathway Generator</h1>
//             <InputForm setPathway={setPathway} />
//             {pathway.length > 0 && <PathwayGraph pathway={pathway} />}
//         </div>
//     );
// };

// export default App;

// const PathwayGraph = ({ pathway }) => {
//     const svgRef = useRef();

//     useEffect(() => {
//         if (!Array.isArray(pathway) || pathway.length === 0) {
//             console.error('Invalid pathway data, expected a non-empty array.');
//             return;
//         }

//         const svg = d3.select(svgRef.current);
//         svg.selectAll('*').remove(); // Clear the SVG content

//         // Create nodes and links
//         const nodes = pathway.map((step, i) => ({ id: i, name: step }));
//         const links = nodes.slice(1).map((node, i) => ({ source: i, target: i + 1 }));

//         // Initialize D3 force simulation
//         const simulation = d3.forceSimulation(nodes)
//             .force("link", d3.forceLink(links).id(d => d.id))
//             .force("charge", d3.forceManyBody())
//             .force("center", d3.forceCenter(300, 200));

//         // Add links (lines between nodes)
//         svg.selectAll("line")
//             .data(links)
//             .enter()
//             .append("line")
//             .style("stroke", "#3498db") // Blue color for links
//             .style("stroke-width", 2);

//         // Add nodes (circles representing each step)
//         svg.selectAll("circle")
//             .data(nodes)
//             .enter()
//             .append("circle")
//             .attr("r", 10)
//             .style("fill", "#2ecc71") // Green color for nodes
//             .style("stroke", "#fff") // White stroke for circles
//             .style("stroke-width", 2);

//         // Add text labels to nodes
//         svg.selectAll("text")
//             .data(nodes)
//             .enter()
//             .append("text")
//             .text(d => d.name)
//             .style("fill", "black")
//             .style("font-size", "14px")
//             .style("font-family", "Arial, sans-serif")
//             .attr("dx", 12)
//             .attr("dy", 4);

//         // Update positions of elements during simulation ticks
//         simulation.on("tick", () => {
//             svg.selectAll("line")
//                 .attr("x1", d => d.source.x)
//                 .attr("y1", d => d.source.y)
//                 .attr("x2", d => d.target.x)
//                 .attr("y2", d => d.target.y);

//             svg.selectAll("circle")
//                 .attr("cx", d => d.x)
//                 .attr("cy", d => d.y);

//             svg.selectAll("text")
//                 .attr("x", d => d.x)
//                 .attr("y", d => d.y);
//         });

//         return () => {
//             simulation.stop();
//         };
//     }, [pathway]);

//     return <svg ref={svgRef} width="600" height="400"></svg>;
// };

// export default PathwayGraph;






const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const GOOGLE_GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; 
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

router.post("/generate", async (req, res) => {
    const { technology } = req.body;

    try {
        console.log("Received technology:", technology);

        const prompt = `Generate a short and concise learning pathway for mastering ${technology}. Each stage should have a title, a brief description (1-2 sentences), and 1-2 key resources or topics. Limit each stage to no more than 3 bullet points. Ensure that the descriptions are compact, clear, and not overly detailed. Each stage should be visually distinct and easy to read. also don't provide the bold words in any of your response basically i have to generate a pathway graph to learn about mentioned technology so provide in that way`;

        const payload = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        console.log("Payload:", payload);

        const response = await axios.post(`${GOOGLE_GEMINI_API_URL}?key=${API_KEY}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("API Response:", response.data);

        const generatedPathway = response.data.candidates[0].content.parts[0].text;

        // Split the string into smaller, concise steps
        const pathwayArray = generatedPathway.split('\n').map(step => step.trim()).filter(step => step !== "");

        // Send the simplified pathway array to the frontend
        res.json({ pathway: pathwayArray });
    } catch (error) {
        console.error("Error generating pathway:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate pathway" });
    }
});

module.exports = router;

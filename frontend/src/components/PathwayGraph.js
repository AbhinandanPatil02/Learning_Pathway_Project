// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const PathwayGraph = ({ pathway }) => {
//     const svgRef = useRef();
//     const containerRef = useRef();

//     useEffect(() => {
//         if (!Array.isArray(pathway) || pathway.length === 0) {
//             console.error('Invalid pathway data, expected a non-empty array.');
//             return;
//         }

//         const container = d3.select(containerRef.current);
//         const svg = d3.select(svgRef.current);
//         svg.selectAll('*').remove(); // Clear the SVG content

//         const width = 1500;
//         const height = 1000;

//         // Create zoom behavior
//         const zoom = d3.zoom()
//             .scaleExtent([0.5, 5]) // Allow zooming between 50% and 500%
//             .on('zoom', (event) => {
//                 svg.select('g').attr('transform', event.transform);
//             });

//         container.call(zoom);

//         // Add a group element to apply zoom transformations
//         const g = svg.append('g');

//         // Prepare tree data
//         const root = d3.hierarchy(
//             {
//                 name: 'Learning Pathway',
//                 children: pathway.map((stage) => ({
//                     name: stage.title,
//                     children: stage.subtopics.map((subtopic) => ({
//                         name: subtopic,
//                     })),
//                 })),
//             }
//         );

//         const treeLayout = d3.tree().size([width - 200, height - 200]);
//         treeLayout(root);

//         // Add links (lines between nodes)
//         g.selectAll('line')
//             .data(root.links())
//             .enter()
//             .append('line')
//             .attr('x1', d => d.source.x)
//             .attr('y1', d => d.source.y)
//             .attr('x2', d => d.target.x)
//             .attr('y2', d => d.target.y)
//             .style('stroke', '#aaa')
//             .style('stroke-width', 2);

//         // Add nodes (circles representing each step)
//         g.selectAll('circle')
//             .data(root.descendants())
//             .enter()
//             .append('circle')
//             .attr('cx', d => d.x)
//             .attr('cy', d => d.y)
//             .attr('r', 20)
//             .style('fill', '#3498db');

//         // Add text labels to nodes
//         g.selectAll('text')
//             .data(root.descendants())
//             .enter()
//             .append('text')
//             .attr('x', d => d.x + 25) // Position text slightly to the right of the nodes
//             .attr('y', d => d.y + 5) // Center text vertically
//             .text(d => d.data.name)
//             .style('fill', 'black')
//             .style('font-size', '12px');

//         // Cleanup on unmount
//         return () => {
//             svg.selectAll('*').remove();
//         };
//     }, [pathway]);

//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: '100%',
//                 height: '500px',
//                 overflow: 'auto',
//                 border: '1px solid #ccc',
//                 borderRadius: '10px',
//                 backgroundColor: '#f4f4f4',
//             }}
//         >
//             <svg ref={svgRef} width="1500" height="1000"></svg>
//         </div>
//     );
// };

// export default PathwayGraph;



import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PathwayGraph = ({ pathway }) => {
    const svgRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        if (!Array.isArray(pathway) || pathway.length === 0) {
            console.error('Invalid pathway data, expected a non-empty array.');
            return;
        }

        const container = d3.select(containerRef.current);
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear the SVG content

        const width = 1500;
        const height = 1000;

        // Create zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5]) // Allow zooming between 50% and 500%
            .on('zoom', (event) => {
                svg.select('g').attr('transform', event.transform);
            });

        container.call(zoom);

        // Add a group element to apply zoom transformations
        const g = svg.append('g');

        // Map the pathway to nodes
        const nodes = pathway.map((step, i) => ({ id: i, name: step }));

        // Create links between nodes
        const links = nodes.slice(1).map((node, i) => ({ source: i, target: i + 1 }));

        // Initialize D3 force simulation with adjusted parameters for spacing
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(200)) // Increased link distance for more space
            .force('charge', d3.forceManyBody().strength(-400)) // Adjust charge strength for better spacing
            .force('center', d3.forceCenter(width / 2, height / 2));

        // Add links (lines between nodes)
        g.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style('stroke', '#aaa');

        // Add nodes (circles representing each step)
        g.selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 20) // Increased radius for better visibility
            .style('fill', '#2ecc71');

        // Add text labels to nodes
        g.selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(d => d.name)
            .style('fill', 'black')
            .style('font-size', '12px')
            .attr('dx', 25) // Position text slightly to the right of the nodes
            .attr('dy', 5); // Center text vertically

        // Update positions of elements during simulation ticks
        simulation.on('tick', () => {
            g.selectAll('line')
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            g.selectAll('circle')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            g.selectAll('text')
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

        // Cleanup simulation on component unmount
        return () => {
            simulation.stop();
        };
    }, [pathway]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '500px',
                overflow: 'auto',
                border: '1px solid #ccc',
                borderRadius: '10px',
                backgroundColor: '#f4f4f4',
            }}
        >
            <svg ref={svgRef} width="1500" height="1000"></svg>
        </div>
    );
};

export default PathwayGraph;



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


import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PathwayGraph = ({ pathway }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!pathway || !pathway.name || !pathway.children) {
      console.error("Invalid pathway data:", pathway);
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const width = svgRef.current.clientWidth;
    const height = width * 0.75;

    // Add SVG and set its viewBox to scale properly
    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", "translate(50, 0)");

    // Create a hierarchy
    const root = d3.hierarchy(pathway);
    const treeLayout = d3.tree().size([height - 100, width - 200]);
    treeLayout(root);

    // Define curved links
    const linkGenerator = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    // Add links
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .style("fill", "none")
      .style("stroke", "#888")
      .style("stroke-width", 2);

    // Add nodes
    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", 12)
      .style("fill", (d) => (d.children ? "#3498db" : "#2ecc71"))
      .style("stroke", "#fff")
      .style("stroke-width", 3)
      .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))");

    // Add text to nodes with the full text always visible
    nodes
      .append("text")
      .attr("dx", 15)
      .attr("dy", 5)
      .style("font-size", "14px")
      .style("fill", "#333")
      .style("font-weight", "bold")
      .style("font-family", "Arial, sans-serif")
      .style("pointer-events", "none") // Prevent text overlap on interaction
      .text((d) => d.data.name);

    // Add title for the tooltip on hover (full text will show on hover)
    nodes.append("title").text((d) => d.data.name);

    // Add zoom and pan functionality
    const zoomBehavior = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    svg.call(zoomBehavior);

    // Set SVG width and height as responsive values
    svg.attr("width", "100%").attr("height", height);
  }, [pathway]);

  return <svg ref={svgRef}></svg>;
};

export default PathwayGraph;

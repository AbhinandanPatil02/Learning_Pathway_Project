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

    // Make width and height responsive based on the container
    const width = svgRef.current.clientWidth;  // Get width of parent container
    const height = width * 0.75;  // Set height as 75% of width, adjust as needed

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
      .text((d) => d.data.name); // Always show full text

    // Add title for the tooltip on hover (full text will show on hover)
    nodes
      .append("title")
      .text((d) => d.data.name); // Full name will be shown in tooltip on hover

    // Set SVG width and height as responsive values
    svg
      .attr("width", "100%")
      .attr("height", height);

  }, [pathway]);

  return <svg ref={svgRef}></svg>;
};

export default PathwayGraph;

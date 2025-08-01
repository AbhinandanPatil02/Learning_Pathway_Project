
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PathwayGraph = ({ pathway }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Resize observer to update container size
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      const height = width * 0.75; // maintain 4:3 ratio
      setDimensions({ width, height });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pathway || !pathway.name || !pathway.children) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear SVG

    const { width, height } = dimensions;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", "translate(50, 0)");

    const root = d3.hierarchy(pathway);
    const treeLayout = d3.tree().size([height - 100, width - 100]);
    treeLayout(root);

    const linkGenerator = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .style("fill", "none")
      .style("stroke", "#888")
      .style("stroke-width", 2);

    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    nodes
      .append("circle")
      .attr("r", 12)
      .style("fill", (d) => (d.children ? "#3498db" : "#2ecc71"))
      .style("stroke", "#fff")
      .style("stroke-width", 3)
      .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))");

    nodes
      .append("text")
      .style("font-size", "12px")
      .style("fill", "#333")
      .style("font-weight", "bold")
      .style("font-family", "Arial, sans-serif")
      .style("pointer-events", "none")
      .attr("dy", 5)
      .attr("dx", 18)
      .style("text-anchor", "start")
      .text((d) => d.data.name);

    nodes.append("title").text((d) => d.data.name);

    const zoomBehavior = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    svg.call(zoomBehavior);
  }, [pathway, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        paddingBottom: "20px",
      }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }}></svg>
    </div>
  );
};

export default PathwayGraph;


import { useState } from "react";
import TreeNode from "./TreeNode";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  useEffect(() => {
    fetch("https://ubique.img.ly/frontend-tha/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleHighlight = (nodeId, node) => {
    const descendants = getDescendants(node);

    setHighlightedNodes((prev) => {
      const newHighlightedNodes = [...prev];
      const index = newHighlightedNodes.indexOf(nodeId);

      if (index > -1) {
        // If the node is already highlighted, remove it and its descendants
        descendants.forEach((id) => {
          const idx = newHighlightedNodes.indexOf(id);
          if (idx > -1) newHighlightedNodes.splice(idx, 1);
        });
        newHighlightedNodes.splice(index, 1);
      } else {
        // If the node is not highlighted, add it and its descendants
        newHighlightedNodes.push(nodeId, ...descendants);
      }

      return newHighlightedNodes;
    });
  };

  const handleNodeClick = (nodeId) => {
    const node = findNodeById(data, nodeId);
    if (node) toggleHighlight(nodeId, node);
  };

  const findNodeById = (nodes, nodeId) => {
    for (const node of nodes) {
      if (node.id === nodeId) return node;
      if (node.children) {
        const childNode = findNodeById(node.children, nodeId);
        if (childNode) return childNode;
      }
    }
    return null;
  };

  const getDescendants = (node) => {
    let descendants = [];
    if (node.children) {
      for (const child of node.children) {
        descendants.push(child.id);
        descendants = descendants.concat(getDescendants(child));
      }
    }
    return descendants;
  };

  return (
    <>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-4">Tree Structure</h1>
        <ul>
          {data.map((node, index) => (
            <TreeNode
              key={index}
              node={node}
              onNodeClick={handleNodeClick}
              highlightedNodes={highlightedNodes}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

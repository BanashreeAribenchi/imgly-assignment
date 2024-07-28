import { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [leafData, setLeafData] = useState(null); // State to store fetched data for a leaf node
  const [error, setError] = useState(null); // State to hold error message

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
    if (node) {
      toggleHighlight(nodeId, node);
      if (!node.children) {
        // Fetch data if it's a leaf node
        fetchLeafData(nodeId);
      }
    }
  };

  const fetchLeafData = (nodeId) => {
    fetch(`https://ubique.img.ly/frontend-tha/entries/${nodeId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data not found");
        }
        return response.json();
      })
      .then((data) => {
        setLeafData(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching leaf data:", error);
        setLeafData(null); // Clear leaf data if fetch fails
        setError("Data not found or unable to fetch data.");
      });
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
        <div className="flex">
          <ul className="w-1/2">
            {data.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onNodeClick={handleNodeClick}
                highlightedNodes={highlightedNodes}
              />
            ))}
          </ul>
          <div className="w-1/2 p-4 border-l border-gray-300">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : leafData ? (
              <div>
                <h2 className="text-xl font-bold mb-2">Leaf Data</h2>
                <pre>{JSON.stringify(leafData, null, 2)}</pre>
              </div>
            ) : (
              <div>Select a leaf node to see its data.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

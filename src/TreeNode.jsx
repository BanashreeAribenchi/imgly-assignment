import React from "react";

const TreeNode = ({ node, onNodeClick, highlightedNodes, fetchLeafData }) => {
  // Check if the current node is highlighted
  const isHighlighted = highlightedNodes.includes(node.id);

  // Handle click event to toggle highlight
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onNodeClick(node.id);

    // Fetch data if it is a leaf node
    if (!node.children) {
      fetchLeafData(node.id);
    }
  };

  return (
    <li
      className={`ml-4 list-none ${isHighlighted ? "bg-yellow-200" : ""}`}
      onClick={handleClick}
    >
      <span className="cursor-pointer">{node.label}</span>
      {node.children && (
        <ul className="pl-4 border-l border-gray-300">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onNodeClick={onNodeClick}
              highlightedNodes={highlightedNodes}
              fetchLeafData={fetchLeafData}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;

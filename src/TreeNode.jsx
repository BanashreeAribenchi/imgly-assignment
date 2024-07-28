import React from "react";

const TreeNode = ({ node, onNodeClick, highlightedNodes }) => {
  // Check if the current node is highlighted
  const isHighlighted = highlightedNodes.includes(node.id);

  // Handle click event to toggle highlight
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onNodeClick(node.id);
  };

  return (
    <li
      className={`ml-4 list-none ${isHighlighted ? "bg-yellow-200" : ""}`}
      onClick={handleClick}
    >
      {node.label}
      {node.children && (
        <ul className="pl-4 border-l border-gray-300">
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onNodeClick={onNodeClick}
              highlightedNodes={highlightedNodes}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;

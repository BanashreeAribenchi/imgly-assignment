import React from "react";

const TreeNode = ({ node }) => {
  return (
    <li className="ml-4 list-none">
      {node.label}
      {node.children && (
        <ul className="pl-4 border-l border-gray-300">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;

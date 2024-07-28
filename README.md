# Tree Structure with Drag-and-Drop and Data Fetching

This project implements a tree structure where users can interact with the nodes in various ways. Features include highlighting nodes, fetching additional data for leaf nodes, and dragging and dropping nodes to reorganize the tree. The new tree structure is printed to the console after each modification.

## Features

- **Highlight Nodes**: Click on a node to highlight it and all its descendants. Click again to remove the highlight.
- **Fetch Leaf Data**: Click on a leaf node (a node without children) to fetch and display additional data from an external source.
- **Drag-and-Drop**: Drag any node and drop it onto another node to move it and its sub-tree to the new location. The updated tree structure is printed to the console.

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```
git clone <repository_url>
cd <repository_name>
```

2. Install dependencies:

```
npm install
```

## Running the Project

1. Start the development server:

```
npm run dev
```

2. Open your browser and navigate to http://localhost:3000 to view the application

## File Structure
- **App.jsx**: Main component that fetches the initial tree data, manages state, and handles node interactions.
- **TreeNode.jsx**: Recursive component that renders each node and its children, supports highlighting, data fetching, and drag-and-drop functionality.

## Code Explanation
**App.jsx**
- State Management:
  - data: Holds the tree structure data.
  - highlightedNodes: Tracks highlighted nodes and their descendants.
  - leafData: Stores additional data fetched for leaf nodes.
  - error: Holds error messages if data fetching fails.
  - draggedNode: Tracks the node being dragged.

- Effects:
  - Fetches initial tree data from https://ubique.img.ly/frontend-tha/data.json.

- Handlers:
  - toggleHighlight(nodeId, node): Highlights/unhighlights a node and its descendants.
  - handleNodeClick(nodeId): Handles node click events, including highlighting and fetching leaf data.
  - fetchLeafData(nodeId): Fetches additional data for a leaf node.
  - handleDragStart(e, node): Sets the dragged node.
  - handleDrop(e, targetNode): Moves the dragged node to a new position and prints the updated tree structure.

- Helper Functions:
  - findNodeById(nodes, nodeId): Finds a node by its ID in the tree.
  - getDescendants(node): Gets all descendants of a node.
  - moveNode(nodes, nodeToMove, targetNode): Moves a node and its descendants to a new parent node.
  - removeNode(nodes, nodeId): Removes a node and its descendants from the tree.

- TreeNode.jsx
  - Renders each node and its children.
  - Handles click events to toggle highlights and fetch leaf data.
  - Implements drag-and-drop functionality.

## Usage
### Highlighting Nodes
Click on any node to highlight it and its descendants. Click again to remove the highlight.

### Fetching Leaf Data
Click on a leaf node to fetch additional data from https://ubique.img.ly/frontend-tha/entries/${id}.json. The fetched data will be displayed beside the tree.

### Drag-and-Drop
Drag a node by clicking and holding, then drop it onto another node to move it and its sub-tree to the new position. The updated tree structure is printed to the console.


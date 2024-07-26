import { useState } from "react";
import TreeNode from "./TreeNode";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://ubique.img.ly/frontend-tha/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-4">Tree Structure</h1>
        <ul>
          {data.map((node, index) => (
            <TreeNode key={index} node={node} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

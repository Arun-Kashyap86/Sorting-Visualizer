import { useState } from "react";
import "../App.css";

function Control({
  array,
  setArray,
  activeBars,
  sortedBars,
  isSorting,
  setIsSorting,
  startSorting,
  pauseResume,
  setSortedBars,
  setActiveBars,
  clearArray
}) {
  const [algo, setAlgo] = useState("bubble");
  const [speed, setSpeed] = useState(100);
  const [inputArray, setInputArray] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const generateRandomArray = () => {
    if(isSorting){
      return;
    }
      
    setSortedBars([]);
    setActiveBars([]);
    const arr = Array.from(
      { length: 30 },
      () => Math.floor(Math.random() * 300) + 30
    );

    setArray(arr);
  };

  const handleInputArray = () => {
    const arr = inputArray
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    if (arr.length) setArray(arr);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <h1>Sorting Visualizer</h1>

      <div className="controls">
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="quickSort">Quick Sort</option>
        </select>

        <button onClick={generateRandomArray}>
          Random Array
        </button>

        <button
          onClick={() => startSorting(algo, speed)}
          disabled={isSorting}
        >
          Start
        </button>

        <button
          onClick={pauseResume}
          disabled={!isSorting}
        >
          Pause / Resume
        </button>

        <button
          onClick={clearArray}
          // disabled={!isSorting}
          style={{ backgroundColor: "#ba2222", }}
        >
          Clear
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
        >
          Theme
        </button>
      </div>

      <div className="input-box">
        <input
          placeholder="10,5,30,20"
          value={inputArray}
          onChange={(e) =>
            setInputArray(e.target.value)
          }
        />

        <button onClick={handleInputArray}>
          Set Array
        </button>
      </div>

      <div className="speed"  >
        <label>Delay :</label>

        <input
          type="range"
          min="20"
          max="500"
          value={speed}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
        />

        {speed} ms
      </div>

      <div className="array-container">
        {array.map((value, idx) => {
          let className = "bar";

          if (sortedBars.includes(idx))
            className += " sorted";
          else if (activeBars.includes(idx))
            className += " active";

          return (
            <div
              key={idx}
              className={className}
              style={{
                height: `${value}px`,
              }}
            >
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Control;
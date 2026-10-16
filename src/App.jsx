import { useState, useRef } from "react";
import "./App.css";

import bubbleSort from "./algorithms/bubbleSort";
import selectionSort from "./algorithms/selectionSort";
import insertionSort from "./algorithms/insertionSort";
import quickSort from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";

import Control from "./components/Control";

function App() {
  const [array, setArray] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);


  const stopRef = useRef(false);
  const pauseRef = useRef(false);

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const waitWhilePaused = async () => {
    while (pauseRef.current) {
      await sleep(100);
    }
  };

  const startSorting = async (algo, speed) => {
    console.log(isSorting)
    if(isSorting)
        return
    setIsSorting(true);
    stopRef.current = false;
    pauseRef.current = false;

    const config = {
      array,
      setArray,
      setActiveBars,
      setSortedBars,
      speed,
      stopRef,
      waitWhilePaused,
      isSorting,
      setIsSorting
    };

    switch (algo) {
      case "bubble":
        await bubbleSort(config);
        break;

      case "selection":
        await selectionSort(config);
        break;

      case "insertion":
        await insertionSort(config);
        break;

      case "mergeSort":
        await mergeSort(config);
        break;

      case "quickSort":
        await quickSort(config);
        break;

      default:
        break;
    }

    setActiveBars([]);
    setSortedBars([...Array(array.length).keys()]);
    setIsSorting(false);
  };

const clearArray = () => {
  stopRef.current = true;
  pauseRef.current = false;
  setIsSorting(false)

  setArray([]);
  setActiveBars([]);
  setSortedBars([]);
  setIsSorting(false);
};
  const pauseResume = () => {
    pauseRef.current = !pauseRef.current;
  };

  return (
    <Control
      array={array}
      setArray={setArray}
      activeBars={activeBars}
      sortedBars={sortedBars}
      isSorting={isSorting}
      setIsSorting={setIsSorting}
      startSorting={startSorting}
      pauseResume={pauseResume}
      setSortedBars={setSortedBars}
      setActiveBars={setActiveBars}
      clearArray={clearArray}
    />
  );
}

export default App;
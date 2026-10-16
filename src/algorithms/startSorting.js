 
 import bubbleSort from "./bubbleSort"
 import selectionSort from "./selectionSort";
 import insertionSort from "./insertionSort";
 import quickSort from "./quickSort";
 import mergeSort from "./mergeSort";
 
const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

const waitWhilePaused = async () => {
    while (pauseRef.current) {
        await sleep(100);
    }
};

 export const startSorting = async (algo, speed) => {
    stopRef.current = false;
    pauseRef.current = false;

    setSortedBars([]);
    setIsSorting(true);

    const config = {
      array,
      setArray,
      setActiveBars,
      setSortedBars,
      speed,
      stopRef,
      waitWhilePaused,
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
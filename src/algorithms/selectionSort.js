const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function selectionSort({
  array,
  setArray,
  setActiveBars,
  setSortedBars,
  speed,
  stopRef,
  waitWhilePaused,
}) {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (stopRef.current) return;
      await waitWhilePaused();
      // Highlight the current minimum candidate and the bar being compared
      setActiveBars([minIdx, j]);
      await sleep(speed);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // If a smaller element was found, swap it with the current index
    if (minIdx !== i) {
      if (stopRef.current) return;
      await waitWhilePaused();

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }
   // Mark current index as sorted
    setSortedBars((prev) => [...prev, i]);
  }  // Clear active bar highlights at the end
  setActiveBars([]);
}
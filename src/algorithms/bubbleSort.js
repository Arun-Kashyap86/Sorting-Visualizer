const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function bubbleSort({
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
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (stopRef.current) return;
      await waitWhilePaused();
      setActiveBars([j, j + 1]);
      await sleep(speed);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        setArray([...arr]);
        await sleep(speed);
      }
    }

    setSortedBars((prev) => [...prev, arr.length - i - 1]);
  }  
}
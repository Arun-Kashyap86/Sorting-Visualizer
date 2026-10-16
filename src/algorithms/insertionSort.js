const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function insertionSort({
  array,
  setArray,
  setActiveBars,
  setSortedBars,
  speed,
  stopRef,
  waitWhilePaused,
}) {
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    if (stopRef?.current) return;
    await waitWhilePaused();

    let key = arr[i];
    let j = i - 1;

    // 1. Initial highlight showing the element 'key' and the element next to it
    setActiveBars([i, j]);
    await sleep(speed);

    while (j >= 0 && arr[j] > key) {
      if (stopRef?.current) return;
      await waitWhilePaused(); 
      // 2. Explicitly highlight BOTH index j and index (j + 1) during comparison/shift
      setActiveBars([j, j + 1]);
      await sleep(speed);
      
      // Perform array shift
      arr[j + 1] = arr[j];
      setArray([...arr]);

      // Allow UI time to render the shifted array while keeping bars active
      await sleep(speed);

      j--;
    }

    // Place key into position
    arr[j + 1] = key;
    setArray([...arr]);

    // Highlight the insertion position briefly
    setActiveBars([j + 1]);
    await sleep(speed);

    // Update sorted indices list
    setSortedBars(Array.from({ length: i + 1 }, (_, index) => index));
  }

  // Final cleanup: clear active highlights and mark everything as sorted
  setActiveBars([]);
  setSortedBars(Array.from({ length: arr.length }, (_, index) => index));
}
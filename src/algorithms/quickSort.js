const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function quickSort({
  array,
  setArray,
  setActiveBars,
  setSortedBars,
  speed,
  stopRef,
  waitWhilePaused,
}) {
  const arr = [...array];

  async function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopRef.current) return -1;

      await waitWhilePaused();

      // comparing bar + pivot
      setActiveBars([j, high]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);

    return i + 1;
  }

  async function sort(low, high) {
    if (stopRef.current) return;

    await waitWhilePaused();

    if (low < high) {
      const pi = await partition(low, high);

      if (pi === -1) return;

      setSortedBars((prev) => [...new Set([...prev, pi])]);

      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  }

  await sort(0, arr.length - 1);

  setActiveBars([]);
  setSortedBars([...Array(arr.length).keys()]);
  setArray([...arr]);
}
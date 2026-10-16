const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function mergeSort({
  array,
  setArray,
  setActiveBars,
  setSortedBars,
  speed,
  stopRef,
  waitWhilePaused,
}) {
  const arr = [...array];

  async function merge(left, mid, right) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      if (stopRef.current) return;

      await waitWhilePaused();

      // Highlight the two compared bars
      setActiveBars([left + i, mid + 1 + j]);
      await sleep(speed);

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }

      setArray([...arr]);
      await sleep(speed);

      k++;
    }

    while (i < leftPart.length) {
      if (stopRef.current) return;

      await waitWhilePaused();

      setActiveBars([left + i]);

      arr[k] = leftPart[i];
      i++;
      k++;

      setArray([...arr]);
      await sleep(speed);
    }

    while (j < rightPart.length) {
      if (stopRef.current) return;

      await waitWhilePaused();

      setActiveBars([mid + 1 + j]);

      arr[k] = rightPart[j];
      j++;
      k++;

      setArray([...arr]);
      await sleep(speed);
    }
  }

  async function sort(left, right) {
    if (stopRef.current) return;

    await waitWhilePaused();

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await sort(left, mid);
    await sort(mid + 1, right);

    await merge(left, mid, right);
  }

  await sort(0, arr.length - 1);

  setActiveBars([]);
  setSortedBars([...Array(arr.length).keys()]);
  setArray([...arr]);
}
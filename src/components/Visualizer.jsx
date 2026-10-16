function Visualizer({
  array,
  activeBars,
  sortedBars
}) {
  return (
    <div className="visualizer">

      {array.map((value, index) => {

        let color = "#3b82f6";

        if (
          activeBars.includes(index)
        )
          color = "red";

        if (
          sortedBars.includes(index)
        )
          color = "green";

        return (
          <div
            key={index}
            className="bar"
            style={{
              height: value,
              backgroundColor: color
            }}
          />
        );
      })}
    </div>
  );
}

export default Visualizer;
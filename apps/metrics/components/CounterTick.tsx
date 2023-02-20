import React from "react";
type Props = {
  count: number;
};
const CounterTick = ({ count }: Props) => {
  return (
    <div style={{ float: "right", position: "absolute", top: 10, right: 20 }}>
      {count}
    </div>
  );
};

export default CounterTick;

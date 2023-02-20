import React from "react";
import ClipLoader from "react-spinners/PuffLoader";
const Busy = () => {
  return (
    <div style={{ float: "right", position: "absolute", top: 10, right: 20 }}>
      <ClipLoader
        color={"blue"}
        loading={true}
        size={35}
        data-testid="loader"
      />
    </div>
  );
};

export default Busy;

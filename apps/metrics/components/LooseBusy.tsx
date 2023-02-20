import React from "react";
import ClipLoader from "react-spinners/PuffLoader";
const LooseBusy = () => {
  return (
    <div
      style={{ float: "right", position: "absolute", top: "45%", left: 100 }}
    >
      <ClipLoader
        color={"#d1d5db"}
        loading={true}
        size={35}
        data-testid="loader"
      />
    </div>
  );
};

export default LooseBusy;

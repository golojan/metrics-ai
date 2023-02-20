import React from "react";
import ClipLoader from "react-spinners/PuffLoader";
const Loading = () => {
  return (
    <div className="relative">
      <ClipLoader
        color={"blue"}
        loading={true}
        size={50}
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;

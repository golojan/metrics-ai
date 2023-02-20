import React from "react";
import ClipLoader from "react-spinners/BeatLoader";
const Wait = () => {
  return (
    <ClipLoader
      color={"gray"}
      loading={true}
      size={5}
      data-testid="loader"
    />
  );
};

export default Wait;

import React from 'react';

type ReportMenuBoxProps = {
  children: React.ReactNode;
};
const ReportMenuBox = (props: ReportMenuBoxProps) => {
  const { children } = props;
  return (
    <div className="col-12 col-md-12 col-xxl-3 col-xl-3 col-lg-3 my-1">
      {children}
    </div>
  );
};

export default ReportMenuBox;

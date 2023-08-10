import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={142}
    height={36}
    viewBox="0 0 142 36"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="1" rx="17" ry="17" width="142" height="36" />
  </ContentLoader>
);

export default Skeleton;

import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={160}
    height={160}
    viewBox="0 0 160 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="80" cy="80" r="80" />
  </ContentLoader>
);

export default Skeleton;

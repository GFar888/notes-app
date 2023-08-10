import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={240}
    height={272}
    viewBox="0 0 240 272"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="1" rx="29" ry="29" width="237" height="267" />
  </ContentLoader>
);

export default Skeleton;

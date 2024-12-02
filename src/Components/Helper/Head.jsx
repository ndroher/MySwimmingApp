import React from "react";

const Head = (props) => {
  React.useEffect(() => {
    document.title = props.title + " | MySwimmingApp";
  }, [props]);

  return <></>;
};

export default Head;

import React from "react";
import Meta from "./../components/Meta";
import NewFundraise from "./../components/Fundraise";
import { requireAuth } from "./../util/auth";
function NewFundraisePage(props) {
  
    return (
    <>
      <Meta title="New Fundraise" />
      <NewFundraise
      />
    </>
  );
}

export default requireAuth(NewFundraisePage);

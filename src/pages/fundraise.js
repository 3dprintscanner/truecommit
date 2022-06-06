import React from "react";
import Meta from "./../components/Meta";
import Fundraise from "./../components/Fundraise";
import { requireAuth } from "./../util/auth";
import { useRouter } from "./../util/router";
function FundraisePage(props) {
    const router = useRouter();
  
    return (
    <>
      <Meta title="Fundraise" />
      <Fundraise
        key={router.query.id}
      />
    </>
  );
}

export default requireAuth(FundraisePage);

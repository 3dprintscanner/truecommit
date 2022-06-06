import React from "react";
import { useRouter } from "../util/router";
import Fundraises from '../components/FundRaises'

function FundRaisesPage(props) {
  const router = useRouter();

  return (
    <Fundraises/>
  );
}

export default FundRaisesPage;

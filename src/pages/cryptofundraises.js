import React from "react";
import { useRouter } from "../util/router";
import Cryptofundraises from '../components/Cryptofundraises'

function FundRaisesPage(props) {
  const router = useRouter();

  return (
    <Cryptofundraises/>
  );
}

export default FundRaisesPage;

import React, { useState, useRef } from "react";
import Meta from "./../components/Meta";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import ClientsSection from "./../components/ClientsSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import CtaSection from "./../components/CtaSection";
import Web3 from 'web3'
import ABI from '../data/f6d72e584f9c6e176d0b340e8f9097a9.json'


const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const checkGreeting = async () => {
  const web3 = new Web3("http://localhost:8545")
  const contract = new web3.eth.Contract(ABI.output.contracts['contracts/Greeter.sol'].Greeter.abi, contractAddress);
  const result = await contract.methods.greet().call()
  console.log(result, "results")
}



function IndexPage(props) {
  console.log(window.ethereum)
  const [from, setFrom] = useState(null)

  // window.ethereum.on("accountsChanged", (accounts) => { handle here})
  const [greetMessage, setGreetMessage] = useState(null)
  console.log(greetMessage)
  const ref  = useRef(0)
  const handleClick =  async() =>  {
    const web3 = new Web3("http://localhost:8545")
    const contract = new web3.eth.Contract(ABI.output.contracts['contracts/Greeter.sol'].Greeter.abi, contractAddress);
    
    const setGreeting = await contract.methods.setGreeting(greetMessage).send({from:from})
    console.log(setGreeting)

  }

  const handleSetFrom = async () => {
    const result = await window.ethereum.request({method: 'eth_requestAccounts'})
    console.log(result)
    setFrom(result[0])
  }

  checkGreeting()
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="primary"
        size="large"
        bgImage="https://source.unsplash.com/ugnrXk1129g/1600x800"
        bgImageOpacity={0.3}
        title="TrueCommit"
        subtitle="Back projects not vaporware, link contributions directly to purchases"
        buttonText="Get Started"
        buttonColor="secondary"
        buttonPath="/pricing"
      />
      <input type="text" onChange={(event) => setGreetMessage(event.target.value)}></input>
      <button onClick={handleSetFrom}>Click me to set from address</button>
      <button onClick={handleClick}>Click me for Greeting</button>
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Features"
        subtitle="All the features you need to move faster"
      />
      <ClientsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="You're in good company"
        subtitle=""
      />
      <TestimonialsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      />
      <NewsletterSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        buttonColor="primary"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      />
      <CtaSection
        bgColor="primary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="default"
        buttonPath="/pricing"
      />
    </>
  );
}

export default IndexPage;

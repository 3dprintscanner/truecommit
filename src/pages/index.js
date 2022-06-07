import React, { useState, useRef, useEffect } from "react";
import Meta from "./../components/Meta";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import ClientsSection from "./../components/ClientsSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import CtaSection from "./../components/CtaSection";
import Web3 from 'web3'
import ABI from '../data/f6d72e584f9c6e176d0b340e8f9097a9.json'
import FundraiseFactory from '../data/contracts/FundraiseFactory.sol/FundraiseFactory.json'
import FundRaise from '../data/contracts/Fundraise.sol/FundRaise.json'


// const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const factoryAddress = '0xC1eA07D6FA9B03eD0Ea89C324Cad137959519A72'


// const checkGreeting = async () => {
//   const web3 = new Web3("http://localhost:8545")
//   const contract = new web3.eth.Contract(ABI.output.contracts['contracts/Greeter.sol'].Greeter.abi, contractAddress);
//   const result = await contract.methods.greet().call()
//   console.log(result, "results")
// }

function IndexPage(props) {
  console.log(window.ethereum)
  const [from, setFrom] = useState(null)
  const [raises, setRaises] = useState(null)
  const [fundraiseNames, setFundraiseNames] = useState({})

  // window.ethereum.on("accountsChanged", (accounts) => { handle here})
  const [greetMessage, setGreetMessage] = useState(null)
  console.log(greetMessage)
  const ref  = useRef(0)
  const handleClick =  async () =>  {
    const web3 = new Web3(window.ethereum)
    const factory = new web3.eth.Contract(FundraiseFactory['abi'], factoryAddress);
    console.log(factory.methods);
    const raises = await factory.methods.fundraiseList().call();
    console.log(raises)
    setRaises(raises)

  }

  const createFundraise = async () => {
    console.log('clicked');
    const web3 = new Web3(window.ethereum)
    const factory = new web3.eth.Contract(FundraiseFactory['abi'], factoryAddress);
    console.log(factory)
    const result = await factory.methods.deployNewInstance(from, from, "pepo test", 2, from).send({from: from})
    console.log(result)
  }

  const handleSetFrom = async () => {
    const result = await window.ethereum.request({method: 'eth_requestAccounts'})

    setFrom(result[0])
    window.alert(result)
  }

  const handleResult = (address, name) => {
    // update name to address of the fundraise contracts
    console.log(name);
    console.log(fundraiseNames);
    const newNames = {...fundraiseNames}
    newNames[address] = name;
    setFundraiseNames(newNames)
  }

  useEffect(() => {
    // gets the data from the raises and prints the name of the fundraise??
    console.log('raises effect')
    const doWork = async () => {
      if(!raises){
        return
      }
      raises.forEach(async r => {
        const web3 = new Web3("https://smart1.zeniq.network:9545")
        const contract = new web3.eth.Contract(FundRaise['abi'], r);
        const name = await contract.methods.name().call();
        handleResult(r, name)
      })
    }

    doWork();

  }, [raises])

  return (
    <>
      <Meta />
      <HeroSection
        bgColor="primary"
        size="large"
        bgImage="/img/heroimage.png"
        bgImageOpacity={0.3}
        title="Back projects, not vaporware"
        subtitle="True Commit builds in accountability into funding, directly linking investments to end purposes"
        subtitleStyle="h6"
        buttonText="View campaigns"
        buttonColor="secondary"
        buttonPath="/fundraises"
      />
      {/* <input type="text" onChange={(event) => setGreetMessage(event.target.value)}></input>
      <button onClick={handleSetFrom}>Click me to set from address</button>
      <button onClick={handleClick}>Click me for Greeting</button>
      <button onClick={createFundraise}>Click me for New Fundraise</button>
      <p>{fundraiseNames && Object.keys(fundraiseNames).map(k => (`${k} - ${fundraiseNames[k]}`))}</p> */}
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Smarter, accountable funding"
        subtitle="Powered by smart contracts"
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
        buttonColor="secondary"
        buttonPath="/fundraises"
      />
    </>
  );
}

export default IndexPage;

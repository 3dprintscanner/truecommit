import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Web3 from 'web3'
import ABI from '../data/f6d72e584f9c6e176d0b340e8f9097a9.json'
import FundraiseFactory from '../data/contracts/FundraiseFactory.sol/FundraiseFactory.json'
import FundRaise from '../data/contracts/Fundraise.sol/FundRaise.json'


const factoryAddress = '0xC1eA07D6FA9B03eD0Ea89C324Cad137959519A72'

export default function FundraiseForm(props) {

    const { open, setOpen, contractData } = props

    const [name, setName] = useState(null);
    const [goal, setGoal] = useState(0);
    const [from, setFrom] = useState(null)

    const createFundraise = async () => {
        console.log('clicked');
        const web3 = new Web3(window.ethereum)
        const factory = new web3.eth.Contract(FundraiseFactory['abi'], factoryAddress);
        console.log(factory)
        const result = await factory.methods.deployNewInstance(from, from, name, goal, from).send({ from: from })
        console.log(result)
    }

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        const doWork = async () => {
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setFrom(result[0])
        }
        doWork();
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleGoalChange = (event) => {
        setGoal(parseInt(event.target.value));
    }
  

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new fundraiser here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        onChange={handleNameChange}
                        autoComplete={false}
                    />
                    <Divider style={{ marginBottom: 8 }} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="goal"
                        label="Goal"
                        type="number"
                        onChange={handleGoalChange}
                        autoComplete={false}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createFundraise} color="primary" variant="contained">
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
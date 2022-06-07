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
import CircularProgress from '@material-ui/core/CircularProgress';

import FundRaiseABI from '../data/contracts/Fundraise.sol/FundRaise.json'
import Web3 from 'web3'
export default function CryptoFundraiseModal(props) {

    const { open, setOpen, id, changeBalance } = props

    const [ contribution, setContribution ] = useState(0);
    const [ from, setFrom ] = useState(null);
    const [ loading, setLoading ] = useState(false);

  
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

  
    const handleContributionChange = (event) => {
        setContribution(parseInt(event.target.value));
    }
  
    const fundContract = async () => {
        const web3 = new Web3(window.ethereum)
        const raiseContract = new web3.eth.Contract(FundRaiseABI['abi'], id);
        raiseContract.methods.contribute().send({ from: from, value: web3.utils.toBN((contribution * 1000000000000000000) * 0.01) })
        .on('sending', () => setLoading(true))
        .on('receipt', () => {
            setLoading(false);
            setOpen(false);
            changeBalance();
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contribute</DialogTitle>
                <DialogContent>
                    {loading ? <CircularProgress/> : <><DialogContentText>
                        Contribute to the fundraise here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contribution"
                        label="Contribution"
                        type="number"
                        onChange={handleContributionChange}
                        autoComplete={false}
                    />
                    <Divider style={{marginBottom: 8}} />
                    <Typography variant="body1">Contribution: { Math.max(0, contribution) }</Typography></> }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>                    
                    <Button onClick={fundContract} color="primary" variant="contained">
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
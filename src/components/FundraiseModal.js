import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function FormDialog(props) {

    const { open, setOpen, contractData } = props
    console.log(contractData)

    const [ sliderValues, setSliderValues ] = useState([]);
    const [ contribution, setContribution ] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSliderValues(contractData.vaults.map(v => 0))
    }, [contractData])

    useEffect(() => {

    },[contribution])

    const handleSliderChange = (index) => {
        return (event, value) => {
            console.log(event, value)
            let newSliderValues = [].concat(sliderValues);
            newSliderValues[index] = value
            console.log(newSliderValues)
            setSliderValues(newSliderValues)
        }
    }

    const handleContributionChange = (event) => {
        setContribution(parseInt(event.target.value));
    }
    const committedFunds = () => {
        const totalCommitted = sliderValues.reduce((acc, curr) => acc + curr, 0)
        console.log(totalCommitted);
        return totalCommitted;
    }

   

    const mapVault = (vault, index) => {
        
        console.log(sliderValues, 'values')
        console.log(contribution, 'contribution')
        
        const disabled = contribution == 0 || (vault.goal - vault.current <= 0) ? true : false
        const maxCommittal = contribution - committed; 
        return (
            <ListItem>
                <Grid container direction="row" spacing={2} justifyContent='flex-end'>
                    <Grid item>
                        {vault.item}
                    </Grid>
                    <Grid item lg={8}>
                        <Slider onChange={handleSliderChange(index)} min={0} max={Math.min(vault.goal - vault.current, contribution )} disabled={disabled} step={0.1} />
                        <Typography>{sliderValues[index]}</Typography>
                    </Grid>
                </Grid>
                
            </ListItem>
        )
    }
    const committed = committedFunds();
    const gas = 0.0002;
    const txFees = committed > 0 ? committed * 0.001 : 0
    const netContribution = committed - txFees - gas
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contribute</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Contribute to the fundraise here and distribute your funds into each vault
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
                    <List>
                        {contractData && sliderValues && contractData.vaults.map((v, idx) => mapVault(v, idx))}
                    </List>
                    <Divider style={{marginBottom: 8}} />
                    <Typography variant="body2">Total Allocated: {`${committedFunds()}`}</Typography>
                    <Typography variant="body2">Gas: {gas}</Typography>
                    <Typography variant="body2">Transaction Fees: { txFees}</Typography>
                    <Typography variant="body1">Net Contribution: { Math.max(0, netContribution) }</Typography>
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
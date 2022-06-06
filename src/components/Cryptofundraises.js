import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useRouter } from "./../util/router";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Web3 from 'web3'
import ABI from '../data/f6d72e584f9c6e176d0b340e8f9097a9.json'
import FundraiseFactory from '../data/contracts/FundraiseFactory.sol/FundraiseFactory.json'
import FundRaise from '../data/contracts/Fundraise.sol/FundRaise.json'
import FundraiseForm from './FundraiseForm';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    productGrid: { marginBottom: theme.spacing(2) },
    fab: {
        margin: theme.spacing(2),
        position: 'relative',
        right: 0,
        zIndex: 999
    }

}));

const dummyData = [
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/domp.gif',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    },
    {
        name: 'PepoRaise',
        image: 'img/hypers.jpg',
        shortDescription: 'this is the short description',
        owner: {
            name: "Angelo Jones",
            image: '/img/profileimage.jpg',
            verified: true
        },
        fundingTarget: 50,
        current: 25,
        id: 2
    }
]

const factoryAddress = '0xC1eA07D6FA9B03eD0Ea89C324Cad137959519A72'



const ThisCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const router = useRouter();
    const { id, } = props
    const [name, setName] = useState('null')
    const [goal, setGoal] = useState('null')

    const handleClick = (id) => {
        router.push(`/fundraise/${id}`)
    }



    useEffect(() => {
        console.log('raises effect')
        const web3 = new Web3(window.ethereum)
        const doWork = async () => {
            if (!id) {
                return
            }
            const contract = new web3.eth.Contract(FundRaise['abi'], id);
            const name = await contract.methods.name().call();
            setName(name)
        }

        doWork();
    }, [id])

    useEffect(() => {
        console.log('raises effect')
        const web3 = new Web3(window.ethereum)
        const doWork = async () => {
            if (!id) {
                return
            }
            const contract = new web3.eth.Contract(FundRaise['abi'], id);
            const goal = await contract.methods.goal().call();
            setGoal(goal)
        }

        doWork();
    }, [id])

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} />
                }
                title={id}
                subheader={`${goal} ZENIQ`}
            />
            <CardMedia
                className={classes.media}
                image={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`}
                title={id}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="fund" onClick={() => handleClick(id)}>
                    <AccountBalanceIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

const Cryptofundraises = (props) => {
    const classes = useStyles();

    const [from, setFrom] = useState(null)
    const [raises, setRaises] = useState(null)
    const [open, setOpen] = useState(false)
    const [fundraiseNames, setFundraiseNames] = useState({})

    const loadFundraisers = async () => {
        const web3 = new Web3(window.ethereum)
        const factory = new web3.eth.Contract(FundraiseFactory['abi'], factoryAddress);
        console.log(factory.methods);
        const raises = await factory.methods.fundraiseList().call();
        console.log(raises)
        setRaises(raises)
    }

    useEffect(() => {
        loadFundraisers();
    }, [])

    return (
        <Container>
            <Typography variant='h4'>Current Campaigns</Typography>
            <Grid container direction='row' spacing={2} justifyContent='space-around' alignItems='flex-start'>
                {raises && raises.map((d, idx) => (
                    <Grid item key={idx} lg={3} xl={3} className={classes.productGrid}>
                        <ThisCard id={d} />
                    </Grid>
                ))}
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setOpen(!open)}>
                <AddIcon />
            </Fab>
            <FundraiseForm open={open} setOpen={setOpen} contractData={{}}/>
        </Container>
    )
}


export default Cryptofundraises;
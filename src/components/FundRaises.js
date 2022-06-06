import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useRouter } from "./../util/router";
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


const ThisCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const router = useRouter();
    const {name, image, shortDescription, owner, fundingTarget, current, id } =  props

    const handleClick = (id) => {
        router.push(`/fundraise/${id}`)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={owner.image} className={classes.avatar}/>
                }
                title={name}
                subheader={`${current} of ${fundingTarget} ZENIQ`}
            />
            <CardMedia
                className={classes.media}
                image={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {shortDescription}
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

const FundRaises = (props) => {
    const classes = useStyles();

    return (
        <Container>
                <Typography variant='h4'>Current Campaigns</Typography>
                <Grid container direction='row' spacing={2} justifyContent='space-around' alignItems='flex-start'>
                    {dummyData && dummyData.map((d, idx) => (
                        <Grid item key={idx} lg={3} xl={3} className={classes.productGrid}>
                            <ThisCard {...d} />
                        </Grid>
                    ))}
                </Grid>

        </Container>
    )
}


export default FundRaises;
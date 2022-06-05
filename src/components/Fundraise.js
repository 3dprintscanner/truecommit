import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
import Button from "@material-ui/core/Button";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Link } from "./../util/router";
import Avatar from "@material-ui/core/Avatar";
import LinkMui from "@material-ui/core/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { verifyMessage } from "ethers/lib/utils";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import * as colors from "@material-ui/core/colors";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const sampleData = {
    title: 'Camera Equipment for my new documentary on Mexico',
    image: '/img/campaignimage.jpg',
    description: 'Angelo jones is fundraising for his new documentary on the streets of playa del carmen, talking to the locals and eating tacos.',
    owner: {
        name: "Angelo Jones",
        image: '/img/profileimage.jpg',
        verified: true
    },
    vaults: [
        { item: 'Canon Camera', goal: 400, current: 200, image: '/img/image_1.jpg', url: 'https://www.amazon.com/Nikon-D7500-DX-Format-Digital-Body/dp/B06Y5ZCFHX' },
        { item: 'Tripods', goal: 100, current: 20, image: '/img/image_1-1.jpg', url: 'https://www.amazon.com/UBeesize-Continuous-Photography-Adjustable-Low-Angle/dp/B08L4DB1CC' },
        { item: 'Bacon rolls', goal: 100, current: 100, image: '/img/image_1-1.jpg', url: 'https://www.amazon.com/UBeesize-Continuous-Photography-Adjustable-Low-Angle/dp/B08L4DB1CC' },
    ],
    goal: 600,
    current: 320
}


const useStyles = makeStyles((theme) => ({
    owner: {
        backgroundColor: theme.default,
        gap: theme.spacing(1)
    },
    paper: {
        width: '100%',
        padding: theme.spacing(1),
        backgroundColor: colors.grey[200],
        borderRadius: theme.spacing(2),

    },
    titleImage: {
        width: '100%',
        height: 'auto'
    },
    icon: {
        color: colors.green[300]
    },
    fundTarget: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: '#fff'
    },
    progress: {
        color: colors.green[300]
    },
    assurance: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4
    },
    side: {
        height: 'fit-content'
    },
    listProgress: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    },
    listItem: {
        border: `2px solid ${colors.grey[200]}`,
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    vaultProgress: {
        backgroundColor: colors.grey[300],
        display: 'flex',
        alignItems: 'flex-start',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: theme.spacing(2)
    }
}));



function Fundraise(props) {

    const classes = useStyles();
    const theme = useTheme();


    const verifyUser = () => {
        if (!sampleData.owner.verified) {
            return null
        }
        return (<VerifiedUserOutlinedIcon className={classes.icon} />)
    }

    const getProgress = () => {
        return Math.round((sampleData.current / sampleData.goal) * 100)
    }

    const makeListItem = (vault) => {
        const progressValue = Math.floor((vault.current / vault.goal) * 100)
        return (
            <>
                <ListItem className={classes.listItem}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
                        <Grid item>
                            <img src={vault.image} />
                        </Grid>
                        <Grid item lg={6}>
                            <Box>
                                <Typography variant="h5">{vault.item}</Typography>
                                <Typography variant="subtitle1">{vault.goal}</Typography>
                                <LinkMui component={Link} to={vault.url}>View Item</LinkMui>
                            </Box>
                        </Grid>
                        <Grid item className={classes.vaultProgress} row >
                            <Box sx={{ width: '100%', maxWidth: 300 }}>
                                <LinearProgress variant="determinate" value={progressValue} color="primary" />
                            </Box>
                            <Grid item>
                                <Typography variant="h6">{`${progressValue}% Funded`}</Typography>
                                <Typography variant="subtitle1">{`${vault.current} of ${vault.goal} ZENIQ`}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            </>

        )
    }

    console.log(theme)
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item container lg={7} spacing={2}>
                    <Grid item row>
                        <Typography variant='h4'>{sampleData.title}</Typography>
                    </Grid>
                    <Grid item row>
                        <img src={sampleData.image} className={classes.titleImage} />
                    </Grid>
                    <Grid container row item xs={12} spacing={2} >
                        <Box className={classes.paper}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className={classes.owner}>
                                <Box>
                                    <Avatar src={sampleData.owner.image} sx={{ width: 72, height: 72 }} />
                                </Box>
                                <Box container>
                                    <Typography variant="subtitle2">Campaign Creator</Typography>
                                    <Typography variant="h5">{`${sampleData.owner.name} `}{verifyUser()}</Typography>
                                    <LinkMui component={Link} to="/elprofile"> View Profile</LinkMui>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid row item>
                        <Typography>{sampleData.description}</Typography>
                        <LinkMui component={Link} to="/elprofile"> Read More</LinkMui>
                    </Grid>

                </Grid>
                <Grid item container lg={5}>
                    <Grid row container className={classes.side}>
                        <Section bgColor="default"
                            bgImage=""
                            size="auto"
                            sx={{ borderRadius: 16, borderColor: theme.palette.primary.main, border: 'solid 2px', width: '100%', overflow: 'hidden' }}
                            bgImageOpacity={1}>
                            <Box className={classes.fundTarget}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <Typography variant="h6">{sampleData.current} of {sampleData.goal} Zeniq</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">1 of 3 Vaults Funded</Typography>
                                    </Grid>
                                    <Grid item>
                                        <LinearProgress variant="determinate" value={getProgress()} color="secondary" />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary">Back This Campaign</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className={classes.assurance}>
                                <Box sx={{ padding: 8 }}>
                                    <VerifiedUserOutlinedIcon className={classes.icon} />
                                </Box>
                                <Box container sx={{ padding: 4 }}>
                                    <Typography variant="subtitle2">Secured with TrueCommit™</Typography>
                                    <Typography>Once fully funded each contract vaults funds will go directly into purchasing the items detailed.</Typography>
                                    <LinkMui component={Link} to="/elprofile"> Find out more</LinkMui>
                                </Box>
                            </Box>
                        </Section>
                    </Grid>
                </Grid>
                <Grid item container lg={12} direction="column">
                    <Grid item row>
                        <Typography variant="h5">Vaults in this campaign</Typography>
                    </Grid>
                    <Grid item>
                        <List>
                            {sampleData && sampleData.vaults.map(v => makeListItem(v))}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Fundraise;

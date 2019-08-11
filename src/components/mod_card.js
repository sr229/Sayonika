import React from 'react';
import { Paper, Typography, Avatar, Fab } from '@material-ui/core';
import GamepadIcon from '@material-ui/icons/Gamepad';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArchiveIcon from '@material-ui/icons/Archive';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import CodeIcon from '@material-ui/icons/Code';
import BetaIcon from 'mdi-material-ui/Beta';
import { makeStyles } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';
import { fromModColor } from '../utils/colors';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    baseLink: {
        textDecoration: 'none'
    },
    root: {
        paddingBottom: theme.spacing.unit * 2
    },
    backgroundRoot: {
        height: 175,
        backgroundColor: color => fromModColor(color, 'dark', theme),
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
    },
    modLogo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        backgroundColor: color => fromModColor(color, 'main', theme),
        width: 128,
        height: 128,
        marginTop: -64
    },
    contentRoot: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 2,
        marginTop: 0
    },
    modTitle: {
        textAlign: 'center',
        paddingBottom: theme.spacing.unit
    },
    categoryRoot: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    category: {
        display: 'flex',
        verticalAlign: 'middle',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    categoryIcon: {
        paddingRight: theme.spacing.unit
    },
    fab: {
        margin: theme.spacing(1)
    },
    fabIcon: {
        padding: theme.spacing(1)
    }
}));

const statusCategory = (type, category, favorites, handleFavorite) => {
    const classes = useStyles();
    switch (type) {
        case 0:
            return (
                <div className={classes.categoryRoot}>
                    <div
                        style={{ color: '#666', fill: '#666' }}
                        className={classes.category}
                    >
                        <ArchiveIcon className={classes.categoryIcon} />
                        <Typography>Archived</Typography>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className={classes.categoryRoot}>
                    <div
                        style={{ color: '#666', fill: '#666' }}
                        className={classes.category}
                    >
                        <HourglassFullIcon className={classes.categoryIcon} />
                        <Typography>Planning</Typography>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className={classes.categoryRoot}>
                    <div
                        style={{ color: orange[500], fill: orange[500] }}
                        className={classes.category}
                    >
                        <CodeIcon className={classes.categoryIcon} />
                        <Typography>In Development</Typography>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className={classes.categoryRoot}>
                    <div
                        style={{ color: red[500], fill: red[500] }}
                        className={classes.category}
                    >
                        <BetaIcon className={classes.categoryIcon} />
                        <Typography>Beta</Typography>
                    </div>
                </div>
            );
        case 4:
            return (
                <div className={classes.categoryRoot}>
                    <div className={classes.category}>
                        <GamepadIcon className={classes.categoryIcon} />
                        <Typography>{category}</Typography>
                    </div>
                    <div className={classes.category}>
                        <Fab
                            size="small"
                            className={classes.fab}
                            onClick={handleFavorite}
                        >
                            <FavoriteIcon className={classes.fabIcon} />
                        </Fab>
                        <Typography>{favorites}</Typography>
                    </div>
                </div>
            );
    }
};

const ModCard = ({
    id,
    title,
    description,
    logo,
    themeColor,
    header,
    status,
    category,
    favorites
}) => {
    const classes = useStyles(themeColor);

    const handleFavoriteToggle = event => {
        event.preventDefault();
    };

    return (
        <Link to={`/mod/${id}`} className={classes.baseLink}>
            <Paper className={classes.root}>
                <div
                    className={classes.backgroundRoot}
                    style={{
                        backgroundImage: `url(${header})`
                    }}
                />
                <Avatar className={classes.modLogo} src={logo} />
                <div className={classes.contentRoot}>
                    <Typography className={classes.modTitle} variant="h4">
                        {title}
                    </Typography>
                    <Typography paragraph variant="caption">
                        {description ? description : 'No description provided.'}
                    </Typography>
                </div>
                {statusCategory(
                    status,
                    category,
                    favorites,
                    handleFavoriteToggle
                )}
            </Paper>
        </Link>
    );
};

ModCard.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string,
    status: propTypes.number.isRequired,
    header: propTypes.string,
    themeColor: propTypes.number,
    logo: propTypes.string,
    category: propTypes.string.isRequired,
    favorites: propTypes.number
};

export default ModCard;

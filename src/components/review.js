import API from '../utils/api';
import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '../components/rating';

import propTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.grey[200],
        display: 'flex',
        padding: theme.spacing.unit * 2
    },
    avatar: {
        width: 64,
        height: 64,
        backgroundColor: theme.palette.primary.dark
    },
    content: {
        paddingLeft: theme.spacing.unit * 2,
        width: '100%'
    },
    reviewHeader: {
        display: 'flex'
    },
    reviewName: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    toolbar: {
        display: 'flex'
    }
}));

const Review = ({ id, title, rating, content, author_id }) => {
    const [data, setData] = useState({});

    const classes = useStyles();

    useEffect(() => {
        API.getUser({}, author_id).then(data => {
            setData({ data });
        }).catch(e => console.error(e));
    }, []);

    return (
        <Paper className={classes.root}>
            <Avatar src={data.avatar} className={classes.avatar}/>
            <div className={classes.content}>
                <div className={classes.reviewHeader}>
                    <Typography variant="h5" className={classes.reviewName}>
                        {data.username || 'John Doe'}
                    </Typography>
                    <Rating rating={rating}/>
                </div>
                <Typography paragraph>{content}</Typography>
                <Toolbar>
                    <div className={classes.grow}/>
                    <div>
                        <IconButton>
                            <ThumbUpIcon/>
                        </IconButton>
                        <IconButton>
                            <ThumbDownIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        </Paper>
    );
};

Review.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    content: propTypes.string.isRequired,
    author_id: propTypes.string.isRequired
};

export default Review;

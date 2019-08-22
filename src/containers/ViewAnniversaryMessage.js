import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

//redux imports
import { connect } from "react-redux";
import { getAnniversaryData, clearAnniversaryMsg } from "../actions/anniversaryactions"

const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

});

class ViewAnniversaryMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        // This binding is necessary to make `this` work in the callback
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        const { classes } = this.props;
        var msg = this.props.msg;
        var error = this.props.error;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="secondary">
                        View Anniversary
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="referenceId"
                                    label="Reference ID"
                                    name="referenceId"
                                    autoComplete="referenceId"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            View
                        </Button>
                    </form>
                </div>
            </Container>
        );

    }

}

function mapStateToProps(state) {
    // console.log(state)
    return {
        error: state.anniversary.get_anniversary_api_err,
        msg: state.anniversary.get_anniversary_api_msg
    };
}

ViewAnniversaryMessage.propTypes = {
    classes: PropTypes.object.isRequired
};

const StylesViewAnniversaryMessage = withStyles(styles)(ViewAnniversaryMessage);

export default connect(
    mapStateToProps,
    { getAnniversaryData, clearAnniversaryMsg }
)(StylesViewAnniversaryMessage);


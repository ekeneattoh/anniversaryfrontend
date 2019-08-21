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
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

//redux imports
import { connect } from "react-redux";
import { saveAnniversary, clearAnniversaryMsg } from "../actions/anniversaryactions"

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

class CreateAnniversary extends Component {

    constructor(props) {
        super(props);
        this.state = {

            clientName: "",
            clientEmail: "",
            recipientName: "",
            recipientEmail: "",
            anniversaryDate: "",
            customMessage: "",

            show_spinner: false

        };

        // This binding is necessary to make `this` work in the callback
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        // console.log(name)
        this.setState({
            [name]: event.target.value
        });
    };

    handleSaveAnniversary = (event) => {

        event.preventDefault();

        //show the spinner
        this.setState({ show_spinner: true });

        let data = {
            clientName: this.state.clientName.trim().toUpperCase(),
            clientEmail: this.state.clientEmail.trim(),
            recipientName: this.state.recipientName.trim().toUpperCase(),
            recipientEmail: this.state.recipientEmail.trim(),
            anniversaryDate: this.state.anniversaryDate.trim(),
            customMessage: this.state.customMessage.trim()
        };
        this.props.saveAnniversary(data).then(() => {
            this.setState({ show_spinner: false });
        });

    }

    clearApiMsg() {
        setTimeout(() => {
            this.props.clearAnniversaryMsg();
        }, 3000); //3 seconds
    }

    render() {

        const { classes } = this.props;
        var msg = this.props.msg;
        var error = this.props.error;

        // console.log(msg)

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="secondary">
                        Create Anniversary
                    </Typography>

                    {this.state.show_spinner ? (
                        <CircularProgress className={classes.progress} color="secondary" />
                    ) : null}

                    {msg ? (
                        <Paper className={classes.root} elevation={1}>
                            <Typography color="secondary" component="h1" variant="h5">
                                {msg}
                            </Typography>
                            {this.clearApiMsg()}
                        </Paper>
                    ) : null}
                    {error ? (
                        <Paper className={classes.root} elevation={1}>
                            <Typography color="error" component="h1" variant="h5">
                                {error}
                            </Typography>
                            {this.clearApiMsg()}
                        </Paper>
                    ) : null}

                    <form className={classes.form} onSubmit={this.handleSaveAnniversary}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="clientName"
                                    name="clientName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="clientName"
                                    label="Your Name"
                                    autoFocus
                                    value={this.state.clientName}
                                    onChange={this.handleChange("clientName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="clientEmail"
                                    label="Your Email"
                                    name="clientEmail"
                                    autoComplete="clientEmail"
                                    value={this.state.clientEmail}
                                    onChange={this.handleChange("clientEmail")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="recipientName"
                                    label="Recipient's Name"
                                    name="recipientName"
                                    autoComplete="recipientName"
                                    value={this.state.recipientName}
                                    onChange={this.handleChange("recipientName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="recipientEmail"
                                    label="Recipient's Email"
                                    name="recipientEmail"
                                    autoComplete="recipientEmail"
                                    value={this.state.recipientEmail}
                                    onChange={this.handleChange("recipientEmail")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="anniversaryDate"
                                    label="Recipient's Anniversary (mm-dd)"
                                    name="anniversaryDate"
                                    autoComplete="ranniversaryDate"
                                    value={this.state.anniversaryDate}
                                    onChange={this.handleChange("anniversaryDate")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="customMessage"
                                    label="Custom Message"
                                    name="customMessage"
                                    autoComplete="customMessage"
                                    value={this.state.customMessage}
                                    onChange={this.handleChange("customMessage")}
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
                            Save
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
        error: state.anniversary.save_anniversary_api_err,
        msg: state.anniversary.save_anniversary_api_msg
    };
}


CreateAnniversary.propTypes = {
    classes: PropTypes.object.isRequired
};

const StylesCreateAnniversary = withStyles(styles)(CreateAnniversary);

export default connect(
    mapStateToProps,
    { saveAnniversary, clearAnniversaryMsg }
)(StylesCreateAnniversary);

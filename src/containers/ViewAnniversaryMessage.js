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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },

});

//dialog
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);


class ViewAnniversaryMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            referenceId: "",
            show_spinner: false,
            open: false

        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        // console.log(name)
        this.setState({
            [name]: event.target.value
        });
    };

    handleGetnniversary = (event) => {

        event.preventDefault();

        //show the spinner
        this.setState({ show_spinner: true });

        let data = {
            fileName: this.state.referenceId.trim()
        };
        this.props.getAnniversaryData(data).then(() => {
            this.setState({ show_spinner: false });
            this.handleClickOpen();
        });

    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    clearApiMsg() {
        setTimeout(() => {
            this.props.clearAnniversaryMsg();
        }, 3000); //3 seconds
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

                    {this.state.show_spinner ? (
                        <CircularProgress className={classes.progress} color="secondary" />
                    ) : null}

                    {/* dialog code */}
                    {msg ?

                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                From {msg.clientName}
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <img src={msg.imageFile} alt="image" width="200" height="180" />
                                </Typography>
                                <Typography gutterBottom>
                                    {msg.customMessage}
                                </Typography>
                                <Typography gutterBottom>

                                    <Button variant="outlined" color="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>

                                </Typography>
                            </DialogContent>
                        </Dialog>
                        :
                        null
                    }

                    {error ? (
                        <Typography color="error" component="h1" variant="h5">
                            {error}
                            {this.clearApiMsg()}
                        </Typography>

                    ) : null}

                    <form className={classes.form} onSubmit={this.handleGetnniversary}>
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
                                    onChange={this.handleChange("referenceId")}
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


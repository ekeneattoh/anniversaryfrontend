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
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from "@material-ui/core/styles";

//redux imports
import { connect } from "react-redux";
import { getAnniversaryData, clearAnniversaryMsg } from "../actions/anniversaryactions"
import { clearApiMsg } from "../helpers/utils"

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

    card: {
        maxWidth: 345,
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
            open: false,
            spinner_open: false

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

    handleGetAnniversary = (event) => {

        event.preventDefault();

        //open a dialog box and show the spinner
        this.setState({ spinner_open: true })
        this.setState({ show_spinner: true });

        let data = {
            fileName: this.state.referenceId.trim()
        };
        this.props.getAnniversaryData(data).then(() => {
            //close the dialog box and hide the spinner
            this.setState({ spinner_open: true })
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

    clearAnniversaryError() {

        clearApiMsg(this, this.props.clearAnniversaryMsg);
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
                        <Dialog aria-labelledby="customized-dialog-title" open={this.state.spinner_open}>
                            <DialogContent dividers>
                                <CircularProgress className={classes.progress} color="secondary" />
                            </DialogContent>
                        </Dialog>

                    ) : null}

                    {/* dialog code */}
                    {msg ?

                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                From {msg.clientName}
                            </DialogTitle>
                            <DialogContent dividers>
                                <Card className={classes.card}>
                                    <img src={msg.imageFile} alt={msg.customMessage}/>
                                </Card>
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
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                            <DialogContent dividers>
                                <Typography color="error" component="h1" variant="h5">
                                    {error}
                                    {this.clearAnniversaryError()}
                                </Typography>
                            </DialogContent>
                        </Dialog>


                    ) : null}

                    <form className={classes.form} onSubmit={this.handleGetAnniversary}>
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


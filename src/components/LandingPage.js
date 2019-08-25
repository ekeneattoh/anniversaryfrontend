import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from "@material-ui/core/styles";

import Copyright from '../components/Copyright.js'
import CreateAnniversary from '../containers/CreateAnniversary.js'
import ViewAnniversaryMessage from '../containers/ViewAnniversaryMessage.js'


const styles = theme => ({
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


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* Create Anniversary will be the default view
            so Find Card is set to False by default
            when the switch is toggled, Find Card will be set to True
            */
            checked: false,
            checkText: "View an Anniversary",
            open: false

        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = () => {

        //seState is async so wait until it return before doing updates
        this.setState({ checked: !this.state.checked }, () => {

            if (this.state.checked === true) {

                this.setState({ checkText: "Create an Anniversary" })
            }
            else if (this.state.checked === false) {
                this.setState({ checkText: "View an Anniversary" })
            }
        })


    };

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    render() {

        const { classes } = this.props;

        return (

            <div>

                {/* about ncheta */}
                <Button color="secondary" onClick={this.handleClickOpen}>
                    About Ncheta
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        What is Ncheta?
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Ncheta is an app that allows you to save anniversary dates and a custom message (like birthdays, wedding anniversaries...)
                            of your loved ones, and will send a link via email to that loved one to view your custom message when that date arrives.
                        </Typography>
                        <Typography gutterBottom>
                            You never again have to rush to pick up a card last minute, thanks to Ncheta.
                        </Typography >
                        <Typography gutterBottom>
                            You do however have to remember to save the anniversary, at least one day before the anniversary date.
                        </Typography>
                        <Typography color="error" gutterBottom>
                            Don't see a mail from Ncheta? Make sure to check your spam folder.
                        </Typography>
                        <Typography gutterBottom>

                            <Button variant="outlined" color="secondary" onClick={this.handleClose}>
                                Close
                            </Button>

                        </Typography>
                    </DialogContent>
                </Dialog>

                {this.state.checked === false ?
                    (<CreateAnniversary />)
                    :
                    <ViewAnniversaryMessage />
                }

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography color="secondary">{this.state.checkText}</Typography>
                        <FormControlLabel
                            control={
                                <Switch checked={this.state.checked} onChange={() => this.handleChange()} value={this.state.checkText} />
                            }
                        />
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </div>

        )
    }
}

export default LandingPage;

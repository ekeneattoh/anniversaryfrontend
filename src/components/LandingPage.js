import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import Copyright from '../components/Copyright.js'
import CreateAnniversary from '../containers/CreateAnniversary.js'
import ViewAnniversaryMessage from '../containers/ViewAnniversaryMessage.js'

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* Create Anniversary will be the default view
            so Find Card is set to False by default
            when the switch is toggled, Find Card will be set to True
            */
            checked: false,
            checkValue: "saveAnniversary",
            checkText: "Find Card?",

        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = () => {

        //seState is async so wait until it return before doing updates
        this.setState({ checked: !this.state.checked }, () => {

            if (this.state.checked === true) {

                this.setState({ checkText: "Save Anniversary" })
            }
            else if (this.state.checked === false) {
                this.setState({ checkText: "Find Card?" })
            }
        })


    };

    render() {

        const { classes } = this.props;

        return (

            <div>
                <CreateAnniversary />
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

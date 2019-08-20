import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Copyright from '../components/Copyright.js'

import CreateAnniversary from '../containers/CreateAnniversary.js'

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkboxText: "Show Anniversary Card",
            checkboxValue: "saveAnniversary"

        };

        // This binding is necessary to make `this` work in the callback
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        const { classes } = this.props;

        return (

            <div>
                <CreateAnniversary />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value={this.state.checkboxValue} color="primary" />}
                            label={this.state.checkboxText}
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

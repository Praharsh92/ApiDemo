import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const Eligibility = () => (
	<div>
		<Grid item xs={12} style={{ padding: 8 }}>
			<TextField
				id="standard-name"
				label="Name"
				value="Test Text Field, no functionality"
				margin="normal"
				fullWidth
			/>
		</Grid>
	</div>
);


export default Eligibility;

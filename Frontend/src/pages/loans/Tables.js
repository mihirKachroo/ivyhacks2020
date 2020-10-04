import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

const datatableData = [
  ["Help me pay rent!", "John Doe", "Yonkers, NY", "$215/830"],
  ["Need to pay medical bills", "Bill Smith", "Hartford, CT", "$795/1009"],
  ["House repairs", "Cole Yaffee", "Tampa, FL", "$300/650"],
  ["Car rent", "Sameh Arsalla", "Dallas, TX", "$40/230"],
  ["Assisstance with child care", "Gavin Hazlett", "Hartford, CT", "$120/160"],
  ["I need help with insulin costs", "Gavin Dickenson", "Yonkers, NY", "$300/480"],
  ["Covid-19 relief for Mom", "Rajan Patel", "Hartford, CT", "$600/760"],
  ["Help me buy a gift for my son's bithday", "Ethan Mere", "Tampa, FL", "$25/30"],
  ["House rent help please!", "Maxwell Taylor", "Hartford, CT", "$500/550"],
  ["Mobile home purchase help", "Tommas Hardee", "Yonkers, NY", "$1250/8000"],
  ["Medicial bills from heart attack too much", "Max Tenhulzen", "Dallas, TX", "$800/1158"],
  ["Lost my Job... need financial help", "Anton Roche", "Yonkers, NY", "$10/2500"],
  ["Help with my two daughters", "Sai Sivakumar", "Dallas, TX", "$30/350"],
  ["My family needs to move for a new job", "Jack Brown", "Yonkers, NY", "$1200/1250"],
  ["Home flooded from Hurricane", "Kevin Nguyen", "Hartford, CT", "$70/1800"],
  ["Family member incarcerated; need help", "Ronak Venkata", "Tampa, FL", "$255/300"],
  ["Help me suprise my wife for our anniversary", "David Huang", "Tampa, FL", "$35/50"],
];

export default function Tables() {
  return (
    <>
      <PageTitle title="Loans" />
      <Grid container spacing={4}>
        <Grid item xs={3.5}>
          <TextField id="standard-basic" label="Amount to Loan (USD $)" helperText="Loans will be given to campaigns checked in the table below"/>  
        </Grid>
        <Grid item xs={7.5}>
          <Button variant="contained" color="primary">Give Loan(s)</Button> 
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Creditors List"
            data={datatableData}
            columns={["Campaign Title", "Name", "Location", "Amount Raised"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

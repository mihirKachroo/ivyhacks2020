import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

const datatableData = [
  ["Help me pay rent!", "John Doe", "Yonkers, NY", "Yes (43%)", "$215/830"],
  ["Need to pay medical bills", "Bill Smith", "Hartford, CT", "Yes (78%)", "$795/1009"],
  ["House repairs", "Cole Yaffee", "Tampa, FL", "Yes (21%)","$300/650"],
  ["Car rent", "Sameh Arsalla", "Dallas, TX", "No (53%)", "$40/230"],
  ["Assisstance with child care", "Gavin Hazlett", "Hartford, CT", "Yes (91%)","$120/160"],
  ["I need help with insulin costs", "Gavin Dickenson", "Yonkers, NY", "Yes (74%)", "$300/480"],
  ["Covid-19 relief for Mom", "Rajan Patel", "Hartford, CT","Yes (68%)", "$600/760"],
  ["Help me buy a gift for my son's bithday", "Ethan Mere", "Tampa, FL", "Yes (98%)","$25/30"],
  ["House rent help please!", "Maxwell Taylor", "Hartford, CT", "No (9%)", "$500/550"],
  ["Mobile home purchase help", "Tommas Hardee", "Yonkers, NY", "Yes (38%)", "$1250/8000"],
  ["Medicial bills from heart attack too much", "Max Tenhulzen", "Dallas, TX", "Yes (78%)", "$800/1158"],
  ["Lost my Job... need money", "Anton Roche", "Yonkers, NY", "No (96%)", "$10/2500"],
  ["Help with my two daughters", "Sai Sivakumar", "Dallas, TX", "Yes (58%)", "$30/350"],
  ["My family needs to move for a new job", "Jack Brown", "Yonkers, NY", "Yes (69%)", "$1200/1250"],
  ["Home flooded from Hurricane", "Kevin Nguyen", "Hartford, CT", "No (39%)", "$70/1800"],
  ["Family member incarcerated; need help", "Ronak Venkata", "Tampa, FL", "Yes (67%)", "$255/300"],
  ["Help me suprise my wife for our anniversary", "David Huang", "Tampa, FL", "Yes (90%)", "$35/50"],
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
            columns={["Campaign Title", "Name", "Location", "IBM Loan Eligibility Score*", "Amount Raised"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={3.5}>
            * IBM Loan Eligibility Score: reports if the candidate's history shows they should repay the loan (Yes) or not (No), along with a confidence score based on the report from 0-100% 
        </Grid>
      </Grid>
    </>
  );
}

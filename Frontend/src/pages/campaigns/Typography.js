import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  MenuItem,
  Card,
  CardMedia,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";

const genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

const dependents = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3+',
    label: '3+',
  },
];

const yesOrNo = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  },
];

const graduate = [
  {
    value: 'Not Graduate',
    label: 'Not Graduate',
  },
  {
    value: 'Graduate',
    label: 'Graduate',
  },
];

const creditHistory = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
];

const propertyOptions = [
  {
    value: 'Urban',
    label: 'Urban',
  },
  {
    value: 'Semiurban',
    label: 'Semiurban',
  },
  {
    value: 'Rural',
    label: 'Rural',
  },
];

export default function TypographyPage() {
  var classes = useStyles();

  const [gender, setGender] = React.useState('Male');
  const [marry, setMarried] = React.useState('No');
  const [dependent, setDependent] = React.useState('0');
  const [education, setEducation] = React.useState('Graduate');
  const [selfEmployed, setSelfEmployed] = React.useState('No');
  const [credit, setCredit] = React.useState('0');
  const [property, setProperty] = React.useState('Urban');
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleMarriedChange = (event) => {
    setMarried(event.target.value);
  }

  const handleDependentChange = (event) => {
    setDependent(event.target.value);
  }

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  }

  const handleSelfEmployedChange = (event) => {
    setSelfEmployed(event.target.value);
  }

  const handleCreditChange = (event) => {
    setCredit(event.target.value);
  }

  const handlePropertyChange = (event) => {
    setProperty(event.target.value);
  }

  return (
    <>
      <PageTitle title="My Campaigns" />
      <Grid container spacing={4}>
        {/*each grid for a running campaign*/}
        <Grid item xs={12} md={6}>
          <Widget title="Help me pay off my car!" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image="../../images/test.jpg"
                  title="I need a new car!"
                />
              </Card>
              <Typography variant="h4" className={classes.text}>
                Amount raised: $170/250
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Funds Needed By: Friday, October 9th
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Repayment By: Tuesday, December 1st
              </Typography>
              <Typography variant="h8" className={classes.text}>
                Hello, I am a single mom who has just lost their daytime job. I'm looking for some short term assitance to help me pay the bills while I find another job. I would appreciate any help possible. I will make sure to pay back all loans given. God bless and thank you for your help!
              </Typography>
              <br></br><br></br>
              <Typography variant="h6" className={classes.text}>
                Loans contributed:
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                Mihir Kachroo: $100                
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
              Harsh Mehta: $70         
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Rent assistance to avoid eviction" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image="../../images/test.jpg"
                  title="I need a new car!"
                />
              </Card>
              <Typography variant="h4" className={classes.text}>
                Amount raised: $400/1100
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Funds Needed By: Saturday, October 24th
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Repayment By: Friday, January 1st
              </Typography>
              <Typography variant="h8" className={classes.text}>
                Hello, I am a single mom who has just lost their daytime job. I usually pay rent just fine, but I need help while I find another job. I will make sure to pay back all the loans given to me. Any help would be greatly appreciated. Feel free to reach out!
              </Typography>
              <br></br><br></br>
              <Typography variant="h6" className={classes.text}>
                Loans contributed:
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                Trip Smith: $85                
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                John Wright Stanly: $165                
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                Will McCoy: $150         
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Create a new campaign" disableWidgetMenu>
            <div className={classes.dashedBorder}>
        
              <form className={classes.root} noValidate autoComplete="off">
                <Typography variant="h3" className={classes.text}>
                  General Campaign Information
                </Typography>
                <TextField id="campaign-title" label="Campaign Title" />
                <br></br>
                <TextField id="image-url" label="Image URL" />
                <br></br>
                <TextField id="description" label="Description" multiline rowsMax={10}/>
                <br></br>
                <TextField id="amount-needed" label="Amount Needed" helperText="Integer for USD dollars needed"/>
                <br></br>
                <TextField id="funds-needed-by" label="Funds Needed By" helperText="# of days loan needed by (example: 1 week = 7)"/>
                <br></br>
                <TextField id="repayments-by" label="Repayments By" helperText="# of days loan can be paid back by (example: 1 year = 365)"/>
                
                <br></br>
                <br></br>
                <Typography variant="h3" className={classes.text}>
                  Loan Eligibility Information
                </Typography>

                

                <TextField id="gender" select label="Gender" value={gender} onChange={handleGenderChange}>
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="married" select label="Married" value={marry} onChange={handleMarriedChange} >
                {yesOrNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="dependents" select label="Dependents" value={dependent} onChange={handleDependentChange} >
                {dependents.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="education" select label="Education" value={education} onChange={handleEducationChange} >
                {graduate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="self-employed" select label="Self Employed" value={selfEmployed} onChange={handleSelfEmployedChange} >
                {yesOrNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="applicant-income" label="Applicant Income" helperText="USD $ Earned Monthly. Enter integer for dollars earned"/>
                <br></br>
                <TextField id="co-applicant-income" label="Co-Applicant Income" helperText="USD $ Earned Monthly. Enter integer for dollars earned"/>
                <br></br>
                <TextField id="credit-history" select label="Credit History" value={credit} onChange={handleCreditChange} helperText="1 = credit history available, vice versa">
                {creditHistory.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField id="property-area" select label="Property Area" value={property} onChange={handlePropertyChange} >
                {propertyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
              </form>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

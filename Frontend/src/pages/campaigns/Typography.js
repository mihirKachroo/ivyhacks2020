import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  MenuItem,
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
        <Grid item xs={12} md={6}>
          <Widget title="Current Campaign" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Typography variant="h1" className={classes.text}>
                h1. Heading
              </Typography>
              <Typography variant="h2" className={classes.text}>
                h2. Heading
              </Typography>
              <Typography variant="h3" className={classes.text}>
                h3. Heading
              </Typography>
              <Typography variant="h4" className={classes.text}>
                h4. Heading
              </Typography>
              <Typography variant="h5" className={classes.text}>
                h5. Heading
              </Typography>
              <Typography variant="h6">h6. Heading</Typography>
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
        <Grid item xs={12} md={6}>
          <Widget title="Basic Text Settings" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Typography className={classes.text}>Basic text</Typography>
              <Typography className={classes.text} weight="light">
                Basic light text
              </Typography>
              <Typography className={classes.text} weight="medium">
                Basic medium text
              </Typography>
              <Typography className={classes.text} weight="bold">
                Basic bold text
              </Typography>
              <Typography className={classes.text}>
                BASIC UPPERCASE TEXT
              </Typography>
              <Typography className={classes.text}>
                basic lowercase text
              </Typography>
              <Typography className={classes.text}>
                Basic Capitalized Text
              </Typography>
              <Typography>
                <i>Basic Cursive Text</i>
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Text Size" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              <Typography className={classes.text} size="sm">
                Heading Typography SM Font Size
              </Typography>
              <Typography className={classes.text}>
                Heading Typography Regular Font Size
              </Typography>
              <Typography className={classes.text} size="md">
                Heading Typography MD Font Size
              </Typography>
              <Typography className={classes.text} size="xl">
                Heading Typography XL Font Size
              </Typography>
              <Typography className={classes.text} size="xxl">
                Heading Typography XXL Font Size
              </Typography>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

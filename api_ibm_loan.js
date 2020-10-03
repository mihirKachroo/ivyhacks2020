const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
var assert = require('assert');
const iam_credentials = new Map();

// ----- (MODIFIED) IBM CODE ----- 

// NOTE: you must manually construct iam_credentials hash map below using information retrieved
// from your IBM Cloud.

let rawCredData = fs.readFileSync('./ibm_iam.json');
let credData = JSON.parse(rawdata);

iam_credentials.set("url", credData["url"]);
iam_credentials.set("username", credData["username"]);
iam_credentials.set("password", credData["password"]);

function apiGet(url, username, password, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	const tokenHeader = "Basic " + btoa((username + ":" + password));
	const tokenUrl = url + "/identity/token";

	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("GET", tokenUrl);
	oReq.setRequestHeader("Authorization", tokenHeader);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send();
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

// ----- JWSTANLY CODE ----- 

const fields = ["Loan_ID","Gender","Married","Dependents","Education","Self_Employed","ApplicantIncome","CoapplicantIncome","LoanAmount","Loan_Amount_Term","Credit_History","Property_Area","Loan_Status"];

function get_loan_eligibility(values){
    assert(Array.isArray(values));
    
    apiGet(iam_credentials.get("url"),
        iam_credentials.get("username"),
        iam_credentials.get("password"),
        function (res) {
            let parsedGetResponse;
            try {
                parsedGetResponse = JSON.parse(this.responseText);
            } catch(ex) {
                console.log("JSON parse failed: error report below");
                console.error(ex);
            }
            if (parsedGetResponse && parsedGetResponse.token) {
                const token = parsedGetResponse.token
                const iamToken = "Bearer " + token;

                // NOTE: manually define and pass the array(s) of values to be scored in the next line
                const payload = '{"fields": ' + 
                                '["' + fields.join('","') + '"],' +
                                '"values": '+
                                '[["' + values.join('","') + '"]]}';
                const scoring_url = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/4cf2d6c4-e80f-4376-8df8-070708bdd21d/predictions";

                apiPost(scoring_url, iamToken, payload, function (resp) {
                    let parsedPostResponse;
                    try {
                        parsedPostResponse = JSON.parse(this.responseText);
                    } catch (ex) {
                        // TODO: handle parsing exception
                    }
                    console.log("Scoring response");
                    console.log(parsedPostResponse);
                    return parsedPostResponse;
                }, function (error) {
                    console.log("Post failed: error report below");
                    console.error(error);
                });
            } else {
                console.error("Failed to retrieve Bearer token");
            }
        }, function (err) {
            console.log("Callback failed: error report below");
            console.error(err);
        }
    );
}

//sample results
/*{
    "predictions": [
        {
            "fields": [
                "Loan_ID",
                "Gender",
                "Married",
                "Dependents",
                "Education",
                "Self_Employed",
                "ApplicantIncome",
                "CoapplicantIncome",
                "LoanAmount",
                "Loan_Amount_Term",
                "Credit_History",
                "Property_Area",
                "Loan_Status",
                "Partition"
            ],
            "values": [
                [
                    "LP002995",
                    "Male",
                    "Yes",
                    "2",
                    "Graduate",
                    "No",
                    75834,
                    0,
                    187,
                    360,
                    1,
                    "Urban",
                    "d",
                    "1_Training"
                ]
            ]
        }
    ]
}//*/
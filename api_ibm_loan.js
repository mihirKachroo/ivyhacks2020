var request = require( 'request' );
var btoa    = require( "btoa" );
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let debugging = true;

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

function get_loan_eligibility(values){
    //values - list of model input values
    //values example - ["LP001002","Male","No","0","Graduate","No",5849,0,128,360,1,"Urban"]

    var apikey = "CdbrjiqNa6oNEcda7YKTgKUEKSlBgV_LueM16cZs6iUh";
    var IBM_Cloud_IAM_uid = "bx";
    var IBM_Cloud_IAM_pwd = "bx";

    var iam_options = { url     : "https://iam.bluemix.net/oidc/token",
                    headers : { "Content-Type"  : "application/x-www-form-urlencoded",
                                "Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
                    body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" };
                    
    const fields = ["Loan_ID","Gender","Married","Dependents","Education","Self_Employed","ApplicantIncome","CoapplicantIncome","LoanAmount","Loan_Amount_Term","Credit_History","Property_Area","Loan_Status"];

    request.post( iam_options, function( error, response, body ){
        
        if(debugging){
            console.log("Response:\n"+JSON.stringify(response));
            console.log("Body:\n" + JSON.stringify(body));
        } 

        var iam_token = JSON.parse( body )["access_token"];
        const payload = '{"fields": ' + 
                        '["' + fields.join('","') + '"],' +
                        '"values": '+
                        '[["' + values.join('","') + '"]]}';
        const scoring_url = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/0f25fe4d-cc51-4b86-860a-876184d5e49e/predictions";
        
        if(debugging) console.log("IAM Token:\n" + JSON.stringify(iam_token));

        apiPost(scoring_url, iam_token, payload, function(resp){
            let parsedPostResponse;
            try {
                if(debugging){
                    console.log("Resp type: " + typeof resp);
                    console.log("Resp:\n"+resp);
                    console.log("This:\n:"+ JSON.stringify(this));
                }
                parsedPostResponse = JSON.parse(this.responseText);
            } catch (ex) {
                console.log("Post callback parse failed")
                console.error(ex);
            }
            console.log("Scoring response");
            console.log(parsedPostResponse);
        }, function(){
            console.error("Post callback failed")
        });
    } );

}

const vals = ["LP001002","Male","No","0","Graduate","No",5849,0,128,360,1,"Urban"];
get_loan_eligibility(vals);
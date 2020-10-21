<script language="javascript" runat="server">
    Platform.Load("core","1.1.5");
try
{

	var eid = Platform.Function.AuthenticatedEnterpriseID();
	var deKey = '9BA79B0F-E4E8-4EA8-97E0-D2721CEFBCC4';
	var clientId = '3q2pu090gtlizkysqjz7un23';
	var clientSecret = 'Z8KCpkESjRWvNzWKal7SiUko';
	var authBaseUrl = 'https://mcx59fk7tyvcfc-t9j-xjkybxtv0.auth.marketingcloudapis.com/';

    var authUrl = authBaseUrl + 'v2/token/'
    var contentType = 'application/json';

    payload =  '{';
    payload += ' "grant_type": "client_credentials",';
    payload += ' "client_id":"' + clientId + '",';
    payload += ' "client_secret":"' + clientSecret + '",';
    payload += ' "scope": "list_and_subscribers_write",';
    payload += ' "account_id": "' + eid + '" ';
    payload += '}';

    var result = HTTP.Post(authUrl, contentType, payload);
    var response = result["Response"][0];
    var accessToken = Platform.Function.ParseJSON(response).access_token;
    var restUrl = Platform.Function.ParseJSON(response).rest_instance_url;

    Platform.Response.Write(" response: " + response);
    Platform.Response.Write("\n\n token: " + accessToken);
    Platform.Response.Write("<br /><br />" + "\n\n rest URL: " + restUrl);

    var headerNames = ["Authorization"];
    var headerValues = ["Bearer " + accessToken];

    payload =  '{';
    payload += '   "deleteOperationType": "ContactAndAttributes",';
    payload += '   "targetList": {';
    payload += '      "listType": {';
    payload += '         "listTypeID":3';
    payload += '      },';
    payload += '   "listKey": "' + deKey + '"';
    payload += '   },';
    payload += '   "deleteListWhenCompleted":false,';
    payload += '   "deleteListContentsWhenCompleted":true';
    payload += '}';
	Platform.Response.Write("<br /><br />" + "\n\n payload: " + payload);

    var deleteEndpoint = restUrl + "contacts/v1/contacts/actions/delete?type=listReference";
Write("<br /><br />" + "\n\n deleteEndpoint: " + deleteEndpoint);
    var result = HTTP.Post(deleteEndpoint, contentType, payload, headerNames, headerValues);
Write("<br /><br />" + "\n\n postsubmitted: ");
    result = Stringify(result);
Write("<br /><br />" + "\n\n postResult: ");
Write("<br /><br />" + "\n\n result: " + result);

    var success = "Success: " + result;
    writeErrorLog(success);
}

catch (e) {
    var result = e.name + ": " + e.message;
    writeErrorLog(result);
}

function writeErrorLog(msg) {
    var errorLogDE = DataExtension.Init("errorlog");
    errorLogDE.Rows.Add({area:"Delete QA Emails", message:msg});
}

</script>

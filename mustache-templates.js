var templates = {

	"martin": {
		"incident.trigger": {
			"subject": "Triggered: {{message.incident.title}}",
			"body": 
`<b>Title:</b> {{message.incident.title}}<br>
<b>Incident Number:</b> {{message.incident.incident_number}}<br>
<b>Created At:</b> {{message.incident.created_at}}<br>
<b>Status:</b> {{message.incident.status}}<br>
<b>URL:</b> {{message.incident.html_url}}<br>
<p>
<h1>Raw webhook:</h1>
<pre>{{messageJSON}}</pre>
<h1>Trigger log entry</h1>
<pre>{{triggerJSON}}</pre>`
		},



		"incident.resolve": {
			"subject": "Resolved: {{message.incident.title}}",
			"body": `<b>Title:</b> {{message.incident.title}}<br>
<b>Incident Number:</b> {{message.incident.incident_number}}<br>
<b>Created At:</b> {{message.incident.created_at}}<br>
<b>Status:</b> {{message.incident.status}}<br>
<b>URL:</b> {{message.incident.html_url}}<br>
<p>
<h1>Raw webhook:</h1>
<pre>{{messageJSON}}</pre>
<h1>Trigger log entry</h1>
<pre>{{triggerJSON}}</pre>`
		},



		"incident.assign": {
			"subject": "Assigned: {{message.incident.title}}",
			"body": 
`<b>Title:</b> {{message.incident.title}}<br>
<b>Incident Number:</b> {{message.incident.incident_number}}<br>
<b>Created At:</b> {{message.incident.created_at}}<br>
<b>Status:</b> {{message.incident.status}}<br>
<b>URL:</b> {{message.incident.html_url}}<br>
<p>
<h1>Raw webhook:</h1>
<pre>{{messageJSON}}</pre>
<h1>Trigger log entry</h1>
<pre>{{triggerJSON}}</pre>`
		},




		"incident.acknowledge": {
			"subject": "Acknowledged: {{message.incident.title}}",
			"body": 
`<b>Title:</b> {{message.incident.title}}<br>
<b>Incident Number:</b> {{message.incident.incident_number}}<br>
<b>Created At:</b> {{message.incident.created_at}}<br>
<b>Status:</b> {{message.incident.status}}<br>
<b>URL:</b> {{message.incident.html_url}}<br>
<p>
<h1>Raw webhook:</h1>
<pre>{{messageJSON}}</pre>
<h1>Trigger log entry</h1>
<pre>{{triggerJSON}}</pre>`
		}
	},
	
	"resolve only": {
		"incident.resolve": {
			"subject": "Resolved: {{message.incident.title}}"
		}
	}
}

var recipients = [
	{
		"addresses": [ "martindstone@example.com", "martin@pagerduty.com" ],
		"template": templates["martin"]
	},
	{
		"addresses": [ "martin@pagerduty.com" ],
		"template": templates["resolve only"]
	}
];

exports.recipients = recipients;

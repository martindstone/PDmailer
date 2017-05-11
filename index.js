// app/index.js

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mustache = require('mustache');

var pd_token = process.env.PD_TOKEN;

var request = require('request');
var pdRequest = request.defaults({
	headers: { 
		"Content-type": "application/json",
		"Accept": "application/vnd.pagerduty+json;version=2",
		"Authorization": "Token token=" + pd_token
	}
});

var mailgun_api_key = process.env.MAILGUN_API_KEY;
var mailgun_domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({
	apiKey: mailgun_api_key, 
	domain: mailgun_domain
});

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

var templates = require('./mustache-templates');


function getTriggerLE(message) {
	var triggerURL = message.incident.first_trigger_log_entry.self;
	
	var options = {
		uri: triggerURL,
		method: "GET",
		qs: {
			"include[]": "channels"
		}
	}
	pdRequest(options, function(error, response, body) {
		if ( ! response.statusCode || response.statusCode < 200 || response.statusCode > 299 ) {
			console.log("Error getting trigger log entry: " + error + "\nResponse: " + JSON.stringify(response, null, 2) + "\nBody: " + JSON.stringify(body, null, 2));
		} else {
			var trigger = JSON.parse(body);
			processMessage(message, trigger);
		}
	});
}

function processMessage(message, trigger) {
	console.log(message.event + ": " + message.incident.html_url);

	templates.recipients.forEach(function(recipient) {
		var template;
		if ( recipient.template[message.event] ) {
			template = recipient.template[message.event];
		} else {
			return;
		}
	
		var view = {
			message: message,
			messageJSON: JSON.stringify(message, null, 4),
			trigger: trigger.log_entry,
			triggerJSON: JSON.stringify(trigger.log_entry, null, 4)
		};
		
		var html = '<h1>Raw webhook</h1><pre>' + JSON.stringify(message, null, 4) + '</pre>';
		var subject = message.incident.title;
	
		if ( template.body ) {
			html = mustache.to_html(template.body, view);
		}
		if ( template.subject ) {
			subject = mustache.to_html(template.subject, view);
		}
		
		var data = {
			from: 'PagerDuty Mailer <pd@' + mailgun_domain + '>',
			to: recipient.addresses.join(', '),
			subject: subject,
			html: html
		};
		mailgun.messages().send(data, function(error, body) {
			console.log(body);
		});
	});
}

app.post('/', function (req, res) {
	req.body.messages.forEach(function(message) {
		getTriggerLE(message);
	});
	res.end();
})

app.listen(app.get('port'), function() {
	console.log('PDmailer listening on port', app.get('port'));
});
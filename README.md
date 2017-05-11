# PDmailer
Take in PagerDuty v2 webhooks and send out templated emails.

## What you will need:

* A PagerDuty v2 API token
* A Mailgun API key and domain
* A Heroku account

## Instructions for use:

* Clone this repo
* Edit mustache-templates.js (see below for more info on the format)
* Create a heroku app: `heroku create`
* Make a note of your herokuapp URL
* Set Heroku config vars: `heroku config:set MAILGUN_API_KEY=<your key> MAILGUN_DOMAIN=<your domain> PD_TOKEN=<your token>`
* Deploy to Heroku: `git add . && git commit -m "my config" && git push heroku master`
* Add an extension of the type "Generic v2 Webhook" to your PagerDuty service and set the URL to your herokuapp URL
* That's it! Share and enjoy.

## About mustache-templates.js:

This is the file that configures the email templates and recipients. It's a JavaScript file that defines two variables:

*templates* is a dict of email template sets. In the example provided, the first template set is named "martin." Each template set has one or more templates (subject and body) for a type of event that can come in a PagerDuty webhook. The possible events are incident.trigger, incident.assign, incident.acknowledge, and incident.resolve. The subject and body of each of these is a mustache template. Variable substitution is done from each of the webhook's message dictionaries under the key `message.`, and the related incident's first trigger log entry under the key `trigger`; raw JSON of both is available in `messageJSON` and `triggerJSON`.

*recipients* is an array of dicts describing recipients. Each dict has an array of email addresses in `addresses`, and the template set from the *templates* variable in `template`


Better documentation or easier config coming soon :)
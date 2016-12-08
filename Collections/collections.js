bots = new Mongo.Collection('bots')

channels = new Mongo.Collection('channels')

integrations = new Mongo.Collection('integrations')

slackUsers = new Mongo.Collection('slackUsers')

validateTokens = new Mongo.Collection('validateTokens')

queueList = JobCollection('queue');

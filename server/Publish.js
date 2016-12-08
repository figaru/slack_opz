import { Meteor } from 'meteor/meteor';

Meteor.publish('integrations', function(){
	return integrations.find({})
})

Meteor.publish('user', function () {
	return Meteor.users.find({_id: this.userId},{externalServices:1})
})
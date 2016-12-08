Template.Bot.helpers({
	outh: function () {		
		Meteor.call('oauthAccess',this.code)
	},
})

Template.Bot.events({
	'click #forgetToken': function () {
		Meteor.call('forgetTokens')
	}
})


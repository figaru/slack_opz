Router.route('/',
	function () {
		console.log('iopiopipo')
		this.subscribe('integrations');
		this.subscribe('user');
		if (this.ready()) {
			this.render('Bot',{
			    data: {
			        code: this.params.query.code
			    }
			});
		} else {
			this.render('Bot',{
			    data: {
			        code: this.params.query.code
			    }
			})
		}
	}
);

Router.route('/validate/:service',
	function () {
		var toSplit = this.params.hash
		var res = toSplit.split(":");
		var slackUserId = res[0];
		var validationToken = res[1];
		Meteor.call('validation', slackUserId, validationToken, this.params.service)
		this.next()
	}
);
// Router.route('/api',

// ).post(function (iop,poi) {
// 		console.log(iop)
// 		console.log(poi)
// 		//console.log(this)
// 		this.next()
// 		poi.end('Is it true?')
// });
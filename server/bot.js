import { Meteor } from 'meteor/meteor';
import later from 'later';

Kadira.connect('KifFRXcQi2asb7oNJ', '5b61872b-ea0d-4362-805c-17ceed499e42');
queueList.promote(1000);
// NO WAIT TIME DO RETRY MUDAR DEPOIS PARA 30 MIN ?? OU ENTãO NãO
// var q = new Job(queueList, 
//   'dailyMessage',
//   {
//     Info: 'Going to repeat everyday!',
//   }
// )
// .repeat({
// 	schedule: later.parse.recur().on('8:30:00').time(),
//   	backoff: 'constant'
// })
// .retry({
// 	wait:5*1000
// })
// .save();

Meteor.startup(() => {
  var integration = integrations.find({}).fetch()
  var token;
  for( i in integration){
    token = integration[i].bot.bot_access_token;
  }
  var SlackBot = require('slackbots');
  var bot = new SlackBot({
      token: token, 
  });
  bot.on('message', Meteor.bindEnvironment(function(data) {  
    if (data.text != undefined && data.type != 'hello' && data.type != 'user_typing' && data.subtype == null) {
      processUserMessages(data,bot);
    }
	}));

	queueList.startJobServer();
	queueList.processJobs('dailyMessage',{
		  	pollInterval: 1000, 
		},
		function (job, callback) {
			job.done();
			callback();
		}
	);
});

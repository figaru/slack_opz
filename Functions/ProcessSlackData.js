processUserMessages = function (data,bot) {
	var slackUser = slackUsers.find({}).fetch()
    var morningMsgArray = new Array('Hi','Hello','Hello!!!!','Good Morning!')
    var randomMsg = Math.floor((Math.random() * morningMsgArray.length));
	for(i in slackUser){
		if (slackUser[i].id == data.user) {
		  var sendTo = slackUser[i]
		}
	}
  var userObj = Meteor.users.findOne({
    "externalServices.service": "slack",
    "externalServices.userId": data.user
  })
  if (typeof(userObj) !== "undefined") {
    console.log("Valid")
    proccessMessage(data.text, typeof(userObj), sendTo, bot, data.user);
  }else{
    console.log("Invalid")
    proccessMessage(data.text, typeof(userObj), sendTo, bot);
  }
  return;












//////////////////////////////////////////////////////////////////////////////////////
    if (data.bot_id !== undefined) {
      var lastBotMessageTs = data.ts // get the bot message timestamp to be able to update message
    }
    var textToLowerCase = data.text.toLowerCase();
    var user = Meteor.users.findOne({"externalServices.userId": data.user})
    if (user.externalServices.validated === false) {

    }else{

    }
    if (textToLowerCase.indexOf("validate:") >= 0) {
    	// data.text.slice(9) to slice the word and leave only the token then maybe I can trim the token
    	var sliced = data.text.slice(9) 
      var userToValidate = Meteor.users.findOne({"externalServices.service":"Slack","externalServices.matchToken": sliced.trim()});
      if (userToValidate !== undefined) {
        bot.postMessageToUser(sendTo.name,"Success ! \n Hello "+ userToValidate.profile.firstName +" your account is now linked with .....",ok)
      }else{
        bot.postMessageToUser(sendTo.name,"Sorry but I couldn't find your token in our DataBase",ok)
      }
    }else{
	  	if (textToLowerCase.indexOf('hi') >= 0 || textToLowerCase.indexOf('hello') >= 0 ) {
			bot.postMessageToUser(sendTo.name, morningMsgArray[randomMsg], ok);
		}else if (textToLowerCase.indexOf('change') >= 0 ) {
			bot.postMessageToUser(sendTo.name,"",opt)
		}else{
			bot.postMessageToUser(sendTo.name,"Didn't understand",ok)
		}	
    }
}
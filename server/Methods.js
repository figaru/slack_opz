import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
    'oauthAccess':function(code){
    	this.unblock
      //console.log('Granting access to bot'); 
      HTTP.call("GET", "https://slack.com/api/oauth.access?client_id="+Meteor.settings.appClientId+"&client_secret="+Meteor.settings.appSecretId+"&code="+code,{
              auth: Meteor.settings.adminLogin,
          },
          function (error, result) {
              if (!error) {
                  if (result.data.ok == true) {
                    integrations.update({'bot.bot_access_token':result.data.bot.bot_access_token},result.data,{upsert: true})
                  }
              }else{
                  console.log(error)
              }                
          },
      );
    },
    'getSlackUsers':function () {
      var iop = integrations.find({}).fetch()
      var token;
      for( i in iop){
        token = iop[i].result.data.bot.bot_access_token;
      }
      HTTP.call("GET", "https://slack.com/api/users.list?token="+token, {
        auth: Meteor.settings.adminLogin,
      },
        function (error, result) {
          if (!error) {
            for(i in result.data.members){
              console.log(result.data.members[i])
              slackUsers.update({id: result.data.members[i].id},result.data.members[i],{upsert: true})
            }
          }else{
            console.log(error)
          }
        }
      )
    },
    // Have to do some stuff in this method.
    'updateBotMessage':function () {
      var iop = integrations.find({}).fetch()
      var token;
      for( i in iop){
        token = iop[i].result.data.bot.bot_access_token;
      }
      HTTP.call("POST", "https://slack.com/api/chat.update?token="+ token +"&ts="+ "1475847309.000005" +"&channel="+ "D26NDKFC6" +"&text=What", {
        auth: Meteor.settings.adminLogin,
      },
        function (error, result) {
          if (!error) {
            console.log(result)
          }else{
            console.log(error)
          }
        }
      )
    },
    'forgetTokens': function () {
      Meteor.users.update({
        _id: this.userId,
      },
      {
        $pull:{externalServices:{service:"slack"}}
      })
    },
    'hasService': function () {
      var has = Meteor.users.findOne({
        _id: this.userId,
        "externalServices.service":{$exists: true}
      })
      if (typeof(has) !== "undefined"){
        return true;
      }else{
        return false;
      }
    },
    'validation': function (slackId, token, service) {
      //Meteor.users.findOne({_id: this.userId, "externalServices.userId":slackId})
      var tokenExists = validateTokens.findOne({
        userId: slackId,
        validationToken: token,
        service: service
      })
      if (typeof(tokenExists) !== "undefined") {
        Meteor.users.update({
          _id: this.userId, 
        },
        {
          $push:{
            externalServices:
              {
                service: "slack",
                userId: slackId,
              }
            }
        })
        validateTokens.remove({
          userId: slackId
        })
      }else{
        console.log("Didn't find any token")
      }
    }
})


/*var q = new Job(queueList, 
  'message',
  {
      message: 'hi',
  }
)
q.retry({
  until: Job.foreverDate,
  wait: 10000,
  backoff: 'constant'
})
q.save();*/

// 'generateTokenForLoggedUser': function () {
//   var hasService =  Meteor.users.findOne({
//     _id: this.userId,
//     "externalServices.service": { 
//       $exists: true,
//       $eq: "slack" 
//     } 
//   });
//   if (typeof(hasService) === "undefined") {    
//     console.log("asdwqw")
//     
// },
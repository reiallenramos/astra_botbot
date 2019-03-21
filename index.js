var SlackBot = require('slackbots');

const PARAMS = {
    icon_emoji: ':success:'
}

var IDENTIFIER_FOOD = ['kain', 'food', 'breakfast', 'lunch', 'dinner', 'merienda', 'hungry', 'gutom', 'kumain', 'eat'];
var IDENTIFIER_THANKS = ['thank you', 'salamat', 'tnx', 'thanks']

var CHOICES_FOOD = ["Mcdo", "Jollibee", "Wendy's", "Starbucks", "Shrimp Bucket", "Razon's", "Ababu", "Tim Hortons", "Ramen Nagi", "Bon Chon", "Dunkin Donuts", "Samgyupsalamat", "Romantic Baboy"]
var CHOICES_THANKS = [
  "no problemo",
  "you're most welcome",
  "don't mention it",
  "libre muna",
  "sure",
  "anytime",
  "google mo na lang next time ah"
]
var REPLACE_ME_FOOD = [
	"replace_me sounds good!",
	"I'm thinking maybe replace_me",
	"I heard about this new place, replace_me",
	"Wanna grab a bite at replace_me?",
	"Dude, the water in replace_me is amazing!!",
	"You should try replace_me",
	"Natry mo na sa replace_me?",
  "replace_me has good reviews",
  "Masarap daw dun sa replace_me",
  "Try mo sa replace_me",
  "Hmm, di rin ako makapagdecide",
  "Sa carinderia na lang",
  "Pa-replace_me ka naman!"
]

var bot = new SlackBot({
    token: "xoxb-17916517136-497093080662-uY9sO6MPsRuiHZbkzYWVcdyq", 
    name: 'BotBot'
})

bot.on('start', function() {
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('dj-seth', 'howdy', PARAMS);
    
    // define existing username instead of 'user_name'
    bot.postMessageToUser('rapdr_ramos', 'meooowww!', PARAMS);

    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    //bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    //bot.postMessageToGroup('private_group', 'meow!', PARAMS); 
});

bot.on("message", msg => {
    switch (msg.type) {
    case "message":
    if (msg.channel[0] === "D" && msg.bot_id === undefined) {
      var userList = bot.getUsers();
      userList = userList["_value"]["members"];
      var currentUser = userList.filter(function(arr){return arr.id == msg.user})[0];

      var response = createResponse(msg.text);
      // console.log(msg.text);
      bot.postMessageToUser(currentUser.name, response, PARAMS);
    }
    if (msg.channel[0] === "C" && msg.text.includes("<@UEM2R2CKG>")) {
      var channelList = bot.getChannels(); 
      channelList = channelList["_value"]["channels"];
      var currentChannel = channelList.filter(function(arr){return arr.id == msg.channel})[0];

      var response = createResponse(msg);
      bot.postMessageToChannel(currentChannel.name, response, PARAMS);
    }

    break
  } 
});

function createResponse(msg_object) {
  var msg = msg_object.text;
  var res = "";
  if (IDENTIFIER_FOOD.some(function(v) {return msg.indexOf(v) >= 0;})) { 
    var choice = CHOICES_FOOD[Math.floor(Math.random()*CHOICES_FOOD.length)];
    var template_sentence = REPLACE_ME_FOOD[Math.floor(Math.random()*REPLACE_ME_FOOD.length)];
    res = createSentence(template_sentence, choice); 
    console.log(res);
  } else if (IDENTIFIER_THANKS.some(function(v) {return msg.indexOf(v) >= 0;})) {
    res = CHOICES_THANKS[Math.floor(Math.random()*CHOICES_THANKS.length)];
  } else {
    switch (msg_object.user) {
    case "U6Q7X3D39": // SETH
      res = createResponseForSeth();
      break;
    case "U9VP9JW9Z": // BESHIE
      res = createResponseForBeshie();
      break;
    case "U7UK3PEDC": // RAP
      res = createResponseForRap();
      break;
    case "U7KGMM9EJ": // EIMA
      res = createResponseForEima();
      break;
    case "U0HSUN8BX": // MARK
      res = createResponseForMark();
      break;
    case "UBH186BNJ": // ZY
      res = createResponseForZy();
      break;
    case "UD8EMJ05P": // TRACY
      res = createResponseForTracy();
      break;
    case "U0HST43S8": // GILBERT
      res = createResponseForGilbert();
      break;
    case "U7JMLLZL4": // JAJA
      res = createResponseForJaja();
      break;
    }
  }
  return res;
}

function createSentence(sentence, substring) {
  return sentence.replace("replace_me", substring); 
}

function createResponseForSeth() {
  return "Libre muna";
}

function createResponseForBeshie() {
  return "uwu";
}

function createResponseForRap() {
  return "psst" ;
}

function createResponseForEima() {
  return "안녕하세요!";
}

function createResponseForMark() {
  return "haysssttt";
}

function createResponseForZy() {
  return "pacomplete po ng nippou";
}

function createResponseForTracy() {
  return "こんにちは";
}

function createResponseForGilbert() {
  return "HRIS IS LIFE!";
}

function createResponseForJaja() {
  return "volleyball is life";
}

var ffmpeg = require('ffmpeg');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const audioFolder = './Audio/';
var channelsId = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //console.log(client.channels);//.find("name","PUBG").send("Welcome!")

  var filtered = client.channels.forEach(function(e){ 
        if(e.type === 'voice'){
            channelsId.push({id:e.id, name:e.name, server: e.guild.id});
        }
    });
 //  console.log(channelsId);
});

client.on('message', msg => {
  if (msg.content.startsWith("!")){ 
  if(msg.content === "!churro"){
     msg.reply('Churro venite a compartir unas lineas de mercaaaeeeeeeeeeeeeeeeeeee');
     return;
  }
  if(msg.content === "!lista"){
      console.log("LISTANDO");
    fs.readdir(audioFolder, (err, files) => {
        var lista = "Eehhhhhhhsta es la lissssssta de auuuudios que tiene el Dieeeeego \n";
          files.forEach(file => {
            lista = lista+ "\n !" + file.replace(".mp3","");
          });
          msg.author.send(lista);

        return;
    })
  }
  try{
   //sg.reply('Primero tenes que joinear un canal amigo');
  var vc = msg.member.voiceChannel;
  var srv = msg.member.voiceChannel.guild.id;
  var audioFile = msg.content.replace("!", "");
 // console.log(msg.member.voiceChannel);
  if(msg.content.includes("-c")){
    var split = msg.content.split("-c");
    var channelName = split[1];
    audioFile = split[0].trim().replace("!", "");
    console.log(channelName.trim());
     var idChn = "";
     var filtered = client.channels.forEach(function(e){ 

        if(e.name === channelName.trim() && e.guild.id === srv){
           vc = e;
           
        }
    });
  
  }
  
     isReady = false;
     console.log(audioFile);
      vc.join().then(connection =>
      {
         // logger.info('TIRANDO MENSAJE');
         // logger.info(msg);
         const dispatcher = connection.playFile('./Audio/'+audioFile+'.mp3');
         dispatcher.on("end", end => {
           vc.leave();
           });
       }).catch(err => console.log(err));
       isReady = true;
     
    }catch(err){
        msg.reply('Amigo, primero conectateeEEEEEEEEE a un chaneeeeeeell, eeeeeeehh, mmm eeeeeeehh');
    }
 }
});

client.login('NDkwNjEzNzQ1MzQ5OTUxNDk4.Dn73YA.G9jPSOVums544g53Rc_qcyOmjvM');
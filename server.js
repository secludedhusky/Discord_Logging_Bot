const Discord = require('discord.js');
const VERSION = '0.0.1';
const TOKEN = process.env.TOKEN;

var client = new Discord.Client();

client.on('ready', function() {
    console.log('[META][INFO] Connected to Discord API Service');
});

client.on('disconnected', function() {
    console.log('[META][WARN] Disconnected from Discord API Service. Attempting to reconnected...');
});

client.on('warn', function(msg) {
    console.log('[META][WARN] ' + msg);
});

client.on('error', function(err) {
    console.log('[META][ERROR] ' + err.message);
    process.exit(1);
});

console.log(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)


client.on('messageDelete', function(message) {
var logChannel = client.channels.get(process.env.LOG_CHANNEL)
var guild = client.guilds.get(process.env.GUILD)
    if(message.channel.type == 'text') {
        var log = client.channels.get(process.env.LOG_CHANNEL)
        if (log != null)
			var embed = new Discord.RichEmbed()
        .setTitle(`The message has been deleted.`)
        .setColor("#36393E")
        .setDescription(`A message in channel <#${message.channel.id}> from ` + message.author + `has been deleted. \nDeleted Message: ` + message.cleanContent)
        .setFooter(`Deleted Message ID: ${message.id} | Message Delete User ID: ${message.author.id}`)
            log.sendMessage(embed);

    }

});

client.on('messageUpdate', function(oldMessage, newMessage) {

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {

        var log = client.channels.get(process.env.LOG_CHANNEL)
        if (log != null)
			
			var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle('Message Edited.')
          .setDescription(`<@${oldMessage.author.id}> user <#${oldMessage.channel.id}> edited the message he sent to this channel.`)
          .addField(`Old Post`, `${oldMessage.cleanContent}`)
          .addField(`New Message`, `${newMessage.cleanContent}`)
		  
            log.sendMessage(embed);
    }

});

client.on('guildBanAdd', function(guild, member) {


    var log = client.channels.get(process.env.LOG_CHANNEL)
    if (log != null)
		  var embed = new Discord.RichEmbed()
        .setTitle('The member has been banned.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> has been banned!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Prohibited User ID: ${member.user.id}`)
        .setTimestamp();
        log.sendMessage(embed);

});

client.on('channelDelete', async channel => {
			        var log = client.channels.get(process.env.LOG_CHANNEL)
              var guild = client.guilds.get(process.env.GUILD)

        if (channel.type === "text") {
			        var log = client.channels.get(process.env.LOG_CHANNEL)
          const entry = await guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
          let user = entry.executor.username
        if (log != null)
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Channel Deleted.`)
          .setDescription(`Channel deleted by <@${entry.executor.username}> by <#${channel.id}>. _(Text Channel)_`)
          .setFooter(`Deleted Channel ID: ${channel.id} | User Deleting ID: ${entry.executor.username}`)
        log.sendMessage(embed);
        };
        if (channel.type === "voice") {
        var log = client.channels.get(process.env.LOG_CHANNEL)
          const entry = await guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
          let user = entry.executor.username
        if (log != null)
		 var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Channel Deleted.`)
          .setDescription(`Channel has been deleted by <@${entry.executor.username}> ${channel.name}. _(Voice Channel)_`)
          .setFooter(`Deleted Channel ID: ${channel.id} | User Deleting ID: ${entry.executor.username}`)
        log.sendMessage(embed);
        }
});

client.on('channelCreate', async channel => {
        if (channel.type === "text") {
			        var log = client.channels.get(process.env.LOG_CHANNEL)
              var guild = client.guilds.get(process.env.GUILD)
          
          const entry = await guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
          let user = entry.executor.username
    
        if (log != null)
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Channel Created.`)
          .setDescription(`Channel was created by <@${entry.executor.username}> <#${channel.id}>. _(Text Channel)_`)
          .setFooter(`Created Channel ID: ${channel.id} | Creator User ID: ${entry.executor.username}`)
        log.sendMessage(embed);
        };
        if (channel.type === "voice") {
        var log = client.channels.get(process.env.LOG_CHANNEL)
          const entry = await guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
          let user = entry.executor.username
        if (log != null)
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Channel Created.`)
          .setDescription(`Channel was created by <@${entry.executor.username}> ${channel.name}. _(Voice Channel)_`)
          .setFooter(`Created Channel ID: ${channel.id} | Creator User ID: ${entry.executor.username}`)
        log.sendMessage(embed);
        }
      }
);
	
client.on('guildBanRemove', function(guild, member) {


    var log = client.channels.get(process.env.LOG_CHANNEL)
    if (log != null)
			        var embed = new Discord.RichEmbed()
        .setTitle('Member unbanned.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> has been unbanned!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Unbanned User ID: ${member.user.id}`)
        .setTimestamp();
        log.sendMessage(embed);

});

client.on('guildMemberAdd', function(guild, member) {


    var log = client.channels.get(process.env.LOG_CHANNEL)
    if (log != null) 
	        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Joined Server')
        .setDescription(`User named <@${member.user.id}> has joined the server!`)
        .setFooter(`Joining User ID: ${member.user.id}`)
        .setTimestamp()
        log.sendMessage(embed);
    

});

client.on('guildMemberRemove', function(guild, member) {


    var log = client.channels.get(process.env.LOG_CHANNEL)
    if (log != null)
		        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Left Server')
        .setDescription(`User named <@${member.user.id}> has left the server!`)
        .setFooter(`Leaving User ID: ${member.user.id}`)
        .setTimestamp()
        log.sendMessage(embed);

});

client.on('guildMemberUpdate', function(guild, oldMember, newMember) {

  var log = client.channels.get(process.env.LOG_CHANNEL)
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
    var change = Changes.unknown;

    var removedRole = '';
    oldMember.roles.every(function(value) {
        if(newMember.roles.find('id', value.id) == null) {
            change = Changes.removedRole;
            removedRole = value.name;
        }
    });

    var addedRole = '';
    newMember.roles.every(function(value) {
        if(oldMember.roles.find('id', value.id) == null) {
            change = Changes.addedRole;
            addedRole = value.name;
        }
    });

    if(newMember.user.username != oldMember.user.username)
        change = Changes.username;

    if(newMember.nickname != oldMember.nickname)
        change = Changes.nickname;

    if(newMember.user.avatarURL != oldMember.user.avatarURL)
        change = Changes.avatar;


        switch(change) {
            case Changes.unknown:
			var embed = new Discord.RichEmbed()
				.setColor("#36393E")
				.setTitle(`User Updated`)
				.setDescription(newMember + ` updated.`)
				.setFooter(`User ID: ${newMember.user.id}`)
                log.sendMessage(embed);
                break;
            case Changes.addedRole:
			var embed = new Discord.RichEmbed()
				.setColor("#36393E")
				.setTitle(`User Updated`)
				.setDescription(newMember + "has been given the role" + addedRole)
				.setFooter(`User ID: ${newMember.user.id}`)
                log.sendMessage(embed);
                break;
            case Changes.removedRole:
			var embed = new Discord.RichEmbed()
				.setColor("#36393E")
				.setTitle(`User Updated`)
				.setDescription(newMember + "has been removed from the role" + removedRole)
				.setFooter(`User ID: ${newMember.user.id}`)
                log.sendMessage(embed);
                break;
            case Changes.username:
			var embed = new Discord.RichEmbed()
				.setColor("#36393E")
				.setTitle(`User Updated`)
				.setDescription(newMember + 'contact ' + oldMember.user.username + '#' + oldMember.user.discriminator + "whose name" + newMember.user.username + '#' + newMember.user.discriminator + "changed to.")
				.setFooter(`User ID: ${newMember.user.id}`)
                log.sendMessage(embed);
                break;
            case Changes.nickname:
                log.sendMessage('**[NAME CHANGED]** ' + newMember + ': ' +
                    (oldMember.nickname != null ? 'Changed nickname from ' + oldMember.nickname +
                        + newMember.nickname : 'Set nickname') + ' to ' +
                    (newMember.nickname != null ? newMember.nickname + '.' : 'original username.'));
                break;
            case Changes.avatar:
			var embed = new Discord.RichEmbed()
				.setColor("#36393E")
				.setTitle(`User Updated`)
				.setDescription(newMember + "has changed their photo.")
				.setFooter(`User ID: ${newMember.user.id}`)
                log.sendMessage(embed);
                break;
        }

});

console.log('Logger v' + VERSION);

client.login(TOKEN); 

function formatConsoleMessage(message) {
    return message.cleanContent.replace(new RegExp('\n', 'g'), '\n\t');
}
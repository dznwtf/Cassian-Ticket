/*
const MessageEmbed = require('discord.js')

module.exports = async (Client, oldMember, newMember) => {

    const { guild } = newMember;

 
    if (!oldMember.premiumSince && newMember.premiumSince) {

        const embed = new MessageEmbed()
            .setColor("#ffcbdb")
            .setAuthor({ name: `${newMember.user.username}`, iconURL: newMember.user.displayAvatarURL({ dynamic: true, size: 512 })})
            .setDescription(`${newMember.user} impulsionou  o servidor !\n Veja suas vantagens em <#1144127481134190672>.`)
           Client.guilds.cache.get(guild.id).channels.cache.get('1139305141892296755').send({embeds: [embed]})
    }
}*/
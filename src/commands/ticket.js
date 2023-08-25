const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
    run: async(client, message) => {

        await message.delete()

        const perm = new Discord.MessageEmbed()

        .setDescription(`${message.author} Você não possui a ***PERMISSÃO*** Para utilizar este comando`)
            .setColor(config.embedcolor)

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply({ embeds: [perm], ephemeral: true })
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Cassian Helper', client.user.displayAvatarURL())
        .setDescription(`Clique para abrir ticket caso:`)
        .addFields(
            { name: '1. Dúvidas', value: 'Caso tenha alguma dúvida, estamos aqui para ajudar.' },
            { name: '2. Relatar Bug', value: 'Encontrou algum bug? Nos informe para que possamos corrigir.' },
            { name: '3. Compras', value: 'Interessado em comprar algo? Abra um ticket para obter assistência.' },
            { name: '4. VIP e Booster', value: 'Dúvidas ou informações sobre VIP e Booster? Crie um ticket.' },
            { name: '5. Parcerias', value: 'Para informações sobre parcerias, abra um ticket.' }
        )
        .setFooter({text:'discord.gg/cassian'})
        .setColor(config.embedcolor);

        
        
        const btn = new Discord.MessageButton()

        .setLabel('Abrir ticket')
        .setEmoji(config.emojiticket)
        .setStyle('SECONDARY')
        .setCustomId('ticket')

        const row = new Discord.MessageActionRow().addComponents([btn])

        message.channel.send({embeds: [embed], components: [row]})
    }
}
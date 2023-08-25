const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    run: async (client, message) => {
        await message.delete();

        const permEmbed = new Discord.MessageEmbed()
            .setDescription(`${message.author} Você não possui a ***PERMISSÃO*** Para utilizar este comando`)
            .setColor('#FF0000');

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply({ embeds: [permEmbed], ephemeral: true });
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor('Cassian Helper', client.user.displayAvatarURL())
            .setDescription(`Clique para receber notificações sobre:`)
            .setColor('#ffcbdb ');

        const sorteioBtn = new Discord.MessageButton()
            .setLabel('Sorteio')
            .setEmoji('🎉')
            .setStyle('PRIMARY')
            .setCustomId('sorteio');

        const parceriaBtn = new Discord.MessageButton()
            .setLabel('Parceria')
            .setEmoji('🤝')
            .setStyle('PRIMARY')
            .setCustomId('parceria');

        const atualizacoesBtn = new Discord.MessageButton()
            .setLabel('Atualizações')
            .setEmoji('🔔')
            .setStyle('PRIMARY')
            .setCustomId('atualizacoes');

        const row = new Discord.MessageActionRow()
            .addComponents([sorteioBtn, parceriaBtn, atualizacoesBtn]);

        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === message.author.id;
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {
            interaction.deferUpdate({ ephemeral: true });

            const selectedButton = interaction.customId;

            if (selectedButton === 'sorteio') {
                toggleRole(interaction, 'Sorteio');
            } else if (selectedButton === 'parceria') {
                toggleRole(interaction, 'Parceria');
            } else if (selectedButton === 'atualizacoes') {
                toggleRole(interaction, 'Atualizações');
            }
        });

    }}
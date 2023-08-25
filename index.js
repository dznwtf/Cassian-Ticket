const Discord = require("discord.js");
const config = require('./config.json');
const discordModals = require('discord-modals');
const client = new Discord.Client({ intents: 32767 });
discordModals(client);

const comandos = require('./src/structures/commands');
const eventos = require('./src/structures/events');

comandos();
eventos(client);

client.login(config.token);

process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});


const sorteioRoleId = config.sorteiocargo;
const parceriaRoleId = config.parceriacargo;
const atualizacoesRoleId = config.atualizacoescargo;

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'sorteio') {
        const member = interaction.member;
        const sorteioRole = interaction.guild.roles.cache.get(sorteioRoleId);

        if (member && sorteioRole) {
            try {
                if (member.roles.cache.has(sorteioRoleId)) {
                    await member.roles.remove(sorteioRole);
                    await interaction.reply({ content: 'Você não participa mais do sorteio.', ephemeral: true });
                } else {
                    await member.roles.add(sorteioRole);
                    await interaction.reply({ content: 'Você agora participa do sorteio!', ephemeral: true });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Ocorreu um erro ao modificar o cargo.', ephemeral: true });
            }
        }
    } else if (interaction.customId === 'parceria') {
        const member = interaction.member;
        const parceriaRole = interaction.guild.roles.cache.get(parceriaRoleId);

        if (member && parceriaRole) {
            try {
                if (member.roles.cache.has(parceriaRoleId)) {
                    await member.roles.remove(parceriaRole);
                    await interaction.reply({ content: 'Você não possui mais o cargo de parceria.', ephemeral: true });
                } else {
                    await member.roles.add(parceriaRole);
                    await interaction.reply({ content: 'Você agora possui o cargo de parceria!', ephemeral: true });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Ocorreu um erro ao modificar o cargo.', ephemeral: true });
            }
        }
    } else if (interaction.customId === 'atualizacoes') {
        const member = interaction.member;
        const atualizacoesRole = interaction.guild.roles.cache.get(atualizacoesRoleId);

        if (member && atualizacoesRole) {
            try {
                if (member.roles.cache.has(atualizacoesRoleId)) {
                    await member.roles.remove(atualizacoesRole);
                    await interaction.reply({ content: 'Você não receberá mais atualizações.', ephemeral: true });
                } else {
                    await member.roles.add(atualizacoesRole);
                    await interaction.reply({ content: 'Você agora receberá atualizações!', ephemeral: true });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Ocorreu um erro ao modificar o cargo.', ephemeral: true });
            }
        }
    }
});

const Discord = require('discord.js')
const config = require('../../config.json')
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { QuickDB } = require('quick.db')
const db = new QuickDB()

/**
 * @param {Discord.Client} client 
 * @param {Discord.interaction} interaction 
 */

module.exports = async (client, interaction) => {

    if (interaction.isButton()) {
        if (interaction.customId == 'ticket') {

            var opcao = [
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ]

            var opcao2 = [
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
            ]

            var genlength1 = opcao[Math.floor(Math.random() * opcao.length)]
            var genlength2 = opcao[Math.floor(Math.random() * opcao.length)]
            var genlength3 = opcao[Math.floor(Math.random() * opcao.length)]
            var genlength4 = opcao[Math.floor(Math.random() * opcao.length)]
            var gennumber1 = opcao2[Math.floor(Math.random() * opcao2.length)]
            var gennumber2 = opcao2[Math.floor(Math.random() * opcao2.length)]
            var gennumber3 = opcao2[Math.floor(Math.random() * opcao2.length)]

            var token1 = `${genlength1}${gennumber2}${genlength2}${gennumber1}${genlength3}${genlength4}${gennumber3}`

            await db.set(`${interaction.user.id}.very`, token1)

            const token = await db.get(`${interaction.user.id}.very`)


            const embed = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você já possui um **TICKET** em andamento... `)
                .setColor(config.embedcolor)

            const channels = (interaction.guild.channels.cache.find((c) => c.topic === `${interaction.user.id}`))
            if (channels) return interaction.reply({ embeds: [embed], ephemeral: true })

            const roleIDs = ['ID CARGO 1', 'ID CARGO 2 ETC'];

            const permissionOverwrites = [
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
            ];

            for (const roleId of roleIDs) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    permissionOverwrites.push({
                        id: role.id,
                        allow: ['VIEW_CHANNEL']
                    });
                }
            }

            interaction.message.guild.channels.create(`📂・ticket-${token}`, {
                parent: config.topic,
                topic: `${interaction.user.id}`,
                type: 'GUILD_TEXT',
                permissionOverwrites: permissionOverwrites
            }).then(async ticket => {

                const abriu = new Discord.MessageEmbed()

                    .setDescription(`${interaction.user} Seu ticket foi criado com sucesso em: <#${ticket.id}>`)
                    .setColor(config.embedcolor)

                const btnlinkabriu = new Discord.MessageButton()

                    .setStyle('LINK')
                    .setEmoji('1012823219327225907')
                    .setLabel('Acessar ticket')
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${ticket.id}`)

                const row = new Discord.MessageActionRow().addComponents([btnlinkabriu])

                interaction.reply({ embeds: [abriu], components: [row], ephemeral: true })

                const embedticket = new Discord.MessageEmbed()

                .setAuthor({ name: 'Cassian - Sistema de Atendimento', iconURL: client.user.displayAvatarURL() })
                .setDescription(`Seja Bem Vindo(a) ao Suporte
                    
                    ${interaction.user} ID do seu ticket:  ***\`\`${token}\`\`***
                    
                     Seu ticket sera atendido por: `)
                    .setFooter({ text: `Por favor, seja direto.` })
                    .setColor(config.embedcolor)

                const btnsair = new Discord.MessageButton()

                    .setStyle('DANGER')
                    .setCustomId('sair')
                    .setLabel('Sair do ticket')
                    .setEmoji('997711823006617600')

                const btnassumir = new Discord.MessageButton()

                    .setStyle('PRIMARY')
                    .setCustomId('assumir')
                    .setLabel('Assumir ticket')
                    .setEmoji('997711800076357663')

                const btndell = new Discord.MessageButton()

                    .setStyle('PRIMARY')
                    .setCustomId('deletar')
                    .setLabel('Deletar ticket')
                    .setEmoji('997711823006617600')

                const btnstaff = new Discord.MessageButton()

                    .setStyle('SECONDARY')
                    .setCustomId('staff')
                    .setLabel('Botão staff')
                    .setEmoji('997711815050022932')

                const btnmembro = new Discord.MessageButton()

                    .setStyle('SECONDARY')
                    .setCustomId('membro')
                    .setLabel('Botão membro')
                    .setEmoji('1016905691107164261')


                const rowticket = new Discord.MessageActionRow().addComponents([btnsair, btnassumir, btnstaff, btnmembro, btndell])

                ticket.send({ embeds: [embedticket], content: `||${interaction.user}||`, components: [rowticket] })
            })
        }

        if (interaction.customId == 'sair') {

            await interaction.message.edit()


            const modal = new Modal() 
                .setCustomId('sair')
                .setTitle('Motivo')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('sair1')
                        .setLabel('Sair do ticket')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o motivo para sair do ticket')
                        .setRequired(true),
                )
            showModal(modal, {
                client: client, 
                interaction: interaction,
            });
        }

        if (interaction.customId == 'deletar') {

            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** Para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }

            const modal = new Modal()
                .setCustomId('dell2')
                .setTitle('Motivo')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('dell3')
                        .setLabel('Deletar do ticket')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva oque foi resolvido no ticket')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client, 
                interaction: interaction, 
            });
        }

        if (interaction.customId == 'assumir') {

            await interaction.deferUpdate()

            let canal = interaction.message.channel.topic
            const pessoa = client.users.cache.get(canal)


            const perm = new Discord.MessageEmbed()

                .setDescription(` ${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }

            const token = await db.get(`${interaction.user.id}.very`)

            const embedticket = new Discord.MessageEmbed()

            .setAuthor({ name: 'Cassian - Sistema de Atendimento', iconURL: client.user.displayAvatarURL() })
            .setDescription(`Seja Bem Vindo(a) ao Suporte
                
                ${interaction.user} ID do seu ticket:  ***\`\`${token}\`\`***
                
                 Seu ticket sera atendido por: ${interaction.user}`)
                 .setFooter({ text: `Por favor, seja direto.` })
                 .setColor(config.embedcolor)

            const btnsair = new Discord.MessageButton()

                .setStyle('DANGER')
                .setCustomId('sair')
                .setLabel('Sair do ticket')
                .setEmoji('997711823006617600')

            const btnassumir = new Discord.MessageButton()

                .setStyle('PRIMARY')
                .setCustomId('assumir')
                .setLabel('Assumir ticket')
                .setEmoji('997711800076357663')
                .setDisabled(true)

            const btndell = new Discord.MessageButton()

                .setStyle('PRIMARY')
                .setCustomId('deletar')
                .setLabel('Deletar ticket')
                .setEmoji('997711823006617600')

            const btnstaff = new Discord.MessageButton()

                .setStyle('SECONDARY')
                .setCustomId('staff')
                .setLabel('Botão staff')
                .setEmoji('997711815050022932')

            const btnmembro = new Discord.MessageButton()

                .setStyle('SECONDARY')
                .setCustomId('membro')
                .setLabel('Botão staff')
                .setEmoji('1016905691107164261')

            const rowticket = new Discord.MessageActionRow().addComponents([btnsair, btnassumir, btnstaff, btnmembro, btndell])

            const embed = new Discord.MessageEmbed()
            .setDescription(`Olá ${pessoa}, seu ticket na Cassian foi **assumido**. Clique no botão abaixo para ser redirecionado para o ticket novamente.`)
            .setColor(config.embedcolor)

            const btnlinkabriu = new Discord.MessageButton()

                .setStyle('LINK')
                .setEmoji('1012823219327225907')
                .setLabel('Acessar ticket')
                .setURL(`https://discord.com/channels/${interaction.guild.id}/${canal.id}`)

            const rowpeve = new Discord.MessageActionRow().addComponents([btnlinkabriu])

            const embedass = new Discord.MessageEmbed()
                .setDescription(` ${interaction.user} Ticket assumido com sucesso`)
                .setColor(config.embedcolor)


            interaction.channel.send({ embeds: [embedass] }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            pessoa.send({ embeds: [embed], components: [rowpeve] })
            interaction.message.edit({ embeds: [embedticket], content: `||${pessoa}||`, components: [rowticket] })

        }

        if (interaction.customId == 'staff') {

            const perm = new Discord.MessageEmbed()

                .setDescription(` ${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }


            await interaction.deferUpdate()

            const embeddomenu = new Discord.MessageEmbed()

                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dinamic: true }) })
                .setDescription(`
             Você possui **120 Segundos (2 Minutos)** para selecionar a opção desejada
                
                Adicionar algum membro
                Remover algum membro
                Notificar o membro no privado
                Criar canal de suporte privado
                Renomear ticket
                Fechar menu staff
                Deletar ticket`)
                .setColor(config.embedcolor)
                .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dinamic: true }) })

            const rowmenu = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()

                    .setCustomId('set')
                    .setPlaceholder('Abrir menu')
                    .addOptions([
                        {
                            label: 'Adicionar membro',
                            value: 'add',
                            emoji: '994287724582424586'
                        },
                        {
                            label: 'Remover membro',
                            value: 'rem',
                            emoji: '994288007752458351'
                        },
                        {
                            label: 'Chamar membro',
                            value: 'pok',
                            emoji: '997711805629599896'
                        },
                        {
                            label: 'Criar canal de voz',
                            value: 'call',
                            emoji: '994283911431606282'
                        },
                        {
                            label: 'Renomear ticket',
                            value: 'ren',
                            emoji: '997711807860973608'
                        },
                        {
                            label: 'Fechar menu',
                            value: 'fechar',
                            emoji: '997711817147170826'
                        },
                    ])
            )


            interaction.channel.send({ embeds: [embeddomenu], content: `||${interaction.user}||`, components: [rowmenu] }).then(msg => { setTimeout(() => msg.delete(), 120000) })
        }

        if (interaction.customId == 'membro') {

            await interaction.deferUpdate()

            const embedmembro = new Discord.MessageEmbed()

                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dinamic: true }) })
                .setDescription(`
            Você possui **120 Segundos (2 Minutos)** para selecionar a opção desejada
            
             Requisitar para adicionar algum membro ao ticket
              Chamar algum staff para o ticket
              Fechar seu menu`)
                .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dinamic: true }) })
                .setColor(config.embedcolor)

            const rowmenumembro = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()

                    .setCustomId('set')
                    .setPlaceholder('Abrir menu')
                    .addOptions([
                        {
                            label: 'Adicionar membro',
                            emoji: '994287724582424586',
                            value: 'addrequest'
                        },
                        {
                            label: 'Chamar staff',
                            emoji: '997711805629599896',
                            value: 'pokestaff'
                        },
                        {
                            label: 'Fechar menu',
                            emoji: '997711817147170826',
                            value: 'fechar'
                        }
                    ])
            )


            interaction.channel.send({ embeds: [embedmembro], content: `||${interaction.user}||`, components: [rowmenumembro] }).then(msg => { setTimeout(() => msg.delete(), 120000) })
        }
    }
    if (interaction.isSelectMenu()) {
        if (interaction.values[0] == 'add') {

            await interaction.message.edit()

            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }


            const modal = new Modal() 
                .setCustomId('add')
                .setTitle('Adicionar membro')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('add1')
                        .setLabel('ID do membro')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o ID do membro')
                        .setRequired(true),
                )
            showModal(modal, {
                client: client, 
                interaction: interaction,
            });
        }


        if (interaction.values[0] == 'rem') {

            await interaction.message.edit()

            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }

            const modal = new Modal() 
                .setCustomId('rem')
                .setTitle('Remover membro')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('rem1')
                        .setLabel('ID do membro')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o ID do membro')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client,
                interaction: interaction, 
            });
        }

        if (interaction.values[0] == 'ren') {

            await interaction.message.edit()

            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }


            const modal = new Modal() 
                .setCustomId('ren')
                .setTitle('Renomear ticket')
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('ren1')
                        .setLabel('Nome ticket')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o NOME do ticket')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client,
                interaction: interaction, 
            });
        }

        if (interaction.values[0] == 'pok') {

            await interaction.message.edit()


            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }


            const modal = new Modal()
                .setCustomId('poke')
                .setTitle('Chamar membro')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('msgpoke')
                        .setLabel('Mensagem')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Qual a mensagem para o membro')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client,
                interaction: interaction, 
            });
        }

        if (interaction.values[0] == 'call') {

            await interaction.message.edit()


            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }

            const token = await db.get(`${interaction.user.id}.very`)
            let canal = interaction.message.channel.topic
            const user = client.users.cache.get(canal)



            const embed = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você já possui um canal de voz em andamento... `)
                .setColor(config.embedcolor)

            const channels = (await interaction.guild.channels.cache.find((c) => c.name === `🔊・ call ${token}`))
            if (channels) return interaction.reply({ embeds: [embed], ephemeral: true })

            interaction.guild.channels.create(`🔊・ call ${token}`, {
                type: 'GUILD_VOICE',
                parent: config.topic,
                topic: `Id do usuário: ${interaction.user.id}`,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
                ]
            }).then(async (call) => {

                setInterval(async (c) => {
                    try {
                        if (call.members.size <= 0) {
                            await call.delete()
                            const embed = new Discord.MessageEmbed()

                                .setDescription(` ${interaction.user} Seu canal de voz acaba de ser deletado.`)
                                .setColor(config.embedcolor)

                            interaction.user.send({ embeds: [embed] })
                        }
                    } catch (e) { }
                }, 10000)

                const btnlinkabriu = new Discord.MessageButton()

                    .setStyle('LINK')
                    .setEmoji('1012823219327225907')
                    .setLabel('Acessar call')
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${call.id}`)

                const row1 = new Discord.MessageActionRow().addComponents([btnlinkabriu])

                const embedchat = new Discord.MessageEmbed()

                    .setDescription(` Uma call de suporte foi criada em ${call} por: **${interaction.user.username}**
                    
                     **Observação:** Se caso ultrapassar 10 **segundos** sem nenhum membro no canal de voz, ele sera automáticamente deletado.`)

                    .setColor(config.embedcolor)

                interaction.channel.send({ embeds: [embedchat], components: [row1] })

                let canal = interaction.message.channel.topic
                const user = client.users.cache.get(canal)

                const embedpv = new Discord.MessageEmbed()

                    .setDescription(` ${interaction.user} O seu canal de voz foi criado com sucesso.
                    
         
                    
                    Botão para se redirecionar para o canal de voz


                    Se caso ultrapassar 10 **segundos** sem nenhum membro no canal de voz, ele sera automáticamente deletado.`)
                    .setColor(config.embedcolor)

                const btnacess = new Discord.MessageButton()

                    .setStyle('LINK')
                    .setEmoji('1012823219327225907')
                    .setLabel('Acessar call')
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${call.id}`)


                const rowpv = new Discord.MessageActionRow().addComponents([btnacess])
                interaction.user.send({ embeds: [embedpv], components: [rowpv] })

            })
        }

        if (interaction.values[0] == 'fechar') {

            await interaction.message.edit()

            const perm = new Discord.MessageEmbed()

                .setDescription(`${interaction.user} Você não possui a ***PERMISSÃO*** para utilizar este botão.`)
                .setColor(config.embedcolor)

            if (!interaction.member.permissions.has(config.perm)) {
                return interaction.channel.send({ embeds: [perm], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
            }

            const embeddomenu = new Discord.MessageEmbed()

                .setDescription(` Menu fechado com sucesso.`)
                .setColor(config.embedcolor)

            const btnload = new Discord.MessageButton()

                .setEmoji('1012814214638870689')
                .setLabel('Carregando')
                .setStyle('SECONDARY')
                .setDisabled(true)
                .setCustomId('teste')

            const rowmenu = new Discord.MessageActionRow().addComponents([btnload])

            interaction.message.edit({ embeds: [embeddomenu], components: [rowmenu] }).then(msg => { setTimeout(() => msg.delete(), 5000) })
        }

        if (interaction.values[0] == 'addrequest') {

            await interaction.message.edit()


            const modal = new Modal() 
                .setCustomId('addreq')
                .setTitle('Requisitar adicionar membro')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('add2')
                        .setLabel('ID do membro')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o ID do membro')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client, 
                interaction: interaction, 
            });

        }

        if (interaction.values[0] == 'pokestaff') {

            await interaction.message.edit()

            const modal = new Modal() 
                .setCustomId('pokestaff')
                .setTitle('Chamar staff')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('mensamgedopoke')
                        .setLabel('Mensagem')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Qual a mensagem para o staff')
                        .setRequired(true),
                    new TextInputComponent() 
                        .setCustomId('iddostaff')
                        .setLabel('Id')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Qual o ID do staff')
                        .setRequired(true), 
                )
            showModal(modal, {
                client: client, 
                interaction: interaction,
            });

        }

        if (interaction.values[0] == 'sair') {

            await interaction.message.edit()

            const modal = new Modal() 
                .setCustomId('sair')
                .setTitle('Motivo')
                .addComponents(
                    new TextInputComponent() 
                        .setCustomId('sair1')
                        .setLabel('Sair do ticket')
                        .setStyle('SHORT') 
                        .setPlaceholder('📝 Escreva o motivo para sair do ticket')
                        .setRequired(true),
                )
            showModal(modal, {
                client: client,
                interaction: interaction,
            });
        }
    }
}


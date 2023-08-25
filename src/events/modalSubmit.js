const Discord = require('discord.js')
const { ModalSubmitInteraction } = require('discord-modals')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const config = require('../../config.json')

/**
 * @param {ModalSubmitInteraction} modal
 * @param {Discord.client} client
 */

module.exports = async (client, modal) => {

    if (modal.customId == 'sair') {


        const mtv = modal.getTextInputValue('sair1')
        let canal = modal.message.channel.topic
        const user = client.users.cache.get(canal)
        const token = await db.get(`${modal.user.id}.very`)
        modal.channel.setName(`❌・fechado-${token}`)

        try {
            modal.channel.permissionOverwrites.edit(user, {
                VIEW_CHANNEL: false
            })
        } catch (e) { }

        const embed = new Discord.MessageEmbed()

            .setDescription(`O membro ${modal.user} acabou de sair do atendimento.
            
            Motivo: ***${mtv}***`)
            .setColor(config.embedcolor)

            const embedpv = new Discord.MessageEmbed()

            .setDescription(`Seu ticket na Cassian foi fechado.`)
            .setColor(config.embedcolor)

        const btnfechar = new Discord.MessageButton()

            .setLabel('Finalizar ticket')
            .setCustomId('deletar')
            .setStyle('DANGER')
            .setEmoji('997711823006617600')

        const rowfechado = new Discord.MessageActionRow().addComponents([btnfechar])

        user.send({embeds: [embedpv]})
        modal.reply({ embeds: [embed], components: [rowfechado] })
    }


    if (modal.customId == 'dell') {

        const mtv2 = modal.getTextInputValue('dell1')
        let canal = modal.message.channel.topic
        const user = client.users.cache.get(canal)
        const token = await db.get(`${modal.user.id}.very`)
        modal.channel.setName(`⛔️・fechado-${token}`)

        const embeddelet = new Discord.MessageEmbed()

            .setDescription(`Ticket sendo deletado em **5 SEGUNDOS**
        
        Ticket deletado por: ${modal.user}
        O que foi resolvido: **${mtv2}**`)
            .setColor(config.embedcolor)


            const embeduser = new Discord.MessageEmbed()

            .setDescription(`Olá ${user}, Seu ticket na Cassian foi deletado. 
            
            Usuário: ${modal.user}
            Situação resolvida: **${mtv2}**`)
            .setColor(config.embedcolor)

        const btnfechar = new Discord.MessageButton()

            .setLabel('Finalizar ticket')
            .setCustomId('deletar')
            .setStyle('DANGER')
            .setEmoji('997711823006617600')
            .setDisabled(true)

        const rowdeletado = new Discord.MessageActionRow().addComponents([btnfechar])

        modal.channel.send({embeds: [embeddelet], components: [rowdeletado]})
        modal.reply({content: `${modal.user} Gerando LOGS e salvando as mensagens do atendimento em <#${config.idlog}>`, ephemeral: true})
        user.send({embeds: [embeduser]})

        setTimeout(async () => {
            await modal.channel.delete().catch(() => true)
        }, 5000)
    }

    if (modal.customId == 'dell2') {

        const mtv2 = modal.getTextInputValue('dell3')
        let canal = modal.message.channel.topic
        const user = client.users.cache.get(canal)
        const token = await db.get(`${modal.user.id}.very`)
        modal.channel.setName(`⛔️・fechado-${token}`)

        const embeddelet = new Discord.MessageEmbed()

            .setDescription(`Ticket sendo deletado em **5 SEGUNDOS**
        
        Ticket deletado por: ${modal.user}
        O que foi resolvido: **${mtv2}**`)
            .setColor(config.embedcolor)


            const embeduser = new Discord.MessageEmbed()

            .setDescription(`Olá ${user}, Seu ticket na Cassian foi deletado.
            
            Usuário: ${modal.user}
            Situação resolvida: **${mtv2}**`)
            .setColor(config.embedcolor)

        const btnfechar = new Discord.MessageButton()

            .setLabel('Finalizar ticket')
            .setCustomId('deletar')
            .setStyle('DANGER')
            .setEmoji('997711823006617600')
            .setDisabled(true)

        const rowdeletado = new Discord.MessageActionRow().addComponents([btnfechar])

        modal.message.edit({embeds: [embeddelet], components: [rowdeletado]})
        modal.reply({content: `${modal.user} Gerando LOGS e salvando mensagens do atendimento em <#${config.idlog}>`, ephemeral: true})
        user.send({embeds: [embeduser]})

        setTimeout(async () => {
            await modal.channel.delete().catch(() => true)
        }, 5000)
    }

    if(modal.customId == 'poke'){

        const mtv = modal.getTextInputValue('msgpoke')
        let canal = modal.message.channel.topic
        const pessoa = client.users.cache.get(canal)

        const embedticket = new Discord.MessageEmbed()

        .setDescription(`${modal.user}, O membro <@${pessoa}> acaba de ser notificado na sua DM, com a mensagem
        
        **${mtv}**`)
        .setColor(config.embedcolor)

        const embed = new Discord.MessageEmbed()

        .setDescription(`Olá <@${pessoa}>, Você acaba de receber um aviso na sua **DM**
        
         O membro ${modal.user} acaba de te mandar a mensagem: **${mtv}**`)
        .setColor(config.embedcolor)

        const btnacess = new Discord.MessageButton()

        .setStyle('LINK')
        .setEmoji('1012823219327225907')
        .setLabel('Acessar ticket')
        .setURL(`https://discord.com/channels/${modal.guild.id}/${canal.id}`)
        
        const row = new Discord.MessageActionRow().addComponents([btnacess])

        pessoa.send({embeds: [embed], components: [row]})
        modal.reply({embeds: [embedticket], ephemeral: true})
    }

    if(modal.customId == 'add'){

        const membro = modal.getTextInputValue('add1')
        const user = client.users.cache.get(membro)
        let canal = modal.message.channel.topic
        const pessoa = client.users.cache.get(canal)

    
        try {
            modal.channel.permissionOverwrites.edit(user, {
                VIEW_CHANNEL: true
            })
        } catch (e) { }

        const embedticket = new Discord.MessageEmbed()

        .setDescription(`O membro <@${membro}> foi adicionado com sucesso no ticket pelo ${modal.user}`)
        .setColor(config.embedcolor)

        const embed = new Discord.MessageEmbed()

        .setDescription(`Olá <@${membro}>, você acaba de ser adicionado em um ticket na Cassian. 
         Adicionado por: ${modal.user}`)
        .setColor(config.embedcolor)

        const btnacess = new Discord.MessageButton()

        .setStyle('LINK')
        .setEmoji('1012823219327225907')
        .setLabel('Acessar ticket')
        .setURL(`https://discord.com/channels/${modal.guild.id}/${canal.id}`)
        
        const row = new Discord.MessageActionRow().addComponents([btnacess])

        user.send({embeds: [embed], components: [row]})
        modal.reply({embeds: [embedticket], ephemeral: true})
    }

    if(modal.customId == 'rem'){

        const membro = modal.getTextInputValue('rem1')
        const user = client.users.cache.get(membro)
        let canal = modal.message.channel.topic
        const pessoa = client.users.cache.get(canal)

    
        try {
            modal.channel.permissionOverwrites.edit(user, {
                VIEW_CHANNEL: false
            })
        } catch (e) { }

        const embedticket = new Discord.MessageEmbed()

        .setDescription(`O membro <@${membro}> foi removido com sucesso no ticket por: ${modal.user}`)
        .setColor(config.embedcolor)

        const embed = new Discord.MessageEmbed()

        .setDescription(`Olá <@${membro}>, você acaba de ser removido do ticket na Cassian.
        
        Removido por: ${modal.user}`)
        .setColor(config.embedcolor)

        user.send({embeds: [embed]})
        modal.reply({embeds: [embedticket], ephemeral: true})
    }

    if(modal.customId == 'ren'){

        const nome = modal.getTextInputValue('ren1')
        let canal = modal.message.channel.topic
        const pessoa = client.users.cache.get(canal)

        modal.channel.setName(`📂・ticket-${nome}`)

        const embed = new Discord.MessageEmbed()

        .setDescription(`O ticket foi renomeado para:
        
        **📂・ticket-${nome}**`)
        .setColor(config.embedcolor)

        const embedpv = new Discord.MessageEmbed()

        .setDescription(`${pessoa} Seu ticket foi renomeado na Cassian.`)
        .setColor(config.embedcolor)

        const btnacess = new Discord.MessageButton()

        .setStyle('LINK')
        .setEmoji('1012823219327225907')
        .setLabel('Acessar ticket')
        .setURL(`https://discord.com/channels/${modal.guild.id}/${canal.id}`)
        
        const row = new Discord.MessageActionRow().addComponents([btnacess])

        pessoa.send({embeds: [embedpv], components: [row]})
        modal.reply({embeds: [embed], ephemeral: true})
    }

    if(modal.customId == 'addreq'){

        const adicionado = modal.getTextInputValue('add2')

        
        const embed = new Discord.MessageEmbed()

        .setDescription(`O membro ${modal.user} acaba de pedir para adicionar o membro <@${adicionado}> no ticket (${adicionado})`)
        .setColor(config.embedcolor)

        modal.reply({content: `${modal.user}, sua requisição foi bem sucedida, basta aguardar algum administrador.`, ephemeral: true})
        modal.channel.send({embeds: [embed]})
    }

    if(modal.customId == 'pokestaff'){

        const mensagem = modal.getTextInputValue('mensamgedopoke')
        const id = modal.getTextInputValue('iddostaff')
        const membro = client.users.cache.get(id)
        let canal = modal.message.channel.topic
        const pessoa = client.users.cache.get(canal)

        const embeddomodal = new Discord.MessageEmbed()

        .setDescription(`Olá <@${id}>, o membro ${modal.user} te enviou uma DM, leia a mensagem a baixo
        
        **${mensagem}**`)
        .setColor(config.embedcolor)

        const btnacess = new Discord.MessageButton()

        .setStyle('LINK')
        .setEmoji('1012823219327225907')
        .setLabel('Acessar ticket')
        .setURL(`https://discord.com/channels/${modal.guild.id}/${canal.id}`)
        
        const row = new Discord.MessageActionRow().addComponents([btnacess])

        modal.reply({content: `O membro <@${id}> foi avisado com sucesso`, ephemeral: true})
        membro.send({embeds: [embeddomodal], components: [row]})
    }
}

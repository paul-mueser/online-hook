const {notificationRole} = require('../../../config.json');

module.exports = {
    callback: async (client, interaction) => {
        const role = interaction.guild.roles.cache.find(role => role.name === notificationRole);
        if (!role) return await interaction.reply({content: `The notification role is not found!`, ephemeral: true});
        if (!interaction.member.voice.channelId) {
            await interaction.member.roles.add(role);
        } else {
            if (!(interaction.guild.id in global.channelUsers)) global.channelUsers[interaction.guild.id] = [];
            if (!global.channelUsers[interaction.guild.id].find(user => user === interaction.member.id)) {
                global.channelUsers[interaction.guild.id].push(interaction.user.id);
            }
            console.log(global.channelUsers);
        }

        await interaction.reply({content: `You have subscribed the notification role!`, ephemeral: true});
    },

    name: 'subscribe',
    description: 'Subscribe the notification role.',
};
const {notificationRole} = require('../../../config.json');

module.exports = {
    callback: async (client, interaction) => {
        const role = interaction.guild.roles.cache.find(role => role.name === notificationRole);
        if (!role) return await interaction.reply({content: `The notification role is not found!`, ephemeral: true});
        await interaction.member.roles.remove(role);
        if (interaction.guild.id in global.channelUsers) {
            global.channelUsers[interaction.guild.id] = global.channelUsers[interaction.guild.id].filter(user => user !== interaction.user.id);
        }

        await interaction.reply({content: `You have unsubscribed the notification role!`, ephemeral: true});
    },

    name: 'unsubscribe',
    description: 'Unsubscribe the notification role.',
};
const {notificationRole} = require('../../../config.json');

module.exports = {
    callback: async (client, interaction) => {
        const role = interaction.guild.roles.cache.find(role => role.name === notificationRole);
        if (!role) return await interaction.reply({content: `The notification role is not found!`, ephemeral: true});
        await interaction.member.roles.add(role);

        await interaction.reply({content: `You have subscribed the notification role!`, ephemeral: true});
    },

    name: 'subscribe',
    description: 'Subscribe the notification role.',
};
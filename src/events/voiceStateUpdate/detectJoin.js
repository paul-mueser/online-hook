const {notificationRole} = require('../../../config.json');

module.exports = async (_, oldState, newState) => {
    let members = [];

    const channelId = oldState.guild.channels.cache.find(channel => channel.name === 'online-hook')?.id || null;
    const role = oldState.guild.roles.cache.find(role => role.name === notificationRole);
    if (!channelId || !role) return;

    if (!oldState.channel && newState.channel) {
        // Join
        newState.channel.members.forEach(member => {
            members.push(member.nickname || member.user.displayName);
        });

        let m = "";

        if (members.length > 1) {
            if (global.onlineHooks[newState.channel.id]) {
                m = global.onlineHooks[newState.channel.id];
                m = await m.edit(`${role} **${members.length}** ${members.length > 1 ? 'members' : 'member'} in ${newState.channel.name} online`);
            } else {
                const channel = newState.guild.channels.cache.get(channelId);
                m = await channel.send(`${role} **${members.length}** ${members.length > 1 ? 'members' : 'member'} in ${newState.channel.name} online`);
            }
            global.onlineHooks[newState.channel.id] = m;
        }
    } else if (oldState.channel && !newState.channel) {
        // Leave
        oldState.channel.members.forEach(member => {
            members.push(member.nickname || member.user.displayName);
        });

        if (global.onlineHooks[oldState.channel.id]) {
            if (members.length <= 1) {
                await global.onlineHooks[oldState.channel.id].delete();
                global.onlineHooks[oldState.channel.id] = null;
            } else {
                let m = global.onlineHooks[oldState.channel.id];
                m = await m.edit(`${role} **${members.length}** ${members.length > 1 ? 'members' : 'member'} in ${oldState.channel.name} online`);
                global.onlineHooks[oldState.channel.id] = m;
            }
        }
    }
}
const { Command } = require('../../structures/command');
const { EmbedBuilder } = require('discord.js');


module.exports = new Command(
    {
        name: 'queue',
        description: 'get queue',
        module_type: 'distube',

        async run(client, interaction) {
            const queue = client.distube.getQueue(interaction.guildId);

            if (!queue) {
                client.error(interaction, 'no queue available to use this command');

                return;
            }

            const songs = { queued: [] };

            for (const [id, song] of queue.songs.entries()) {
                if (id === 0) {
                    songs.current = `${ song.name } - ${ song.formattedDuration }`;

                    continue;
                }

                songs.queued.push(`**${ id }** - ${ song.name } - ${ song.formattedDuration }`);
            }

            const embed = new EmbedBuilder()
                .setTitle('now playing')
                .setDescription(songs.current)
                .setFooter({ text: `${ queue.songs.length - 1 || 'no' } songs in queue` })
                .setTimestamp()
                .addFields(
                    {
                        name: 'next up',
                        value: songs.queued.slice(0, 10).join('\n\n') || 'none',
                    },
                );

            interaction.reply({ embeds: [embed] });
        },
    },
);

const { Event } = require(__root + '/structures/event');
const { EmbedBuilder } = require('discord.js');
const { DistubeEventType } = require('../../../structures/distube');

module.exports = new Event({
	name: 'addSong',
	module_type: new DistubeEventType(),

	run(client, queue, song) {
		const embed = new EmbedBuilder()
			.setAuthor({ name: 'added to queue' })
			.setTitle(song.name)
			.setColor('#6C78AD')
			.setTimestamp()
			.addFields(
				{
					name: 'channel',
					value: song.uploader.name,
					inline: true,
				},
				{
					name: 'song duration',
					value: song.formattedDuration,
					inline: true,
				},
				{
					name: 'estimate time of playing',
					value: queue.formattedCurrentTime,
					inline: true,
				},
				{
					name: 'position in queue',
					value: (queue.songs.length - 1 || 'none').toString(),
					inline: true,
				},
			);

		queue.textChannel.send({ embeds: [embed] });
	},
});

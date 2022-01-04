import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'

import { getCustomerInfo } from './src/functions/getCustomerInfo.js'
import { getRunnerRevenue } from './src/functions/getRunnerRevenue.js'

dotenv.config()

const client = new Client({ partials: ['CHANNEL'], intents: [Intents.FLAGS.DIRECT_MESSAGES] })

client.once('ready', () => {
	console.log(`${client.user.username} successfully logged in`)
})

client.on('messageCreate', async (message) => {
	if (!message.channel.type.includes('DM')) return
	if (message.author.username.includes('TaskRunner')) return
	if (message.author.username.includes('kund')) return
	const command = message.content.split(' ').shift()
	if (command === 'kund') getCustomerInfo(message)
	if (command === 'revenue') getRunnerRevenue(message)
})

client.login(process.env.DISCORD_KEY)

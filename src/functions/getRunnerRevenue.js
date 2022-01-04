import axios from 'axios'

const delay = (ms) => {
	return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export const getRunnerRevenue = async (message) => {
	const msg = message.content.split(' ')
	const runner = msg[1]
	const from = msg[2]
	const to = msg[3]
	message.reply('Fetching data')
	const jobID = await axios.post(process.env.API_URL + '/scraper/getrunnerrevenue', {
		id: runner,
		dates: {
			from: from,
			to: to,
		},
	})
	for (let i = 0; i < 60; i++) {
		await delay(5000)
		try {
			const response = await axios.get(process.env.API_URL + `/job/${jobID.data}`)
			if (response.status !== 202) return message.reply(`Paid: ${response.data.message.paid} \nDisbursed: ${response.data.message.disbursed}`)
			if(i === 60) return message.reply('Timed out after 5 minutes. Try to lower the date spans')
		} catch (e) {
			return message.reply(e.response.data.message)
		}
	}
}

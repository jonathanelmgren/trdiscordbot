import axios from 'axios'

export const getCustomerInfo = async (message) => {
	const msg = message.content.split(' ')
	const runner = msg[1]
	const task = msg[2]
	message.reply('Fetching data')
    let data
	const customerInfo = await axios
		.post(process.env.API_URL + '/scraper/getcustomerinfo', {
			runner: runner,
			task: task,
		})
		.then((res) => {
			return (data = {
				status: res.status,
				data: res.data,
			})
		})
		.catch((error) => {
			if (error) {
				return (data = {
					status: error.response.status,
					data: error.response.data,
				})
			}
		})

	if (customerInfo.status === 200) {
		return message.reply(`${customerInfo.data.name} ${customerInfo.data.phone}`)
	} else {
		return message.reply(customerInfo.data)
	}
}

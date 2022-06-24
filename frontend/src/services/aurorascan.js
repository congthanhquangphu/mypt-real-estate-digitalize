import axios from "axios"
import config from 'utils/config'

const aurorascan = {
    async fetchTransaction(address) {
        const res = await axios(`https://api-testnet.aurorascan.dev/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${config.AURORASCAN_TOKEN}`)
        const data = res.data.result.map((transaction) => {
            return {
                "hash": transaction.hash,
                "from": transaction.from,
                "to": transaction.to,
                "amount": parseInt(transaction.value) / Math.pow(10, 18),
                "token": transaction.tokenSymbol
            }
        })
        localStorage.setItem("transactionHistory", JSON.stringify(data))
    }
}

export default aurorascan;
import axios from "axios"

export const fetchTransaction = async (address) => {
    const res = await axios(`https://api-testnet.aurorascan.dev/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${process.env.REACT_APP_AURORASCAN_TOKEN}`)
    const data = res.data.result.map((transaction) => {
        return {
            "hash": transaction.hash,
            "from": transaction.from,
            "to": transaction.to,
            "amount": parseInt(transaction.value) / Math.pow(10, 18),
            "token": transaction.tokenSymbol
        }
    })
    localStorage.setItem("transaction_history", JSON.stringify(data))
}
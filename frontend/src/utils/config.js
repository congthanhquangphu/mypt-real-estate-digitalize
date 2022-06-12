export const blockchain = {
    aurora: {
        mainnet: {
            chainId: "0x4e454152",
            rpcUrls: ["https://mainnet.aurora.dev"],
            chainName: "Aurora Mainnet",
            nativeCurrency: {
                name: "Aurora ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://aurorascan.dev/"]
        },
        testnet: {
            chainId: "0x4e454153",
            rpcUrls: ["https://testnet.aurora.dev"],
            chainName: "Aurora Testnet",
            nativeCurrency: {
                name: "Aurora ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.aurorascan.dev/"]
        }
    }
}

export const constant = {
    item_per_page: 10
}
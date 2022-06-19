import utility_token from 'utils/utility_token.json'
import crowdsale from 'utils/crowdsale.json'
import security_token from 'utils/security_token.json'
import market_listing from 'utils/market_listing.json'

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
    },
    ethereum: {
        ropsten_testnet: {
            chainId: "0x3",
            rpcUrls: ["https://ropsten.infura.io/v3/"],
            chainName: "Ropsten test network",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://ropsten.etherscan.io"]
        },
        rinkeby_testnet: {
            chainId: "0x4",
            rpcUrls: ["https://rinkeby.infura.io/v3/"],
            chainName: "Rinkeby test network",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://rinkeby.etherscan.io"]
        }
    }
}

export const aurorascan_api = "Z8ZRNGGQJI4S9YPPEFP8IXSWZC8WFDVI7I";

export const constant = {
    item_per_page_marketplace: 10,
    item_per_page_registry: 6
}

export const contract = {
    utilityContract: {
        abi: utility_token.abi,
        address: '0x9809d9D94b0B3380db38b1e1a06047a2964e0041'
    },
    crowdsaleContract: {
        abi: crowdsale.abi,
        address: '0xa1d3a7778d7B2DF95D0485039bB875268f16541A'
    },
    securityContract: {
        abi: security_token.abi,
        address: '0xD2cfA0790CcE7dd980699F6F1F4A4f1D13cEBA9F'
    },
    marketListingContract: {
        abi: market_listing.abi,
        address: '0x5fd07722841350CAF86196Ae5f96a90f8A387055'
    }
}
import utility_token from 'utils/utility_token.json'
import crowdsale from 'utils/crowdsale.json'
import security_token from 'utils/security_token.json'
import market_listing from 'utils/market_listing.json'


const config = {
    blockchain: {
        AURORA_MAINNET: {
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
        AURORA_TESTNET: {
            chainId: "0x4e454153",
            rpcUrls: ["https://testnet.aurora.dev"],
            chainName: "Aurora Testnet",
            nativeCurrency: {
                name: "Aurora ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.aurorascan.dev/"]
        },
        ROPSTEN_TESTNET: {
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
        RINKEBY_TESTNET: {
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
    },
    
    contract: {
        UTILITY_TOKEN_CONTRACT: {
            abi: utility_token.abi,
            address: "0x9809d9D94b0B3380db38b1e1a06047a2964e0041"
        },
        CROWDSALE_CONTRACT: {
            abi: crowdsale.abi,
            address: "0xa1d3a7778d7B2DF95D0485039bB875268f16541A"
        },
        SECURITY_TOKEN_CONTRACT: {
            abi: security_token.abi,
            address: "0xD2cfA0790CcE7dd980699F6F1F4A4f1D13cEBA9F"
        },
        MARKET_LISTING_CONTRACT: {
            abi: market_listing.abi,
            address: "0x5fd07722841350CAF86196Ae5f96a90f8A387055"
        }
    },

    ITEM_PER_PAGE_MARKETPLACE: 10,
    ITEM_PER_PAGE_TOKEN: 10,
    ITEM_PER_PAGE_REGISTRY: 6,
    ADMIN_ADDRESS: "0x938774a6e0f1ff890ef6d8e56f4a195b425d264e",
    AURORASCAN_TOKEN: process.env.REACT_APP_AURORASCAN_TOKEN,
}

export default config;
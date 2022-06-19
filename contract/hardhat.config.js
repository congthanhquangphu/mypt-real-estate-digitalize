require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


require('dotenv').config();

const DEVELOPER_PRIVATE_KEY = process.env.DEVELOPER_PRIVATE_KEY;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const DEVFUND_PRIVATE_KEY = process.env.DEVFUND_PRIVATE_KEY;
const CORETEAMFUND_PRIVATE_KEY = process.env.CORETEAMFUND_PRIVATE_KEY;
const RESERVEFUND_PRIVATE_KEY = process.env.RESERVEFUND_PRIVATE_KEY;
const ADVISORFUND_PRIVATE_KEY = process.env.ADVISORFUND_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "ganache",
     networks: {
         ganache: {
             url: "http://127.0.0.1:8545",
             // accounts: [privateKey1, privateKey2, ...]
             gas: 5100000,
             gasPrice: 80000000000
         },
         rinkeby: {
          url: 'https://rinkeby.infura.io/v3/7c0de832fd7f43638bca621944ebbcac',
          accounts: [''],
          gas: 5100000,
          gasPrice: 80000000000
        },
        testnet_aurora: {
          url: 'https://testnet.aurora.dev',
          accounts: [`0x${DEVELOPER_PRIVATE_KEY}`,`0x${WALLET_PRIVATE_KEY}`,`0x${DEVFUND_PRIVATE_KEY}`,`0x${CORETEAMFUND_PRIVATE_KEY}`,`0x${RESERVEFUND_PRIVATE_KEY}`,`0x${ADVISORFUND_PRIVATE_KEY}`],
          chainId: 1313161555,
          gasPrice: 8000000000,
          gas: 5100000,
          timeout: 1000000
        },
     },

  solidity: "0.8.0",
};

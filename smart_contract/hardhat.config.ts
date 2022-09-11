// https://eth-goerli.g.alchemy.com/v2/sXBfX47--ndI99SKk1DWG4c391pebDQT

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/sXBfX47--ndI99SKk1DWG4c391pebDQT',
      accounts: ['5d62adee29d0a4a9b8e9c444ee72c602a7bc767b9f2348e41f509612bdf29c7b', '081b21d644ac580616d01fc762e1a52d81d1554e11e410870c2526b3e3a65984']
    }
  }
}
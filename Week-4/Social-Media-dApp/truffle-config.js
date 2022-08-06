require('babel-register');
require('babel-polyfill');
const HDWalletProvider=require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    
      port: 7545,            
      network_id: "*",      
    },
    matic: {
      provider: () => new HDWalletProvider(process.env.secret, process.env.url),
      network_id: 80001,
    }   
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
  
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}

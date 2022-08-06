import { ethers } from "ethers";
// const { adminKey, infuraKey } = process.env;
const adminKey =
  "b6dc516f0ada95b0befe702e8d078385785ec0790c23e32d5a157407ac1ea467";
const infuraKey = "fMaetyMEzJCyMCkXIT2sNWKgmF0buj-E";

// // let provider = ethers.getDefaultProvider('web3.currentProvider'); // "mumbai"
// module.exports = {
//     provider = function() {
//         return new ethers.providers.AlchemyProvider("maticmum", adminAPIKey);
//     }
//    adminSigner = function() {
//         return new ethers.Wallet(privateKey, provider);
//    }
// }

const config = async () => {
  const provider = new ethers.providers.AlchemyProvider("goerli", infuraKey);
  const adminSigner = new ethers.Wallet(adminKey, provider); //key
  return adminSigner;
};

export default config;

import { ethers } from "ethers";
const { adminKey, infuraKey } = process.env;
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

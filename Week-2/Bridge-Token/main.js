// main.js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Matic = require('@maticnetwork/maticjs');
const privateKey= "f4769027d069424cf6eb6951fa24a55900bcc5755693b7d9047054019fe429c7"
const seed = "curious find aisle tumble coconut relax manage sunny token model shuffle wash"
const mumbai= "https://matic-mumbai--jsonrpc.datahub.figment.io/apikey/ec7fb306f0f0d2b055de263e1f84c21f"

const from = "0x2E0c3556c831f669cfb5CA86e01AcF3ACBaB207e";
const rootToken = "0x8921b4b1f4797397701032e307293d2c41df3bc0";
const amount = 999 * (10 ** 18);

const parentProvider = new HDWalletProvider(seed, 'http://127.0.0.1:8545'); // Local Geth client address
const maticProvider = new HDWalletProvider(seed, mumbai)  // DataHub Mumbai Testnet JSONRPC URL

const maticPOSClient = new Matic({
  network: "testnet",
  version: "mumbai",
  parentProvider,
  maticProvider,
});

(async () => {
  try {
    let result = await maticPOSClient.approveERC20ForDeposit(
      rootToken,
      amount.toString(),
      {
        from,
        gasPrice: "10000000000",
      }
    );
    let result_2 = await maticPOSClient.depositERC20ForUser(
      rootToken,
      from,
      amount.toString(),
      {
        from,
        gasPrice: "10000000000",
      }
    );
    console.log(result);
    console.log(result_2);
  } catch (error) {
    console.log(error);
  }
})();

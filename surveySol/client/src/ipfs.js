import { create as IPFSHTTPClient } from "ipfs-http-client";
const client = IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0");

const upload = (response) => {
  try {
    let buffer = Buffer.from(JSON.stringify(response));
    const added = await client.add(buffer);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    setFileUrl(url);
    console.log(url);
  } catch (error) {
    console.error("IPFS error ", error);
  }
};

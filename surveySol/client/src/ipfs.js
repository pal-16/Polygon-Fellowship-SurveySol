const responseSheet = {};

import { create, IPFSHTTPClient } from "ipfs-http-client";
let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",

    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

const uploadFile => (responseSheet) => {
  let buffer = Buffer.from(JSON.stringify(this.responseSheet));
  const added = await (ipfs as IPFSHTTPClient).add(buffer);
}


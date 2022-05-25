import Arweave from "arweave";
import axios from "axios";
import redstone from "redstone-api";
import { ARWEAVE_GATEWAY } from "./constants.js";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 60000,
});

export async function getArPrice() {
  try {
    const price = (await redstone.getPrice("AR"))?.value;
    return price;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}

export async function getTxRewardsFromSize(byteSize) {
  try {
    const winstons = (await axios.get(`${ARWEAVE_GATEWAY}/price/${byteSize}`))
      .data;
    return winstons;
  } catch (error) {
    console.log(error);
  }
}

// HELPER FUNCTIONS

export async function _checkTxObject(txObj) {
  try {
    const requiredKeys = [
      "format",
      "id",
      "last_tx",
      "owner",
      "tags",
      "target",
      "quantity",
      "data_size",
      "data",
      "data_root",
      "reward",
      "signature",
      "chunks",
    ];

    for (const key in txObj) {
      if (!requiredKeys.includes(key)) {
        throw new Error(
          `ERROR: invalid Arweave Transaction Object Has Been Passed`
        );
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

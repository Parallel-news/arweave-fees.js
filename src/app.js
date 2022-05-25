import { checkFeeMultiplier } from "./utils/feeMultiplierChecker.js";
import { storageCostTable, canUserUpload } from "./utils/storageCost.js";

export async function checkTxAgainstGasFees({ txObj = {}, feeMultiplier = 1 }) {
  try {
    const result = await checkFeeMultiplier({
      txObj: txObj,
      feeMultiplier: feeMultiplier,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getStorageTable() {
  try {
    const result = await storageCostTable();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function canUpload({ txObj = {} }) {
  try {
    const result = await canUserUpload({
      txObj: txObj,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}


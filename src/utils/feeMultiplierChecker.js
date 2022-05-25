import { getTxRewardsFromSize, _checkTxObject } from "./arweave.js";

export async function checkFeeMultiplier({ txObj = {}, feeMultiplier = 1 }) {
  try {

    await _checkTxObject(txObj);
    const txDataSize = Number(txObj.data_size);
    const txWinstonReward = Number(txObj.reward);
    const theoreticalWinstonReward = await getTxRewardsFromSize(txDataSize);

    return {
      txByteSize: txDataSize,
      theoreticalWinstonReward: theoreticalWinstonReward,
      actualWinstonReward: txWinstonReward,
      actualFeeMultiplier: txWinstonReward / theoreticalWinstonReward,
      testedAgainstMultiplier: feeMultiplier,
      isEqual: (txWinstonReward / theoreticalWinstonReward) === feeMultiplier,
    };
  } catch (error) {
    console.log(error);
  }
}

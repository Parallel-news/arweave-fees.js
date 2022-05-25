export const ARWEAVE_GATEWAY = "https://arweave.net/";
// 256 KiB
const MIN_STORAGE_SIZE = 256 * 1024;

export const converstionToBytes = {
  KB: MIN_STORAGE_SIZE / MIN_STORAGE_SIZE, // rounded to min storage size
  MB: 1048576 / MIN_STORAGE_SIZE,
  GB: 1073741824 / MIN_STORAGE_SIZE,
  TB: 1099511627776 / MIN_STORAGE_SIZE,
  PT: 1125899906842624 / MIN_STORAGE_SIZE,
};

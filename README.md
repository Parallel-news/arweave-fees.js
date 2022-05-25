<p align="center">
    <img src="./imgs/elephant.png" height="248">
  </a>
  <h3 align="center">arweave-fees.js</h3>
  <p align="center">🐘 utils and helper functions for Arweave developers 🐘</p>
</p>

## Synopsis
This library is for developers building on [Arweave network](https://arweave.org), it's a package of helper functions that makes the developers' work easier and save their time.

## Examples

### 1- The Arweave Equivalent Of ethgasstation.io

#### 1.1 usage example 
```js
import { getStorageTable } from "arweave-fees.js";

const archivingCost = await getStorageTable(); 

```

#### 1.2 response example
```js
const response = {
  KB: { winston: 71327155, ar: 0.000071327155, usd: 0.0010840216822326238 },
  MB: { winston: 285308620, ar: 0.00028530862, usd: 0.004336086728930495 },
  GB: { winston: 292156026880, ar: 0.29215602688, usd: 4.440152810424827 },
  TB: {
    winston: 299167771525120,
    ar: 299.16777152512,
    usd: 4546.716477875023,
  },
  PT: {
    winston: 306347798041722900,
    ar: 306347.79804172285,
    usd: 4655837.6733440235,
  },
};

```

### 2- Check The Fee Multiplier Of A Given Transaction
Developers using Arweave L1 for broadcasting transactions usually hardcode or overwrite a fee multiplier (`tx.reward`) to ensure that the user of their apps will not get dropped/failed transactions.

This hotfix is an issue when the user has already defined on his end a `Fee Multiplier` in the [Arconnect](https://arconnect.io) settings, and in the same time the developer's codes have hardcoded/overwritten fee multiplier. User's and developer's `fee multiplier` will be multiplied leading to an additional unknown AR burning for the user.

#### 2.1 usage example 
```js
import { checkTxAgainstGasFees } from "arweave-fees.js";

// Arconnect side: fee_multiplier = 3
async function testTransaction() {
  const tx = await arweave.createTransaction(
    {
      data: "hello world!",
    },
    pk
  );

  // overwritten fee multiplier by the dev
  tx.reward = (+tx.reward * 5).toString();

  tx.addTag("Content-Type", "text/plain");

  const response = await checkTxAgainstGasFees({ txObj: tx, feeMultiplier: 5 });
  console.log(response);

  if (!response.isEqual) {
    // adjusting the tx.reward
  }

  // ...
}


```

#### 2.2 response example
```js
const response = {
  txByteSize: 12,
  theoreticalWinstonReward: 71327155,
  actualWinstonReward: 356635775,
  actualFeeMultiplier: 15, // Arconnect_multiplier * Dev_multiplier
  testedAgainstMultiplier: 5,
  isEqual: false,
};


```

### 3- Checking The Ability To Post A Transaction
Check if the user can broadcast a newly created transaction by just passing the transaction object.

#### 3.1 usage example
```js
import { canUpload } from "arweave-fees.js";

async function testUpload() {
  const tx = await arweave.createTransaction(
    {
      data: "hello world!",
    },
    pk
  );

  tx.reward = (+tx.reward * 5).toString();

  tx.addTag("Content-Type", "text/plain");

  const response = await canUpload({ txObj: tx });
  console.log(response);

  if (!response.canUpload) {
    throw new Error(`insufficient balance`);
  }

  await arweave.transactions.sign(tx, pk);
  await arweave.transactions.post(tx);
}


```

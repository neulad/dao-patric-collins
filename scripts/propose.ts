import { ethers, network } from 'hardhat';
import { MyGovernor } from '../typechain-types';
import { BigNumber } from 'ethers';
import * as fs from 'fs';

async function main() {
  const myGovernor = await ethers.getContract<MyGovernor>('MyGovernor');
  const box = await ethers.getContract('Box');
  const boxCalldata = box.interface.encodeFunctionData('store', [1000]);

  const txRes = await myGovernor.propose(
    [box.address],
    [0],
    [boxCalldata],
    `Change value to 1000!`
  );
  const txRec = await txRes.wait(1);
  await network.provider.send('hardhat_mine', ['0xa']);

  const proposalId: BigNumber = txRec.events![0].args!.proposalId;
  const proposals = JSON.parse(
    fs.readFileSync('./constants/proposals.json', 'utf8')
  );

  proposals[network.config.chainId!].push(proposalId.toString());
  fs.writeFileSync(
    './constants/proposals.json',
    JSON.stringify(proposals),
    'utf8'
  );
}

main()
  .then(() => {
    console.log(`Proposed! ✌️`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });

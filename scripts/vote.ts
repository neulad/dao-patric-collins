import * as fs from 'fs';
import { ethers, network } from 'hardhat';
import { MyGovernor } from '../typechain-types';
import rawProposals from '../constants/proposals.json';

interface IProposals {
  [key: string]: string[];
}

async function main() {
  const myGovernor = await ethers.getContract<MyGovernor>('MyGovernor');
  const proposalsPerNetwork: IProposals = rawProposals;
  const proposals =
    proposalsPerNetwork[network.config?.chainId?.toString() || '0'];
  const proposalId = proposals[proposals.length - 1];

  // 0 = Against, 1 = For, 2 = Abstain
  const support = 1;
  const reason = 'Perfect reason.';
  await myGovernor.castVoteWithReason(proposalId, support, reason);

  if (network.name == 'localhost') {
    network.provider.send('hardhat_mine', ['0x3e8']);
  }
}

main()
  .then(() => {
    console.log('Voted! ');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

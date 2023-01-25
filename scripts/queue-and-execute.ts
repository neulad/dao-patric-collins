import { ethers, network } from 'hardhat';
import { Box, MyGovernor } from '../typechain-types';

async function main() {
  const myGovernor = await ethers.getContract<MyGovernor>('MyGovernor');
  const box = await ethers.getContract<Box>('Box');
  const boxCalldata = box.interface.encodeFunctionData('store', [1000]);
  const hashedDescription = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes('Change value to 1000!')
  );

  console.log(`Box value: ${await box.getValue()}`);

  await myGovernor.queue([box.address], [0], [boxCalldata], hashedDescription);

  await network.provider.send('evm_increaseTime', ['0xe10']);
  await network.provider.send('evm_mine');

  const txRes = await myGovernor.execute(
    [box.address],
    [0],
    [boxCalldata],
    hashedDescription
  );
  await txRes.wait(1);

  console.log(`Box value: ${await box.getValue()}`);
}

main()
  .then(() => {
    console.log('Queued and executed!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

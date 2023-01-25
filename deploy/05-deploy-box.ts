import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { Box, GovernanceToken, TimeLock } from '../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy('Box', {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
  const timelock = await hre.ethers.getContract<TimeLock>('TimeLock');
  const box = await hre.ethers.getContract<Box>('Box');

  if ((await box.owner()) == deployer)
    await box.transferOwnership(timelock.address);
  console.log(`Box is deployed! 👏`);
};

export default func;
func.tags = ['all', 'governance-token'];

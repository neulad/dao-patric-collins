import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { GovernanceToken, TimeLock } from '../typechain-types';
import { ethers } from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy('TimeLock', {
    from: deployer,
    args: [3600, [], []],
    log: true,
    waitConfirmations: 1,
  });
  const timelock = await ethers.getContract<TimeLock>('TimeLock');
  const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();
  console.log(await timelock.getRoleAdmin(adminRole));
};

export default func;
func.tags = ['all', 'timelock'];

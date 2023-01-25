import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { GovernanceToken, MyGovernor, TimeLock } from '../typechain-types';
import { ZERO_ADDRESS } from '../hardhat-helper-config';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const timelock = await hre.ethers.getContract<TimeLock>('TimeLock');
  const myGovernor = await hre.ethers.getContract<MyGovernor>('MyGovernor');

  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();

  await timelock.grantRole(proposerRole, myGovernor.address);
  await timelock.grantRole(executorRole, ZERO_ADDRESS);
};

export default func;
func.tags = ['all', 'setup'];

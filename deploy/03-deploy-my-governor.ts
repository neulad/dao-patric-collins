import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { GovernanceToken, MyGovernor, TimeLock } from '../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy, get } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  const timelock = await hre.ethers.getContract<MyGovernor>('TimeLock');
  const governanceToken = await hre.ethers.getContract<GovernanceToken>(
    'GovernanceToken'
  );

  await deploy('MyGovernor', {
    from: deployer,
    args: [governanceToken.address, timelock.address],
    log: true,
    waitConfirmations: 1,
  });
};

export default func;
func.tags = ['all', 'timelock'];

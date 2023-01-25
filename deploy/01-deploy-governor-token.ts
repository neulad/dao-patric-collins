import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { GovernanceToken } from '../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy('GovernanceToken', {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
  const governanceToken = await hre.ethers.getContract<GovernanceToken>(
    'GovernanceToken'
  );

  await governanceToken.delegate(deployer);

  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(deployer)}`);
};

export default func;
func.tags = ['all', 'governance-token'];

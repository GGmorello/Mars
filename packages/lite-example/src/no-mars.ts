// Import the required dependencies
import Web3 from 'web3';
import UpgradeabilityProxyAbi from '<path-to-UpgradeabilityProxy-abi>';
import UpgradeabilityProxyBytecode from '<path-to-UpgradeabilityProxy-bytecode>';
import TokenAbi from '<path-to-Token-abi>';
import TokenBytecode from '<path-to-Token-bytecode>';
import GradingSystemAbi from '<path-to-GradingSystem-abi>';
import GradingSystemBytecode from '<path-to-GradingSystem-bytecode>';

// Initialize Web3 instance with your preferred provider
const web3 = new Web3('<your-preferred-provider-url>');

// Define a function to deploy contracts
const deployContracts = async () => {
  // Deploy implementation contracts
  const presentationImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  const demoImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  const essayImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  const executableImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  const OScontributionImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  const feedbackImplementation = await new web3.eth.Contract(TokenAbi)
    .deploy({ data: TokenBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  // Deploy upgradeability proxy contract
  const upgradeabilityProxy = await new web3.eth.Contract(UpgradeabilityProxyAbi)
    .deploy({ data: UpgradeabilityProxyBytecode })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  // Initialize contracts behind proxy
  await upgradeabilityProxy.methods.upgradeTo(presentationImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
  });

  await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(14)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  await upgradeabilityProxy.methods.upgradeTo(demoImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
  });

  await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(11)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });

  await upgradeabilityProxy.methods.upgradeTo(essayImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
    });
    
    await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(17)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });
    
    await upgradeabilityProxy.methods.upgradeTo(executableImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
    });
    
    await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(10)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });
    
    await upgradeabilityProxy.methods.upgradeTo(OScontributionImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
    });
    
    await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(3)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });
    
    await upgradeabilityProxy.methods.upgradeTo(feedbackImplementation._address).send({
    from: '<deployer-address>',
    gas: '<gas-limit>',
    gasPrice: '<gas-price>'
    });
    
    await new web3.eth.Contract(TokenAbi, upgradeabilityProxy._address)
    .methods.initialize(7)
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });
    
    // Deploy GradingSystem contract
    const gradingSystem = await new web3.eth.Contract(GradingSystemAbi)
    .deploy({ data: GradingSystemBytecode, arguments: [[demoImplementation._address, presentationImplementation._address, essayImplementation._address, executableImplementation._address, OScontributionImplementation._address, feedbackImplementation._address]] })
    .send({ from: '<deployer-address>', gas: '<gas-limit>', gasPrice: '<gas-price>' });
    
    console.log('Contracts deployed and initialized successfully!');
    };
    
// Call the deployContracts function to deploy and initialize the contracts
deployContracts().catch(err => console.error(err));

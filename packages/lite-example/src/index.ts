import { contract, createProxy, deploy, runIf, debug, reduce } from 'ethereum-mars'
import { GradingSystem, Token, UpgradeabilityProxy } from '../build/artifacts'
import { Address } from 'ethereum-mars/build/src/symbols'

void deploy({}, (examiners) => {
  const presentationImplementation = contract('presentation', Token)
  const demoImplementation = contract('demo', Token)
  const essayImplementation = contract('essay', Token)
  const executableImplementation = contract('executable', Token)
  const OScontributionImplementation = contract('OScontribution', Token)
  const feedbackImplementation = contract('feedback', Token)

  const deployBehindProxy = createProxy(UpgradeabilityProxy, 'upgradeTo')

  const presentation = deployBehindProxy(presentationImplementation, 'initialize', [14]) 
  const demo = deployBehindProxy(demoImplementation, 'initialize', [11])
  const essay = deployBehindProxy(essayImplementation, 'initialize', [17]) 
  const executable = deployBehindProxy(executableImplementation, 'initialize', [10])
  const OScontribution = deployBehindProxy(OScontributionImplementation, 'initialize', [3])
  const feedback = deployBehindProxy(feedbackImplementation, 'initialize', [7]) 

  const gradingSystem = contract(GradingSystem, [demo, presentation, essay, executable, OScontribution, feedback])

  //debug('Presentation', presentation)
  debug('Allowances', [presentation.allowance(examiners, gradingSystem), demo.allowance(examiners, gradingSystem)])
  

  presentation.approve(gradingSystem, 10000)
  demo.approve(gradingSystem, 10000)
  essay.approve(gradingSystem, 10000)
  executable.approve(gradingSystem, 10000)
  OScontribution.approve(gradingSystem, 10000)
  feedback.approve(gradingSystem, 10000)

  const sscolari = '0xb794f5ea0ba39494ce839613fffba74279579268'
  const morello = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  
  debug('Allowances', [presentation.allowance(examiners, gradingSystem), demo.allowance(examiners, gradingSystem)])

  gradingSystem.updateGrade(morello, 8, presentation, {gasLimit: 1000000})
  gradingSystem.updateGrade(morello, 8, demo, {gasLimit: 1000000})
  gradingSystem.updateGrade(morello, 8, essay, {gasLimit: 1000000})
  gradingSystem.updateGrade(morello, 8, executable, {gasLimit: 1000000})
  gradingSystem.updateGrade(morello, 3, OScontribution, {gasLimit: 1000000})

  debug('morello', gradingSystem.getGradeTask(morello, presentation))
  debug('morello', gradingSystem.getGradeCourse(morello))


})

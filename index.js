var inquirer = require('inquirer')
inquirer.prompt([
  {
    type: 'input',
    name: 'path',
    message: 'path:',
    default: ''
  }
]).then((answers) => {
  console.log('结果为:')
  console.log(answers)
})

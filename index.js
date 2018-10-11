var inquirer = require('inquirer')
inquirer.prompt([
  {
    type: 'input',
    name: 'path',
    message: 'path:',
    default: 'path'
  },
  {
    type: 'input',
    name: 'name',
    message: 'name:',
    default: 'name'
  }
]).then((answers) => {
  console.log('结果为:')
  console.log(answers)
})

const { writeFile } = require('fs')
const { argv } = require('yargs')
// read environment variables from .env file
require('dotenv').config()
// read the command line arguments passed with yargs
const environment = argv.environment
const isProduction = environment === 'prod'

if (!process.env.MY_VAR) {
  console.error('All the required environment variables were not provided!')
  process.exit(-1)
}

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.dev.ts`
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   MY_VAR: "${process.env.MY_VAR}"
};
`

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: Error) => {
  if (err) {
    console.log(err)
  }
  console.log(`Wrote variables to ${targetPath}`)
})

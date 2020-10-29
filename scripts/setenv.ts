const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (
  !process.env.authMode ||
  !process.env.firebaseApiKey ||
  !process.env.firebaseAuthDomain ||
  !process.env.firebaseDatabaseUrl ||
  !process.env.firebaseProjectId ||
  !process.env.firebaseStorageBucket ||
  !process.env.firebaseMessagingSenderId
) {
  console.error('All required firebase environment variables were not provided!');
  process.exit(-1);
}

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.dev.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
   production: ${isProduction},
   authMode: ${process.env.authMode},
   firebase: {
    apiKey: '${process.env.firebaseApiKey}',
    authDomain: '${process.env.firebaseAuthDomain}',
    databaseURL: '${process.env.firebaseDatabaseUrl}',
    projectId: '${process.env.firebaseProjectId}',
    storageBucket: '${process.env.firebaseStorageBucket}',
    messagingSenderId: '${process.env.firebaseMessagingSenderId}'
  }
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});

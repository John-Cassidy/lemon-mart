import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: true,
  authMode: AuthMode.Firebase,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>',
  },
};

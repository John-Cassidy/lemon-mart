[![Coverage Status](https://coveralls.io/repos/github/John-Cassidy/lemon-mart/badge.svg)](https://coveralls.io/github/John-Cassidy/lemon-mart)

# LemonMart

This project was generated the following command:

npx @angular/cli new lemon-mart --routing --string
(select CSS as the stylesheet format)

## VSCode exensions and settings

I've added an extensions.json file in .vscode folder that suggests what extensions to install in VSCode to improve your development experience.
To install these exensions in your project, if they are not already:

npm i -D dev-norms
npm i -D npm-run-all
npm i -D open-cli
npm i -D rimraf

npm i -D prettier tslint-config-prettier tslint-plugin-prettier
npm i -D js-beautify
npm i -D import-sort import-sort-cli import-sort-parser-typescript import-sort-style-module
npm i -D tslint tslint-etc

Edit package.json file by appending an importSort attribute at the end of the file:
...
"importSort": {
".ts, .tsx": {
"parser": "typescript",
"style": "module",
"options": {}
}
}

Update the tslint.json rules for integration with Prettier and tslint-etc:
{
"extends": [
"tslint:recommended",
"tslint-etc",
"tslint-config-prettier",
"tslint-plugin-prettier"
],
"rules": {
"prettier": true,
"no-unused-declaration": true,
"semicolon": [true, "always"],
...
}
...
}

Add a new file to your project named .jsbeautifyrc:
{
"indent_size": 2,
"wrap_line_length": 90,
"end_with_newline": true,
"language": {
"html": [
"html"
]
}
}

Add a new file to your project named .prettierrc:
{
"tabWidth": 2,
"useTabs": false,
"printWidth": 90,
"semi": true,
"singleQuote": true,
"trailingComma": "es5",
"jsxBracketSameLine": true
}

Add a new file to your project named .prettierignore: \*_/_.html

I've added a settings.json file in .vscode folder that will allow all developers that work on this project in VSCode will enjoy the same experience.

## It is essential to optimize your IDE to have a great development experience

If you leverage automated tools, you can quickly configureyour IDE and your Angular porject with dozens of settings that work well together.

mrm-task-angular-vscode: VS Code task - <https://www.npmjs.com/package/mrm-task-angular-vscode>
npm i -g mrm-task-angular-vscode
Apply the Angular VS Code configuration to your project
npx mrm angular-vscode

mrm-task-npm-docker: the npm Scripts for the Docker task - <https://www.npmjs.com/package/mrm-task-npm-docker>
npm i -g mrm-task-npm-docker

Apply the npm Scripts for the Docker configuration to your project
npx mrm npm-docker

SubSink, published by Ward Bell, is a straightforward library to keep track of all subscriptions in a given class and allows you to unsubscribe to all of them during ngOnDestroy()
npm i subsink

## Setup DOTENV to access Envvironment Variables

Keep sensitive environment data out of source control
<https://medium.com/javascript-in-plain-english/setup-dotenv-to-access-environment-variables-in-angular-9-f06c6ffb86c0>

(1a) install 2 packages:
npm install --save-dev yargs dotenv

(1b) create process.env and .env files
(1c) add these files to .gitignore

- dotenv
- yargs

  (1) add environment variables you want to use in development in this file: process.env
  (2) DO NOT check in process.env into source control
  (3) run this command to generate .env file:
  npm run init:env
  (4) create scripts/setenv.ts file and copy code from article to generate environment.ts file used by ng during debugging
  (5) modify our start and build scripts so that these files are generated dynamically.
  Do this in the package.json file:
  {
  ...
  "scripts": {
  "init:env": "init-dev-env generate-dot-env process.env -f",
  "config": "ts-node ./scripts/setenv.ts",
  "start": "npm run config -- --environment=dev && ng serve -c=dev --port 5000",
  "build": "ng build",
  ...
  },
  ...
  }
  (6) update angular.json to replace the environment.ts during build and server with file you want to use - <https://itnext.io/multi-environment-setup-for-your-angular-app-a211d72f1ff1>

  (7) create an alias path to use in code.

- update tsconfig.json, add to the object compilerOptions:
  "paths": {
  "@environment": ["./src/environments/environment.ts"]
  }
- use the alias in component:
  // import { environment } from 'src/environments/environment';
  import { environment } from '@environment'; // nice!

## Commands style | lint

Run the following commands before committing your code to ensure styles and linting properly applied to the project:

npm run style:fix - automatically format code files as per styling rules
npm run lint:fix - automatically fix auto-fixable linting errors

## CI - Deploy an Angular 9|8|7 Application Using Github Actions

interesting articles:

- <https://www.c-sharpcorner.com/article/deploy-an-angular-89-application-using-github-actions/>

- <https://focisolutions.com/2020/04/github-actions-deploying-an-angular-app/>

## Angular Material and Flex-Layout

npx ng add @angular/material

- setup global angular material typography styles? no
- set up browser animations for angular material? yes
- choose a custom theme: Indigo/Pink

NOTE: if the major/minor versions of the following packages don't match, you can rerun the following command
"@angular/cdk": "^10.2.3",
"@angular/material": "^10.2.3",

npm install @angular/material@10.2.3 @angular/cdk@10.2.3

npm i @angular/flex-layout

npx ng g m material --flat -m app

(1) in material.module.ts, define a const modules array and export MatButtonModule, MatToolbarModuel, and MatIconModule, removing CommonModule

(2) in app.modules.ts, import FlexLayoutModule so Angular Flex Layout can be activated

(3) append common css to styles.css

### add custom scss stylesheet

1. pick a color palette using the Material Color tool
2. add lemonemart-theme.scss to project
3. update angular.json wiht the new them file name:
   "styles": ["src/lemonmart-theme.scss", "src/styles.css"],

### SVG version of your website logo

create or obtain an SVG version of your website logo from a designer
or a site like <https://www.flaticon.com>

(1) generate a favicon.ico and manfest files using a tool such as <https://realfavicongenerator.net>
(1a) sample generated for this site: <https://realfavicongenerator.net/favicon_result?file_id=p1ek768tocclo82hsoc5vvq826#.X4CdstBKguU>
(2) copy the zip contents to the src folder
(3) update the index file
(4) update angular.json to include the files you added to the project

## Authentication / Authorization / JWT

install the JWT decoding library
npm i jwt-decode
npm i -D @types/jwt-decode

npm i fake-jwt-sign

## Input Masking

install the ngx-mask library. makes it really easy to implement input masking in Angular
npm i ngx-mask

## Commands run during development to create

generate modules based on roles functionality:

npx ng g m manager -m app --routing
npx ng g m inventory -m app --routing
npx ng g m pos -m app --routing
npx ng g m user -m app --routing

home component
npx ng g c home -m app --inline-style

page-not-found component
npx ng g c pageNotFound -m app --inline-template --inline-style

npx ng g c manager/managerHome -m manager -s

npx ng g c manager/manager -m manager --flat -s
npx ng g c manager/userManagement -m manager -s
npx ng g c manager/receiptLookup -m manager -s

npx ng g c user/profile -m user -s
npx ng g c user/logout -m user -s
npx ng g c user/navigationMenu -m user -s

npx ng g c pos/pos -m pos -s

npx ng g c inventory/inventoryHome -m inventory -s
npx ng g c inventory/inventory -m inventory --flat -s
npx ng g c inventory/categories -m inventory -s
npx ng g c inventory/products -m inventory -s
npx ng g c inventory/stockEntry -m inventory -s

npx ng g enum auth/auth
npx ng g interface user/user/user
npx ng g s auth --flat false --lintFix
npx ng g s auth/inMemoryAuth --lintFix --skipTests
npx ng g s auth/cache --lintFix --skipTests
npx ng g interceptor auth/authHttp --lintFix --skipTests

npx ng g c login -m app

npx ng g s common/ui --lintFix
npx ng g c common/simpleDialog -m app --flat --lintFix --skipTests -s -t

npx ng g c navigationMenu -m app --lintFix -s -t

npx ng g s auth/authGuard --lintFix --skipTests

npx ng g s auth/firebaseAuth --lintFix

## Advanced - Reusability, Routing, and Caching

npx ng g s user/user/user --lintFix --skipTests
npx ng g m user/userMaterial --flat -m user
npx ng g directive user-controls/field-error/fieldError --skip-import=true
npx ng g m user-controls/field-error/fieldError --flat -m user --dry-run

npx ng g c user/view-user/viewUser --flat -m user -s -t --dry-run
npx ng g class common/baseForm.class --dry-run
npx ng g c user/name-input/nameInput --flat -m user -s -t

## Advanced Recipes - Master/Detail, Data Tables, and NgRX - Route Guards & Auxiliary Routes

npx ng g class user/user/userResolve --lintFix --skipTests --dry-run
npx ng g m sharedComponents --flat -m user --dry-run

npx ng g c manager/userTable --lintFix -m manager --dry-run

## NgRx Data - a configuration-based framework and convention-based sibling of NgRx

NgRx Data automates the creation of stores, effects, actions, reducers, dispatches, and selectors.
When applications are CRUD action based, then NgRx Data can achieve the same result as NgRx with a lot less code needing to be written.

Add NgRx Data to project with the following commands:

npx ng add @ngrx/store --minimal
npx ng add @ngrx/effects --minimal
npx ng add @ngrx/entity
npx ng add @ngrx/data

NOTE: If you want to console.log NgRx actions for debugging or imnstrumentation during runtime refier to Appendix A in book.

npx ng g s user/user/userEntity --lintFix --skipTests

## OTHER EXAMPLES

npx ng g i ICurrentWeather interface
npx ng g s weather --flat false
npx ng g c citySearch -m app --dry-run
npx ng g s postalCode --project=local-weather-app --no-flat --lintFix

## Wiki

The wiki provides resources such as documentation, diagrams, and mockups.

## Firebase

app name: lemon-mart
url: <https://lemon-mart-ce379.web.app>

### Install Firebse CLI

npm install -g firebase-tools

### log into firebase from CLI

firebase login

### setup Firebase project

### after every Angular Evergreen upgrade npm packages deprecate firebase back to this version

npm i firebase@^7.13.1
npm i -D firebase-tools@^8.14.1

#### initialize project

firebase init

NOTE: if you get an error deploying through GitHub Actions, possible fix is to upgrade firebase-tools to v 8.13.1 or higher
npm i -D firebase-tools

#### build/deploy from vs code

- build:
  npm run build:prod
- deploy:
  firebase deploy

#### implement Firebase authentication

npx ng add @angular/fire

Follow Angular Fire's quickstart guid to finish setting up the library with your Angular project,
which you can find linked from the readme file on GiHub at <https://github.com/angular/angularfire>

- https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

#### setup github workflow to deploy app to firebase

see build-deploy-firebase.yml

## Docker and setting up build,test,deploy to Google Cloud

example - docker run -it duluca/minimal-node-build-env:lts-alpine /bin/bash

## setup Google Cloud platform project

install GCloud sdk
install GCloud extensions
setup GCloud to run in windows terminal using cmd.exe
note: you can also run from VS Code terminal:

~ cmd.exe /k "C:\Program Files (x86)\Google\Cloud SDK\cloud_env.bat"

### create the project from browser

### gcloud cli commands used during development

gcloud -h
gcloud -v
gcloud config set project lemon-mart-ce379
gcloud info
gcloud projects describe lemon-mart-ce379

## Code coverage reports

generate the code coverage report for our app
npx ng test --browsers ChromiumNoSandbox --watch=false --code-coverage

execute the following command to view code coverage file in browser
npx http-server -c-l -o -p 9875 ./coverage

### Code coverage in Github

register your project at https://coveralls.io/
copy repo token and store it as an environment variable namded COVERALLS_REPO_TOKEN
create a new branch before you make any code changes
update karma.conf.js so it stores code coverage results under the coverage folder

## ts-enum-util

npm i ts-enum-util

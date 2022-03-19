# NOTE

This repo was forked from cypress-io/cypress-realworld-app for a workshop. 
Cypress + tests were removed so people who were following the workshop had some exercises.

# Let's get started

## Running the demo project

If you don't have node yet, go ahead and install it (https://nodejs.org/dist/v16.14.0/node-v16.14.0.pkg)

In the root of the application run the `npm install` or the `yarn install` command.

When the installation is finished, you should be able to run the `npm start` or `yarn start command`

When the application is running, open http://localhost:3000

Try logging in with username `Allie2` and password `s3cret` to make sure everything works fine.


## Setting up Cypress

In the root of your project run either `yarn add cypress --dev` or `npm i cypress --save-dev` to install Cypress in the project's devDependencies.

When Cypress has installed add the following line to the scripts property of package.json:

```json
  "cypress:open" : "cypress open"
```
Save the file and run either `yarn cypress:open` or `npm run cypress:open`

Cypress wil open and generate a `cypress` folder and a `cypress.json` file. 

In the `cypress/fixtures` folder remove everything and add a `my-first-test.spec.js` file.

You should now see your test file in the Cypress app. Clicking it will open an automated browser showing a message that no tests are found.

## Writing your first test

in your `my-first-test.spec.js` file add the following code: 

```js 
  describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
  })

```

The browser should refresh automatically and you should see a passed test.

**Exercise: Try changing the test so that it fails.**

Make sure your application is running again (`yarn start` or `npm start`)

remove the following code from the test: `expect(true).to.equal(true)`

add the following code in the `it` block:

```js
cy.visit("http://localhost:3000");
cy.contains("Sign in");
```

Your test should now navigate to the sign in page and find the Sign-in text.

**Extra exercise: what else can you do on this page with Cypress? Try Clicking items and typing values**

# Let's get Testing

Try fully testing the application's features. 
Make a seperate `.spec.js` file per feature.

You should fully test the happy paths of the following features:

- login 
- registration
- onboarding of new users (register & then login)
- side navigation 
- change account settings (My account item)
- creating and deleting a bank account
- making a new payment
- logging out

example of one file's structure

e.g.: login.spec.js

```js
describe("Login page", () => {
  it("Should disable sign in button when not fields are filled in", () => {
    // assert sign in button is disabled.
  })
  it("Should be able to login", () => {
    // write test to fill in text-fields, assert sign in button is no longer disabled.
    // press button and assert page navigation
  });

  it("Should Navigate to Signup when clicking signup button", () =>{
    // write test to click signup button and assert page navigation.
  });
  ...
});
```

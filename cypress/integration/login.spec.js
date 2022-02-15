/// <reference types="Cypress" />

describe("login page", () => {

    beforeEach(() => cy.visit('http://localhost:3000/signin'));

    it("should disable button when no text is filled in", () => {
        cy.get('#username').blur();
        cy.get('[data-test=signin-submit]').should('have.attr', 'disabled');
    });

    it("should be able to fill in the textfields and press the submit button", () => {
        cy.get('#username').type('Allie2');
        cy.get('#password').type('s3cret');
        cy.get('[data-test=signin-submit]').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.contains('@Allie2');
    });

    it("should be able to click the sign up button", () => {
        cy.get('[data-test=signup]').click();
        cy.url().should('equal', 'http://localhost:3000/signup');
    });
});

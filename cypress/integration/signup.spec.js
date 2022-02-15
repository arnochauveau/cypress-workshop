/// <reference types="Cypress" />

describe('Signup page', () => {

    beforeEach(() => cy.visit('http://localhost:3000/signup'));

    it('should have a disabled sign up button when no fields are filled in', () => {
        cy.get('#firstName').blur();
        cy.get('[data-test=signup-submit]').should('have.attr', 'disabled');
    });

    it('should be able to fill in all fields and register an account',() => {
        cy.get('#firstName').type('Arno');
        cy.get('#lastName').type('Chauveau');
        cy.get('#username').type('achauveau');
        cy.get('#password').type('s3cret');
        cy.get('#confirmPassword').type('s3cret');
        cy.get('button[type=submit]').click();
        cy.url().should('equal', 'http://localhost:3000/signin');
        cy.visit('http://localhost:3000/signin');
        cy.get('#username').type('achauveau');
        cy.get('#password').type('s3cret');
        cy.get('[data-test=signin-submit]').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.contains('@achauveau');
    });

    it('should error when passwords don\'t match', () => {
        cy.get('#password').type('s3cret');
        cy.get('#confirmPassword').type('wrongS3cret');
        cy.contains('Password does not match');
    });

    it('should be able to navigate to the sign in page', () => {
        cy.get('a[href="/signin"]').click()
        cy.url().should('equal', 'http://localhost:3000/signin');
    })
});

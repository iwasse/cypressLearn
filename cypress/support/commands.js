// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


import locators from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
}),

Cypress.Commands.add('login', (user, password) => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get(locators.LOGIN.USER).type(user)
        cy.get(locators.LOGIN.PASSWORD).type(password)
        cy.get(locators.LOGIN.ENTRAR).click()
        cy.get(locators.MSG).should('contain.text', 'Bem vindo')
}),

Cypress.Commands.add('resetApp', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.RESET).click()
})
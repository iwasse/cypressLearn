/// <reference types="cypress" />


describe('Functional testing', () => {
    
    before(() => {
       /*  cy.login('isahias@gmail.com', 'japadark')
        cy.resetApp() */
    })

    beforeEach(() => {
        /* cy.get(locators.MENU.HOME).click() */
    })

    it('Create account', () => {
       cy.request({
           method: 'POST',
           url: 'https://barrigarest.wcaquino.me/signin',
           body: {
                email: 'isahias@gmail.com',
                senha: 'japadark',
                redirecionar: false
           }
       }).its('body.token').should('not.be.empty')
    })

    it('Edit account', () => {
    
    })

    it('Validate an existing account', () => {
        
    })

    it('Creating a transaction', () => {
       
    })

    it('Checking Balance', () => {

    })
 
    it('Removing a transaction', () => {
       
    })

})
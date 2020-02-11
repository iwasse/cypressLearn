/// <reference types="cypress" />


describe('Functional testing', () => {
    
    before(() => {
       /*  cy.login('isahias@gmail.com', 'japadark')
        cy.resetApp() */
    })

    beforeEach(() => {
        /* cy.get(locators.MENU.HOME).click() */
    })

    var n = Math.floor(Math.random(n) * 10)

    it('Login', () => {
       cy.request({
           method: 'POST',
           url: 'https://barrigarest.wcaquino.me/signin',
           body: {
                email: 'isahias@gmail.com',
                senha: 'japadark',
                redirecionar: false
           }
       }).its('body.token').should('not.be.empty')
       .then(token => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: `New accountzor via REST #${n}`
                }
             }).as('response')
          })
          cy.get('@response').then(res => {
              expect(res.status).to.be.eq(201)
              expect(res.body).to.have.property('id')
              expect(res.body).to.have.property('nome', `New accountzor via REST #${n}`)
          })
    })

    it('Insert account', () => {

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
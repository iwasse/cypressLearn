/// <reference types="cypress" />


describe('Clock', () => {
    
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to past', () => {
       /*  cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '05/02/2020') */

        /* cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/12/1969') */

        const data = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(data.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '15809')
        cy.get('#resultado > span').invoke('text').should('gt', 1580929421194)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)

    })
})
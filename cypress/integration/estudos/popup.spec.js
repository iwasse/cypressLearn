/// <reference types="cypress" />


describe ('Work with POPUP', () => {

    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
                    cy.on('window:alert', msg => {
                      expect(msg).to.be.equal('Alert Simples')
                    })
                   // cy.wrap(body).find('#otherButton').click()
        })
        
    })

    it.only('Deve verificar se o popup foi invokado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
        
    })

    describe.only('Deve testar popup link', () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup URL', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funcionaaaa')
            })
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
                .get('#tfield').type('funciona')
        })
    })
})
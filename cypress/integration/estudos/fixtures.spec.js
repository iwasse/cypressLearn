/// <reference types="cypress" />


describe('Working with fixtures!', () => {
    
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Get data from fixture file', function() {
        

        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name='formComidaFavorita'][value=${this.usuario.comida}]`).click()
            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastradsaddo!')
            
        })
    })

    it.only('Alert', () => {
        cy.clickAlert('#alert', 'Alert Simples')
    })

})
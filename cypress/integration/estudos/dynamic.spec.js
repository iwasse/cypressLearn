/// <reference types="cypress" />


describe('Dynamic Tests', () => {
    
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach( food => {
        it('Cadastro com comida variada: ' + food , function() {

            cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            cy.get('#descComida > span').should('contain', food )
        })
        })

    })

        it.only('Deve selecionar todos usando Each', function() {

            cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()

        
            cy.get('[name=formComidaFavorita]').each($el => {
                //$el.click()
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click() 
            })
            

            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        })
    })
})

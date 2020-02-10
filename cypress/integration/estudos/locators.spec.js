/// <reference types="cypress" />


 describe('Deve testar popup link', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('using jQuery selector', () => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*=\'Francisco\']')
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        
    })

    it('using xpath', () => {
        cy.reload()
        cy.xpath('//input[3]')
        cy.xpath('/html/body//input[@id=\'formSexoMasc\']').click()
        cy.xpath('//input[contains(@onclick, \'Francisco\')]').click()
        cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/..//input[@type=\'text\']').type('HelloThere')
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('FUNCIONA___')
    })
   

 })
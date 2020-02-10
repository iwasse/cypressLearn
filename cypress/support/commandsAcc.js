
import locators from './locators'

Cypress.Commands.add('accessAccMenu', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.ACC).click()
})

Cypress.Commands.add('insertAcc', conta => {
    cy.get(locators.ACCOUNT.NOME).type(conta)
    cy.get(locators.ACCOUNT.SAVE).click()
})





/// <reference types="cypress" />

import locators from "../../support/locators"
import '../../support/commandsAcc'

describe('Functional testing', () => {
    
    before(() => {
        cy.login('isahias@gmail.com', 'japadark')
        cy.resetApp()
    })

    beforeEach(() => {
        cy.get(locators.MENU.HOME).click()
    })

    it('Insert account', () => {
        cy.accessAccMenu()
        cy.insertAcc('My account')
        cy.get(locators.MSG).should('contain.text', 'Conta inserida com sucesso!')
    })

    it('Edit account', () => {

        //var n = Math.floor(Math.random() * 10).toString()

        cy.accessAccMenu()
        cy.xpath(locators.ACCOUNT.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(locators.ACCOUNT.NOME)
            .clear()
            .type('Changed Account')
        cy.get(locators.ACCOUNT.SAVE).click()
        cy.get(locators.MSG).should('contain.text', 'com sucesso')
    })

    it('Validate an existing account', () => {
        cy.accessAccMenu()
        cy.get(locators.ACCOUNT.NOME).type('Conta mesmo nome')
        cy.get(locators.ACCOUNT.SAVE).click()
        cy.get(locators.MSG).should('contain', 'code 400')
    })

    it('Creating a transaction', () => {
        cy.get(locators.MENU.TRANSACTION).click()
        cy.get(locators.TRANSACTION.DESCRIPTION).type('Desc')
        cy.get(locators.TRANSACTION.VALUE).type('123')
        cy.get(locators.TRANSACTION.INTERESTED).type('Isahias')
        cy.get(locators.TRANSACTION.ACC).select('Conta para movimentacoes')
        cy.get(locators.TRANSACTION.STATUS).click()
        cy.get(locators.TRANSACTION.SAVE_BTN).click()
        cy.get(locators.MSG).should('contain.text', 'sucesso')
        cy.xpath(locators.EXTRATO.FN_XP_SEARCH_ELEMENT('Desc','123')).should('exist')
    })

    it('Checking Balance', () => {
        //console.log(locators.SALDO.FN_XP_ACC_BALANCE('Conta para alterar'))
       // cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_ACC_BALANCE('Conta para saldo')).should('contain', '534,00')


        cy.get(locators.MENU.EXTRATO).click()

        cy.xpath(locators.EXTRATO.FN_XP_EDIT_ELEMENT('Movimentacao 1, calculo saldo')).click()

        cy.get(locators.TRANSACTION.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(locators.TRANSACTION.STATUS).click()
        cy.get(locators.TRANSACTION.SAVE_BTN).click()
        cy.get(locators.MSG).should('contain.text', 'com sucesso')
        cy.get(locators.MENU.HOME).click()
        
        cy.xpath(locators.SALDO.FN_XP_ACC_BALANCE('Conta para saldo')).should('contain', '4.034,00')

    })

    it('Removing a transaction', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_REMOVE_ELEMENT('Movimentacao para exclusao')).click()
        cy.get(locators.MSG).should('contain', 'sucesso')

    })

})
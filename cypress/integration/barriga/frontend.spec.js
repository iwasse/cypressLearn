/// <reference types="cypress" />

import locators from "../../support/locators"
import '../../support/commandsAcc'
import buildEnv from '../../support/buildEv'

describe('Functional testing', () => {
    
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('isahias@gmail.com','japadark')
        cy.get(locators.MENU.HOME).click()
        //cy.resetApp()
    })

    it('Insert account', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id:3, nome:'Carteira master', visivel:true ,usuario_id:3
            }
        }).as('nova conta')

        cy.accessAccMenu()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1, nome:'Carteira', visivel:true, usuario_id:1},
                {id:2, nome:'Banco', visivel:true, usuario_id:2},
                {id:3, nome:'Carteira master', visivel:true , usuario_id:3}
            ]
        }).as('conta salva')

        cy.insertAcc('Carteira master')
        cy.get(locators.MSG).should('contain.text', 'Conta inserida com sucesso!')
    })

    it('Edit account', () => {

        cy.route({
            method: 'PUT',
            url: '/contas/**', // o ** aceita qualquer valor
            response: {
                id: 1,
                nome: 'Carteira alterada',
                visivel: true,
                usuario_id: 1
            }
        })

        cy.accessAccMenu()

        cy.xpath(locators.ACCOUNT.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(locators.ACCOUNT.NOME)
            .clear()
            .type('Changed Account')
        cy.get(locators.ACCOUNT.SAVE).click()
        cy.get(locators.MSG).should('contain.text', 'com sucesso')
    })

    it('Validate an existing account', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: 
                {
                    error: "Já existe uma conta com esse nome!"
                },
            status: 400
            
        }).as('conta_mesmo_nome')


        cy.accessAccMenu()
        cy.get(locators.ACCOUNT.NOME).type('Conta mesmo nome')
        cy.get(locators.ACCOUNT.SAVE).click()
        cy.get(locators.MSG).should('contain', 'code 400')
    })

    it('Creating a transaction', () => {

        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                id: 1,
                descricao: "descricao",
                envolvido: "envolvido",
                observacao: null,
                tipo: "REC",
                data_transacao: "2020-02-12T03:00:00.000Z",
                data_pagamento: "2020-02-12T03:00:00.000Z",
                valor: "123.00",
                status: true,
                conta_id: 64938,
                usuario_id: 5065,
                transferencia_id: null,
                parcelamento_id: null
            }
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(locators.MENU.TRANSACTION).click()
        cy.get(locators.TRANSACTION.DESCRIPTION).type('Desc')
        cy.get(locators.TRANSACTION.VALUE).type('123')
        cy.get(locators.TRANSACTION.INTERESTED).type('Isahias')
        cy.get(locators.TRANSACTION.ACC).select('Banco')
        cy.get(locators.TRANSACTION.STATUS).click()
        cy.get(locators.TRANSACTION.SAVE_BTN).click()
        cy.get(locators.MSG).should('contain.text', 'sucesso')

        

        cy.xpath(locators.EXTRATO.FN_XP_SEARCH_ELEMENT('Desc','123.00')).should('exist')
    })

    it('Checking Balance', () => {
        //console.log(locators.SALDO.FN_XP_ACC_BALANCE('Conta para alterar'))
       // cy.get(locators.MENU.HOME).click()

        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta":"Conta para saldo","id":51320,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":64951,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null
    
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta":"Conta para saldo","id":51320,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":64951,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null
    
            }
        })

        cy.xpath(locators.SALDO.FN_XP_ACC_BALANCE('Conta #02')).should('contain', '1,00')


        cy.get(locators.MENU.EXTRATO).click()

        cy.xpath(locators.EXTRATO.FN_XP_EDIT_ELEMENT('Movimentacao 1, calculo saldo')).click()

        cy.get(locators.TRANSACTION.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(locators.TRANSACTION.STATUS).click()
        cy.get(locators.TRANSACTION.SAVE_BTN).click()
        cy.get(locators.MSG).should('contain.text', 'com sucesso')
        cy.get(locators.MENU.HOME).click()
        
        cy.xpath(locators.SALDO.FN_XP_ACC_BALANCE('Conta #02')).should('contain', '1,00')

    })

    it('Removing a transaction', () => {

        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            status: 204,
            response: {

            }
        }).as('del')


        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_REMOVE_ELEMENT('Movimentacao para exclusao')).click()
        cy.get(locators.MSG).should('contain', 'sucesso')

    })

})
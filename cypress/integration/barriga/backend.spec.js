/// <reference types="cypress" />


describe('API testing', () => {

    //let token

    before(() => {
        cy.getToken('isahias@gmail.com', 'japadark')
           /*  .then(tkn => {
                token = tkn
            }) */
    })

    beforeEach(() => {
        cy.resetRest()
    })

    var n = Math.floor(Math.random(n) * 10)

    it('Creating new account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}`},
            body: {
                nome: `New accountzor via REST #${n}`
            }
        }).as('response')


        cy.get('@response').then(res => {
              expect(res.status).to.be.eq(201)
              expect(res.body).to.have.property('id')
              expect(res.body).to.have.property('nome', `New accountzor via REST #${n}`)
        })
    })

    it('Editing account', () => {
       cy.getAccountByName('Conta para alterar')
            .then(accId => {
                cy.request({
                    url: `/contas/${accId}`,
                    method: 'PUT',
                   // headers: { Authorization: `JWT ${token}`},
                    body: {
                        nome: `conta alterada via rest #${n}`
                    }
                }).as('response')
                
            cy.get('@response').its('status').should('be.equal', 200)
        })

    })

    it('Validate an existing account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}`},
            body: {
                nome: `Conta mesmo nome`
            },
            failOnStatusCode: false
        }).as('response')


        cy.get('@response').then(res => {
            console.log(res)
              expect(res.status).to.be.eq(400)
              expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Creating a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(accId => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    //headers: { Authorization: `JWT ${token}`},
                    body: {
                        tipo: "REC",
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                        descricao: "Transaction #01",
                        valor: "3000",
                        envolvido: "Kim Gordon",
                        conta_id: accId,
                        status: true
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.eq', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Checking Balance', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let accBalance = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') accBalance = c.saldo
            })
            expect(accBalance).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo'},
            //headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.eq', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
           // headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let accBalance = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') accBalance = c.saldo
            })
            expect(accBalance).to.be.equal('4034.00')
        })
    })
 
    it('Removing a transaction', () => {
        cy.request({
            url: `/transacoes`,
            method: 'GET',
           // headers: { Authorization: `JWT ${token}`},
            qs:{ descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //headers: { Authorization: `JWT ${token}`}
            }).its('status').should('be.equal', 204)
        })
    })

})
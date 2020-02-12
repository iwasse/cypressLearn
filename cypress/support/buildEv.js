const buildEnv = () => {
    cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 666,
                nome: 'Josh Homme',
                token: 'Uma string muito grande que não deveria ser aceito'
            }
        }).as('logar')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta: "Conta #01",
                saldo: "1000000.00"
            },
            {
                conta_id: 777,
                conta: 'Conta #02',
                saldo: '1.00'
            }]
        }).as('saldo')

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1,nome:'Carteira',visivel:true,usuario_id:1},
                {id:2,nome:'Banco',visivel:true,usuario_id:2},
            ]
        }).as('contas')

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":51318,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":64949,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":51319,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":64950,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":51320,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":64951,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":51321,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":64951,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":51322,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":64951,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":51323,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-02-12T03:00:00.000Z","data_pagamento":"2020-02-12T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":64952,"usuario_id":5065,"transferencia_id":null,"parcelamento_id":null}
            ]
        })

}

export default buildEnv
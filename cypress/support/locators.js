const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        ENTRAR: '.btn'
    },


    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        ACC: '[href="/contas"]',
        RESET: '[href="/reset"]',
        TRANSACTION: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    ACCOUNT: {
        NOME: '[data-test=nome]',
        SAVE: '.btn',
        FN_XP_BTN_ALTERAR: acc => `//table//td[contains(., '${acc}')]/..//i[@class='far fa-edit']`
    },

    TRANSACTION: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        ACC: '[data-test=conta]',
        SAVE_BTN: '.btn-primary'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_SEARCH_ELEMENT: (desc, value) =>  `//span[contains(.,'${desc}')]/following-sibling::small[contains(., ${value})]`,
        FN_XP_REMOVE_ELEMENT: acc => `//span[contains(.,'${acc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDIT_ELEMENT: acc1 => `//span[contains(.,'${acc1}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_ROW: desc => `//span[contains(.,'${desc}')]/../../../..`
    },

    SALDO: {
        FN_XP_ACC_BALANCE: acc_name =>  `//td[contains(.,'${acc_name}')]/../td[2]`
    },

    MSG: '.toast-message'

    
}
export default locators;


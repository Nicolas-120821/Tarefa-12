Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
    Cypress.Commands.add('adicionarAoCarrinho', (produto) => { cy.get(`[data-produto-nome="${produto}"]`).click(); });
});


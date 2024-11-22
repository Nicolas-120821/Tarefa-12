/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    beforeEach(() => {
        cy.visit('/'); 
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        
        const adicionarProdutoAoCarrinho = (produtoIndex) => {
            cy.get('.product-block') 
                .eq(produtoIndex) 
                .click(); 

           
            cy.get('body').then(($body) => {
                if ($body.find('.button-variable-item-S').length > 0) {
                    cy.get('.button-variable-item-S').click({ force: true }); 
                }
                if ($body.find('.button-variable-item-Red').length > 0) {
                    cy.get('.button-variable-item-Red').click({ force: true }); 
                }
            });

            
            cy.get('.single_add_to_cart_button').click();

            
            cy.get('body').then(($body) => {
                if ($body.find('.breadcrumb > a:contains("Início")').length > 0) {
                    cy.get('.breadcrumb > a').contains('Início').click({ force: true });
                } else {
                    cy.visit('/'); 
                }
            });
        };


        [0, 1, 2, 3].forEach((index) => adicionarProdutoAoCarrinho(index));

        
        cy.get('.dropdown-toggle > .text-skin').click({ force: true }); 

        // Finaliza a compra
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click(); 

        
        const dadosCliente = {
            primeiroNome: 'João',
            sobrenome: 'Silva',
            endereco: 'Rua dos Testes, 123',
            cidade: 'São Paulo',
            cep: '01001-000',
            telefone: '11999999999',
            email: 'joao.silva@teste.com',
        };

        cy.get('#billing_first_name').type(dadosCliente.primeiroNome);
        cy.get('#billing_last_name').type(dadosCliente.sobrenome);
        cy.get('#billing_address_1').type(dadosCliente.endereco);
        cy.get('#billing_city').type(dadosCliente.cidade);
        cy.get('#billing_postcode').type(dadosCliente.cep);
        cy.get('#billing_phone').type(dadosCliente.telefone);
        cy.get('#billing_email').type(dadosCliente.email);

        // Finaliza o pedido
        cy.get('#terms').click()
        cy.get('#place_order').click({ force: true });

    });
});

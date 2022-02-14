/// <reference types="cypress" />

describe ("Login", () => {

    beforeEach(() => {
        cy.visit('https://front.serverest.dev/login');
      })

    it("Deve realizar login com sucesso", () => {
        
        cy.get('[data-testid="email"]').type('fulanodasilva@qa.com.br');
        cy.get('[data-testid="senha"]').type('teste');
        cy.get('[data-testid="entrar"]').click();
    });

    it("Deve realizar login utilizando usuário ou senha incorreto", () => {

        cy.get('[data-testid="email"]').type('fulano@qa.com.br');
        cy.get('[data-testid="senha"]').type('teste');
        cy.get('[data-testid="entrar"]').click();

        cy.contains("Email e/ou senha inválidos").should('be.visible')

    })
})
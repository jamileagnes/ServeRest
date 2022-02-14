/// <reference types="cypress" />

describe ("Cadastro de usuario", () => {
    beforeEach(() => {
        cy.visit('https://front.serverest.dev/login');
      })

    it('Deve ser possivel realizar cadastro', () => {

        cy.get('[data-testid="cadastrar"]').click();

        cy.get('[data-testid="nome"]').type('Beltrano de Oliveira');
        cy.get('[data-testid="email"]').type('beltranodeoliveira@qa.com.br');
        cy.get('[data-testid="password"]').type('teste');

        cy.get('[data-testid="cadastrar"]').click();

    });

    it('Deve ser possivel cadastrar administrador', () => {

        cy.get('[data-testid="cadastrar"]').click();

        cy.get('[data-testid="nome"]').type('Beltrano de Jesus');
        cy.get('[data-testid="email"]').type('beltranodejesus@qa.com.br');
        cy.get('[data-testid="password"]').type('teste')

        cy.get('.form-check-label').click();

        cy.get('[data-testid="cadastrar"]').click();

    });

    it('Deve listar usuarios cadastrados', () => {

        cy.get('[data-testid="email"]').type('fulanodasilva@qa.com.br');
        cy.get('[data-testid="senha"]').type('teste');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="listarUsuarios"]').click();

        cy.get('h1').contains('Lista dos usuários')

    });

    it('Deve validar um usuario', () => {

        cy.get('[data-testid="email"]').type('fulanodasilva@qa.com.br');
        cy.get('[data-testid="senha"]').type('teste');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="listarUsuarios"]').click();

        cy.contains('Beltrano de Jesus');

    });

    it('Deve ser possivel excluir cadastro', () => {


        cy.get('[data-testid="email"]').type('fulanodasilva@qa.com.br');
        cy.get('[data-testid="senha"]').type('teste');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="listarUsuarios"]').click();

        cy.contains('Beltrano de Jesus');

        cy.get(':nth-child(29) > :nth-child(5) > .row > .btn-danger').click();

    });

   
}) 
/// <reference types="cypress" />

import produtosSchema from '../../../contracts/produtos.contract'

var faker = require('faker')
var produto = faker.commerce.product() + ' - Modelo: ' + faker.random.alpha(9);
var produto2 = faker.commerce.product() + ' - Modelo: ' + faker.random.alpha(9);
var preco = faker.commerce.price();
var descricao = faker.commerce.productDescription(produto);
var quantidade = faker.datatype.number(999)

describe('PRODUTOS - Testes da API ServeRest', () => {
    let token
    before(() => {
        cy.token().then(t => { token = t })
    });

    it('Validar contrato de Produtos - SCHEMA', () => {
        cy.request({
            url: '/produtos',
            method: 'GET'
        }).should((response) => {
            return produtosSchema.validateAsync(response.body)
        });
    });

    it('Deve listar os produtos cadastrados - GET', () => {
        cy.request({
            url: '/produtos',
            method: 'GET'
        }).should((response) => {
            expect(response.status).to.eq(200)
            console.log(response)
        })
    });

    it('Deve inserir um produto novo - POST', () => {
        cy.request({
            url: '/produtos',
            method: 'POST',
            headers: { authorization: token },
            body:
            {
                nome: produto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade
            }
        }).should((response) => {
            expect(response.status).to.eq(201);
            cy.log(response.body.produtos)
        })
    });

    it('Deve inserir um produto novo - POST via AppActions', () => {
        cy.cadastrarProdutos(token, produto2, preco, descricao, quantidade)
            .should((response) => {
                expect(response.status).to.eq(201);
                cy.log(response.body.produtos)
            })
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido - POST', () => {
        cy.request({
            url: '/produtos',
            method: 'POST',
            headers: { authorization: token },
            body:
            {
                nome: produto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade
            }, failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(400);
            console.log(response.body)
            expect(response.body.message).contains("Já existe produto com esse nome");
        })
    });

    it('Deve alterar um produto cadastrado previamente - PUT', () => {
        cy.request({
            url: '/produtos',
            method: 'GET'
        }).then(response => {
            let id = response.body.produtos[2]._id
            cy.log('ID produto: ' + id)
            cy.request({
                url: '/produtos/' + id,
                method: 'PUT',
                headers: { authorization: token },
                body:
                {
                    nome: produto + '_v2',
                    preco: preco,
                    descricao: descricao,
                    quantidade: quantidade
                }
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eql("Registro alterado com sucesso")
            })
        })
    });

    it('Deve deletar produtos cadastrado previamente - DELETE', () => {
        cy.request({
            url: '/produtos',
            method: 'GET',
        }).then((response) => {
            let id = response.body.produtos[2]._id
            cy.log(id)
            cy.request({
                url: '/produtos/' + id,
                method: 'DELETE',
                headers: { authorization: token }
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eql("Registro excluído com sucesso")
            })
        })
    });

})
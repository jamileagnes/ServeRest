/// <reference types="cypress" />

import usuarioSchema from '../../../contracts/usuario.contracts';

var faker = require('faker');
var nome = faker.name.findName()
var email = faker.internet.email(nome)
var email2 = faker.internet.email(nome)

describe('USUÁRIOS - Testes da API ServeRest', () => {

    before(() => {
        cy.cadastroUsuarioMaster()
    });
    it('Deve validar o esquema do contrato - SCHEMA', () => {
        cy.request({
            url: '/usuarios',
            method: 'GET'
        }).should((response) => {
            return usuarioSchema.validateAsync(response.body)
        })
    });

    it('Deve listar todos os usuários cadastrado - GET', () => {
        cy.request({
            url: '/usuarios',
            method: 'GET'
        }).then(response => {
            cy.log(response)
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.empty
            expect(response.body).to.have.property('quantidade');
            cy.log(response.body.usuarios[0]._id)
            cy.log(response.body.usuarios[0].nome)
        })
    });

    it('Deve cadastrar usuário com sucesso - POST', () => {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            body: {
                nome: nome,
                email: email,
                password: "teste",
                administrador: "false"
            }
        }).should((response) => {
            cy.log(response.body)
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eql("Cadastro realizado com sucesso")
            expect(response.body).to.have.property("_id")
        })
    });

    it('Deve cadastrar usuário com sucesso - POST via AppActions', () => {
        cy.cadastroUsuario("Fábio Araújo", email2, "teste", "false")
            .should((response) => {
                cy.log(response.body)
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eql("Cadastro realizado com sucesso")
            })
    });
    it('Deve alterar o usuário cadastrado previamente - PUT', () => {
        cy.request({
            url: '/usuarios',
            method: 'GET'
        }).then(response => {
            let id = response.body.usuarios[1]._id
            cy.request({
                url: '/usuarios/' + id,
                method: 'PUT',
                body: {
                    nome: nome,
                    email: 'alterado_' + email,
                    password: "teste",
                    administrador: "true"
                }
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eql("Registro alterado com sucesso")
            })
        })
    });

    it('Deve deletar usuário cadastrado previamente - DELETE', () => {
        cy.request({
            url: '/usuarios',
            method: 'GET'
        }).then((response) => {
            let id = response.body.usuarios[1]._id
            cy.request({
                url: 'usuarios/' + id,
                method: 'DELETE'
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eql("Registro excluído com sucesso")
            })
        })

    });

});
import login from '../fixtures/login.json'

Cypress.Commands.add('login', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            "email": usuario,
            "password": senha
        }
    })
})

Cypress.Commands.add('token', () => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            email: login.email,
            password: login.password
        }
    }).then((response) => {
        return response.body.authorization
    }).then((log) => {
        log = cy.log('Logado com ' + login.email)
    })
})

Cypress.Commands.add('getUsuario', () => {
    cy.request({
        method: 'GET',
        url: '/usuarios',
    }).then((response) => {
        return response.body.usuarios
    })
})

Cypress.Commands.add('cadastroUsuarioMaster', () => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
            nome: login.nome,
            email: login.email,
            password: login.password,
            administrador: "true"
        }, failOnStatusCode: false
    })
})

Cypress.Commands.add('cadastroUsuario', (nome, email, senha, admin) => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: admin
        }
    })
})

Cypress.Commands.add('cadastrarProdutos', (token, produto, preco, descricao, quantidade) => {
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
    })
})
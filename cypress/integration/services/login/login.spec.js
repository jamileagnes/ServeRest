describe('LOGIN - Testes da API ServeRest', () => {

    it('Deve realizar o login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq("OK")
                expect(response.body.message).to.eq("Login realizado com sucesso")
            })
    });

});
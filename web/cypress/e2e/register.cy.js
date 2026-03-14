import data from '../fixtures/orphanages.json'
import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

describe('cadastro de orfanatos', () => {

    it('Deve cadastrar um novo orfanato', () => {

        const orphanage = data.create
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        // create page go
        createPage.go()
        // set map position
        cy.setMapPosition(orphanage.position)
        // create page form
        createPage.form(orphanage)
        // submit form
        createPage.submit() 
        // validação de sucesso
        cy.get('.swal2-success-circular-line-left')
            .should('be.visible')

        mapPage.popup.haveText('Orfanato cadastrado com sucesso.')

    })
    it('Não deve cadastrar um novo orfanato quando o nome for duplicado', () => {

        const orphanage = data.duplicate

        // limpa base antes do teste
        cy.deleteMany(
            { name: orphanage.name },
            { collection: 'orphanages' }
        )

        // -------------------------
        // PRIMEIRO CADASTRO (SUCESSO)
        // -------------------------
        cy.postOrphanage(orphanage)

        // -------------------------sss
        // SEGUNDO CADASTRO (ERRO)
        // -------------------------s
         createPage.go()
        // set map position
        cy.setMapPosition(orphanage.position)
        // create page form
        createPage.form(orphanage)
        // submit form
        createPage.submit() 
        // valida erro de duplicidade
        cy.get('.swal2-icon-content')
            .should('be.visible')

            createPage.popup.haveText('Já existe um cadastro com o nome: ' + orphanage.name)     

    })
})
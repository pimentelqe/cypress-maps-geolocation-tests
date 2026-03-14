import data from '../fixtures/orphanages.json'
//import { faker } from '@faker-js/faker'

describe('cadastro de orfanatos', () => {

    it('Deve cadastrar um novo orfanato', () => {

        cy.visitWithMockGeolocation('http://localhost:3001/orphanages/create')
        const orphanage = data.create
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)

        cy.get('[name="name"]')
            //.should('be.visible')
            .type(orphanage.name)

        cy.get('[name="description"]')
            .should('be.visible')
            .type(orphanage.description)

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('[name="opening_hours"]')
            .should('be.visible')
            .type(orphanage.opening_hours)

        cy.contains('button', orphanage.open_on_weekends).click()
        cy.get('.save-button').click()

        cy.get('.swal2-success-circular-line-left')
            .should('be.visible')



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
    cy.visitWithMockGeolocation('http://localhost:3001/orphanages/create')

    cy.get('legend')
      .should('be.visible')
      .should('have.text', 'Cadastro')

    cy.setMapPosition(orphanage.position)

    cy.get('[name="name"]')
      .should('be.visible')
      .type(orphanage.name)

    cy.get('[name="description"]')
      .should('be.visible')
      .type(orphanage.description)

    cy.get('input[type="file"]')
      .selectFile(
        'cypress/fixtures/images/kids-playground-1.png',
        { force: true }
      )

    cy.get('[name="opening_hours"]')
      .should('be.visible')
      .type(orphanage.opening_hours)

    cy.contains('button', orphanage.open_on_weekends)
      .click()

    cy.get('.save-button')
      .click()

    // valida erro de duplicidade
    cy.get('.swal2-icon-content')
      .should('be.visible')

  })
})
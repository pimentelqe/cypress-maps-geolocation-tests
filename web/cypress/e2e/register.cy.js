import data from '../fixtures/orphanages.json'
import { faker } from '@faker-js/faker'

describe('cadastro de orfanatos', () => {

    it('Deve cadastrar um novo orfanato', () => {

        cy.visitWithMockGeolocation('http://localhost:3001/orphanages/create')
        const orphanage = data.create

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')
        cy.wait(5000)
        cy.setMapPosition(orphanage.position)

        cy.get('[name="name"]')
            //.should('be.visible')
            .type(orphanage.name + ' ' + faker.company.name())

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



    })

})


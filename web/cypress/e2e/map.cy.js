import data from '../fixtures/orphanages.json'

describe('map', () => {
    it('Deve poder escolher um orfanato no mapa', () => {
        const orphanage = data.map
        cy.viewport(1280, 720)
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        cy.postOrphanage(orphanage)
        cy.goto('http://localhost:3000/map')

        cy.get('.leaflet-marker-icon').as('mapLis')

        cy.get('@mapLis').each((ele, index, list) => {

            cy.get('@mapLis')
                .eq(index)
                .click({ force: true })

            cy.wait(1000)

            cy.get('.leaflet-popup-content').as('divName')

            cy.get('@divName')
                .invoke('text')
                .then((txt) => {
                    cy.log(txt)

                    if (txt === orphanage.name) {
                        cy.get('@mapLis')
                            .eq(index)
                            .as('foundItem')
                            cy.log(('Orfanato encontrado - ' + orphanage.name))

                        cy.get('@foundItem')
                            .click({ force: true })

                            cy.contains('.leaflet-popup-content', orphanage.name)
                                .find('a')
                                .click({ force: true })

                                cy.contains('h1', orphanage.name)
                    }
                }) // fecha then

        }) // fecha each
    }) // fecha it
}) // fecha describe
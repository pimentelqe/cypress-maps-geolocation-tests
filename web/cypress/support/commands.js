// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -19.2272708, longitude = -45.0129244) => {

  cy.visit(url, {
    onBeforeLoad(win) {

      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((cb) => {
          cb({
            coords: {
              latitude,
              longitude
            }
          })
        })

    }
  })
})

Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude);
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
})

/*Cypress.Commands.add('deleteMany', (filter, options) => {
  // Ajuste a URL conforme sua API de testes
  const apiUrl = cy.env('API_URL') || 'http://localhost:3333'
  cy.request('POST', `${apiUrl}/test-utils/delete-many`, {
    filter,
    collection: options.collection
  })
})*/
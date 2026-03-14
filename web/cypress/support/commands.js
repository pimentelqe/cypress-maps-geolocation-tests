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

Cypress.Commands.add('postOrphanage', (orphanage) => {
    const formdData = new FormData();
    formdData.append('name', orphanage.name);
    formdData.append('description', orphanage.description);
    formdData.append('latitude', orphanage.position.latitude);
    formdData.append('longitude', orphanage.position.longitude);
    formdData.append('opening_hours', orphanage.opening_hours);
    formdData.append('open_on_weekends', true);

    cy.request({
        url: 'http://localhost:3333/orphanages',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formdData
    }).then(response =>{
        expect(response.status).to.eq(201)
    })
})

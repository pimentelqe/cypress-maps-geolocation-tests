const { defineConfig } = require("cypress");
import { configurePlugin } from 'cypress-mongodb';

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    env: {
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow',
      },   
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.qxgqxtl.mongodb.net/HopeDB?appName=Cluster0',
        database: 'HopeDB',
      },
      API_URL: 'http://localhost:3333' // Adicionando variável de ambiente para API
    },

  },
});

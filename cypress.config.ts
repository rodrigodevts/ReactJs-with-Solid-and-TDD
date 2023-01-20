import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'e9f7qw',
  e2e: {
    baseUrl: 'http://localhost:5173',
    fileServerFolder: 'src/main/test/cypress/',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    specPattern: 'src/main/test/cypress/e2e/',
  },
});

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
    specPattern: 'src/main/test/cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFolder: 'src/main/test/cypress/support',
    supportFile: 'src/main/test/cypress/support/commands.ts',
  },
});

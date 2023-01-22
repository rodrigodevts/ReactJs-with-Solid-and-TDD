import { faker } from '@faker-js/faker';

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🛑');
    cy.getByTestId('password').should('have.attr', 'readonly');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🛑');
    cy.getByTestId('button-submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🛑');

    cy.getByTestId('password').focus().type(faker.random.numeric(3));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🛑');

    cy.getByTestId('button-submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '✅');

    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '✅');

    cy.getByTestId('button-submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentials on 401', () => {
    cy.intercept('POST', /sessions/, {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
      delay: 1000,
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('button-submit').click().getByTestId('spinner').should('exist')
    cy.getByTestId('error-wrap')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Credenciais inválidas');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /sessions/, {
      statusCode: 400,
      body: {
        error: faker.random.words(),
      },
      delay: 1000,
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('button-submit').click().getByTestId('spinner').should('exist')
    cy.getByTestId('error-wrap')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /sessions/, {
      statusCode: 200,
      body: {
        invalidPropertyReturned: faker.random.words(),
      },
      delay: 500,
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('button-submit').click().getByTestId('spinner').should('exist')
    cy.getByTestId('error-wrap')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /sessions/, {
      statusCode: 200,
      body: {
        token: faker.random.words(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('button-submit').click();
    cy.getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem('react-solid@accessToken'));
    });
  });

  it.only('Should prevent multiple submits', () => {
    cy.intercept('POST', /sessions/, {
      statusCode: 200,
      body: {
        token: faker.random.words(),
      },
    }).as('request');
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('button-submit').dblclick();

    cy.get('@request.all').should('have.length', 1);
  });
});

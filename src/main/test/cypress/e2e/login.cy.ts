import { faker } from '@faker-js/faker';
import * as Helper from '../support/form-helper';
import * as Http from './login-mocks';

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.internet.password());
  cy.getByTestId('button-submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly');
    Helper.testInputStatus('email', 'Campo obrigatório');

    cy.getByTestId('password').should('have.attr', 'readonly');
    Helper.testInputStatus('password', 'Campo obrigatório');

    cy.getByTestId('button-submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    Helper.testInputStatus('email', 'Valor inválido');

    cy.getByTestId('password').focus().type(faker.random.numeric(3));
    Helper.testInputStatus('password', 'Valor inválido');

    cy.getByTestId('button-submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    Helper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.internet.password());
    Helper.testInputStatus('password');

    cy.getByTestId('button-submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentials on 401', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    Helper.testMainError('Credenciais inválidas');
    Helper.testUrl('/login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    Helper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    Helper.testUrl('/login');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    simulateValidSubmit();
    Helper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    Helper.testUrl('/login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();
    cy.getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('react-solid@accessToken');
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0);
  });
});

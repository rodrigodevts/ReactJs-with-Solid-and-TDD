import { faker } from '@faker-js/faker';
import * as Helper from '../support/form-helper';

describe('SignUp', () => {
	beforeEach(() => {
		cy.visit('signup');
	});

	it('Should load with correct initial state', () => {
		cy.getByTestId('name').should('have.attr', 'readOnly');
		Helper.testInputStatus('name', 'Campo obrigatório');

		cy.getByTestId('email').should('have.attr', 'readOnly');
		Helper.testInputStatus('email', 'Campo obrigatório');

		cy.getByTestId('password').should('have.attr', 'readOnly');
		Helper.testInputStatus('password', 'Campo obrigatório');

		cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
		Helper.testInputStatus('passwordConfirmation', 'Campo obrigatório');

		cy.getByTestId('button-submit').should('have.attr', 'disabled');
		cy.getByTestId('error-wrap').should('not.have.descendants');
	});

	it('Should present error state if form is invalid', () => {
		cy.getByTestId('email').focus().type(faker.random.word());
		Helper.testInputStatus('email', 'Valor inválido');

		cy.getByTestId('password').focus().type(faker.random.numeric(3));
		Helper.testInputStatus('password', 'Valor inválido');

		cy.getByTestId('passwordConfirmation').focus().type(faker.random.numeric(4));
		Helper.testInputStatus('passwordConfirmation', 'Valor inválido');

		cy.getByTestId('button-submit').should('have.attr', 'disabled');
		cy.getByTestId('error-wrap').should('not.have.descendants');
	});
});

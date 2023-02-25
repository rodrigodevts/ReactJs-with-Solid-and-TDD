import { faker } from '@faker-js/faker';
import * as Helper from '../support/form-helper';
import * as Http from '../support/signup-mocks';

const simulateValidSubmit = (): void => {
	cy.getByTestId('name').focus().type(faker.internet.userName());
	cy.getByTestId('email').focus().type(faker.internet.email());
	const password = faker.internet.password();
	cy.getByTestId('password').focus().type(password);
	cy.getByTestId('passwordConfirmation').focus().type(password);
	cy.getByTestId('button-submit').click();
};

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

	it('Should present valid state if form is valid', () => {
		cy.getByTestId('name').focus().type(faker.internet.userName());
		Helper.testInputStatus('name');

		cy.getByTestId('email').focus().type(faker.internet.email());
		Helper.testInputStatus('email');

		const password = faker.internet.password();
		cy.getByTestId('password').focus().type(password);
		Helper.testInputStatus('password');

		cy.getByTestId('passwordConfirmation').focus().type(password);
		Helper.testInputStatus('passwordConfirmation');

		cy.getByTestId('button-submit').should('not.have.attr', 'disabled');
		cy.getByTestId('error-wrap').should('not.have.descendants');
	});

	it('Should present EmailInUseError on 403', () => {
		Http.mockEmailInUseError();
		simulateValidSubmit();
		Helper.testMainError('Esse e-mail já está em uso');
		Helper.testUrl('/signup');
	});
});

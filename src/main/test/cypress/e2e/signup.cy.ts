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
});

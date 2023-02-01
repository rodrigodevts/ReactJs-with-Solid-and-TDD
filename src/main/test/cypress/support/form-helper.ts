const testInputStatus = (field: string, error?: string): void => {
	cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid');
	const attr = `${error ? '' : 'not.'}have.attr`;
	cy.getByTestId(field).should(attr, 'title', error);
	cy.getByTestId(`${field}-label`).should(attr, 'title', error);
}

const testMainError = (error: string): void => {
	cy.getByTestId('spinner').should('exist');
	cy.getByTestId('error-wrap')
		.getByTestId('main-error')
		.should('not.exist')
		.getByTestId('spinner')
		.should('not.exist')
		.getByTestId('main-error')
		.should('contain.text', error);
}

const testHttpCallsCount = (count: number): void => {
	cy.get('@request.all').should('have.length', count);
}

const baseUrl: string = Cypress.config().baseUrl;
const testUrl = (path: string): void => {
	cy.url().should('eq', `${baseUrl}${path}`);
}

const testLocalStorageItem = (key: string): void => {
	cy.window().then((window) => {
		assert.isOk(window.localStorage.getItem(key));
	});
}

export { testInputStatus, testMainError, testHttpCallsCount, testUrl, testLocalStorageItem };
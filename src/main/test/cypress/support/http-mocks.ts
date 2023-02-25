import { faker } from "@faker-js/faker";

export const mockInvalidCredentialsError = (url: RegExp): void => {
	cy.intercept('POST', url, {
		statusCode: 401,
		body: {
			error: faker.random.words(),
		},
		delay: 1000,
	}).as('request');
};

export const mockEmailInUseError = (url: RegExp): void => {
	cy.intercept('POST', url, {
		statusCode: 403,
		body: {
			error: faker.random.words(),
		},
		delay: 1000,
	}).as('request');
};

export const mockOk = (url: RegExp, method: 'POST' | 'GET' | 'PUT', body: any): void => {
	cy.intercept(method, url, {
		statusCode: 200,
		body,
	}).as('request');
};

export const mockUnexpectedError = (url: RegExp, method: 'POST' | 'GET' | 'PUT'): void => {
	const statusCode: Array<Number> = [400, 404, 500];

	cy.intercept(method, url, {
		statusCode: statusCode[Math.floor(Math.random() * statusCode.length)],
		body: {
			error: faker.random.words(),
		},
		delay: 1000,
	}).as('request');
};
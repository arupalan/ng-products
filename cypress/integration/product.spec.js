/// <reference types="cypres" />

import Chance from 'chance';
const chance = new Chance();

describe('ng-products', () => {
  const email = chance.email();
  const pass = 'ValidPassword23';

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('has a title', () => {
    cy.contains('ng-arup');
    expect(2).to.equal(2);
  });

  it('blocks protected routes', () => {
    cy.get('.login-container')
      .children()
      .should('contain', 'Login')
      .and('be.visible');
  });

  it('signs up a new user', () => {
    //Asert URL
    cy.url().should('include', 'login');

    //Fill out the form
    cy.get('input[formcontrolname=username]').type(email);
    cy.get('input[formcontrolname=password]').type(pass);
    cy.get('button[type=submit]').click();

    //Assert welcome message
    cy.contains('Logout');
  });

  it('User able to View products Page', () => {
    //Asert URL
    cy.url().should('include', 'login');

    cy.login(email, pass);

    //Assert product url
    cy.url().should('include', 'product');

    //Assert welcome message
    cy.contains('Our Products');
  });

  it('User can see Galaxy S3 , S7, S8 , S9 , S10', () => {
    //Asert URL
    cy.url().should('include', 'login');

    cy.login(email, pass);

    //Assert product url
    cy.url().should('include', 'product');

    //Assert welcome message
    cy.contains('Our Products');
    cy.get('.product-info')
      .children()
      .should('contain', 'Galaxy S3')
      .and('be.visible');

    cy.get('.product-info')
      .children()
      .should('contain', 'Galaxy S7')
      .and('be.visible');

    cy.get('.product-info')
      .children()
      .should('contain', 'Galaxy S8')
      .and('be.visible');

    cy.get('.product-info')
      .children()
      .should('contain', 'Galaxy S9')
      .and('be.visible');

    cy.get('.product-info')
      .children()
      .should('contain', 'Galaxy S10')
      .and('be.visible');
  });
});

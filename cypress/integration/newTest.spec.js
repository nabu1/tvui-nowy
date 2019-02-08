/* eslint-disable*/
describe('1. Selection by hours', () => {
  before(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
    .get("[data-test='btnResetAll']").as('btnResetAll')
    .get("[data-test='btnShow']").as('btnShow')
    .get("[data-test='btnResetFavorites']").as('btnResetFavorites')

  })

  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='modalFirstTime']", { timeout: 2000 })
    .get("[data-test='hideModalFirstTime']")
  })

  it.only('1. Entering "Nie, 10 Luty" gets "Nie, 10 Luty" in results "Dzień" row', () => {
      cy.get('@day')
      .select('Nie 10 Luty')
      .get('@btnSearch')
      .click()
      .get('tr:nth-child(1) > td:nth-child(2)', { timeout: 5000 })
      .should('have.text', 'Nie, 10 Luty')
  })
})



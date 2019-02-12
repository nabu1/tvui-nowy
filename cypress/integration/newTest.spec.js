/* eslint-disable*/
import { dayAndHours, category, station } from './cyhelper'

describe('I. Selection by hours', () => {
  it('1. Entering nothing gets "Śr 13 Luty" in last row and 23rd hour in the one', () => {

    dayAndHours('Śr 13 Luty', '', '')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()
      .get('#table > tbody > tr:first > td:nth-child(4)').contains(/23.+/).should('exist')
      //.get('#table > tbody > tr:first > td:nth-child(4)').should('contain', /23/)
      .get('#table > tbody > tr:last > td:nth-child(2)').should('have.text', 'Śr 13 Luty')
  })

  it('2. Entering "Śr 13 Luty", "7" as startHour,  \
          "10" as endHour gest "6" or "7"in the first rows "Czas" column \
          and "9" or "10" in the last one', () => {

    dayAndHours('Śr 13 Luty', '7', '10')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()
    cy.get('#table > tbody > tr:first > td:nth-child(4)').contains(/[6, 7].*/).should('exist')
    cy.get('#table > tbody > tr:last > td:nth-child(4)').contains(/[9, 10].*/).should('exist')
  })
})

describe('II. Selection by categories', () => {
  it.only('1. Selecting "Śr 13 Luty", startHour = "10", endHour="12", \
          checking "Serial" and "Inne", gets "serial" in the first row \
          and "inne" as a category name, in the last one. \
          There is over 450 documents returned', () => {

    dayAndHours('Śr 13 Luty', '7', '10')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()

    category(2)
    category(7)

    cy.get('#table > tbody > tr:first > td:nth-child(7)').contains('inne').should('exist')
    .get('#table > tbody > tr:last > td:nth-child(7)').contains('serial').should('exist')
    .get('#table > tbody > tr').its('length').should('be.gte', 450)

  })
})

// #categories > div:nth-child(7) > label > span
describe('III. Selection by hours and categories', () => {
  it('1. Entering "Pon, 11 Luty", checking "Serial" and "Inne" gets "serial" or "inne" \
          as a category name in the 1st and last row of the table', () => {

      dayAndHours('Wt 12 Luty', '3', '5', 5000)
      cy.pause()

      category(1)
      category(2)
      category(3)
      cy.pause()

      cy.visit('http://localhost:8080/stations')
      station('TvpTvn', 0)
      station('Polsat', 1)
      station('Polskie', 2)
      cy.pause()
      cy.get("[data-test='btnOK']").click()
      //cy.pause()





      //cy.get('#table > tbody > tr:first > td:nth-child(7)', { timeout: 6000 }).contains('rozrywka').should('exist')
      //.get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').contains('inne').should('exist')

      /*
      cy.get('#table > tbody > tr > td:nth-child(7)')  // fixme
      .each(($el, index, $list) => {
        cy.wrap($el).invoke('text').then((text) => {
          console.log(text)
          if(text !== 'rozrywka') throw new Error('nie rozrywka')
        })
      })
      */
  })

  it('2. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "Sport" and "Wiadomosci" gets "sport" or "wiadomosci" \
              as a category name in the 1st and last row of the table', () => {

      cy.get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click().wait(1000)
      //.get('spinner').should('not.be.visible')
      .get('#categories > div:nth-child(3) > label > span').click()
      .get('#categories > div:nth-child(4) > label > span').click()

      .get('#table > tbody > tr:first > td:nth-child(7)').contains('wiadomosci').should('exist').wait(100)
      .get('#table > tbody > tr:nth-child(6) > td:nth-child(7)').contains('sport').should('exist')
  })

})

describe('IV. Selection by stations and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(0).click({force: true})
      .get("[data-test='stationsPolsat']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsPolskie']").find('input').eq(2).click({force: true})
      .get("[data-test='btnOK']").click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click().wait(4000)

      .get('#table > tbody > tr:first > td:nth-child(3)').contains('TVP 1').should('exist')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3)').contains('POLSAT').should('exist')
  })

})

describe('V. Selection by stations, categories and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsCanal']").find('input').eq(2).click({force: true})
      .get("[data-test='stationsDiscoveryNational']").find('input').eq(3).click({force: true})
      .get("[data-test='btnOK']").click().wait(500)

      .get('#categories > div:nth-child(2) > label > span').click().wait(500)
      .get('#categories > div:nth-child(7) > label > span').click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click()

      .get('#table > tbody > tr:first > td:nth-child(7)').contains('serial').should('exist')
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').contains('inne').should('exist')

      .get('#table > tbody > tr:first > td:nth-child(3)').contains('Nat Geo People HD').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(3)').contains('TVP 2').should('exist')
  })

})

describe('VI. Selection by favorites, categories and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP2", "Canal+" and "Nat Geo People", checking \
              "Serial" and "Inne", and selects 2 favorite programs, \
              doubleclicking on them. Gets you "Opowieść.." and "Ostatni", \
              once "Pokaż" button is clicked', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsCanal']").find('input').eq(2).click({force: true})
      .get("[data-test='stationsDiscoveryNational']").find('input').eq(3).click({force: true})
      .get("[data-test='btnOK']").click().wait(500)

      .get('#categories > div:nth-child(2) > label > span').click().wait(500)
      .get('#categories > div:nth-child(7) > label > span').click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click()

      .get('#table > tbody > tr:first > td:nth-child(5)').dblclick()
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').dblclick()

      .get("[data-test='btnShow']").click().wait(500)

      .get('#table > tbody > tr:first > td:nth-child(5)').should('exist')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(5)').should('exist')

      .get("[data-test='btnResetFavorites']").click().wait(500)
      .get('#table > tbody > tr:first').should('not.exist')

      .get("[data-test='btnResetAll']").click().wait(500)
      .get('#table > tbody > tr:first').should('exist')

      .get('@day').should('have.value', '')
      .get('@startHour').should('have.value', '')
      .get('@endHour').should('have.value', '')

      .get('#categories > div:nth-child(2) > label > span').should('not.be.checked')
      .get('#categories > div:nth-child(7) > label > span').should('not.be.checked')
  })

})

describe('VII. Selection by text search, stations, categories and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='btnSearch']").as('btnSearch')
    .get("[data-test='textSearch']").as('textSearch')

  })

  it('1. Entering keyword "magazyn" to the text search box gets entries \
              containing this word in the "title" column', () => {

    cy.get("[data-test='textSearch']")
    .type('magazyn').wait(2000)
    .get('@btnSearch').click().wait(2000)
    .get('#table > tbody > tr:nth-child(2) > td:nth-child(5)', { timeout: 6000 }).contains(/magazyn/i).should('exist')
  })
})

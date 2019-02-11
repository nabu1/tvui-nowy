export const dayStartHourEndHour = (day, startHour, endHour) => {
  cy.get('@day').select(day)
    .get('@startHour').select(startHour)
    .get('@endHour').select(endHour)
    .get('@btnSearch').click()
}

export const station = (groupName, stationIndex ) => {
  const query = "[data-test='stations" + groupName + "']"
  cy.get(query).find('input').eq(stationIndex).click({force: true})
  //.get("[data-test='btnOK']").click()

  //.get("[data-test='stationsTvpTvn']").find('input').eq(0).click({force: true})
}

export const category = categoryIndex => {
  const query = '#categories > div:nth-child(' + categoryIndex + ') > label > span'
  cy.get(query).click().wait(200)

}

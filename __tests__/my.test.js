/* eslint-disable */
const { days, startHours, endHours } = require('../src/services/helpers')

it('Our first test', () => {
  expect(2 + 2).toEqual(4)
})

it('should return array with object "text: Czw 14 Luty"', () => {
  const result = days()
  expect(result).toBeDefined()
  expect(result).not.toBeNull()

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        text: 'Czw 14 Luty'
      })
    ])
  )
})




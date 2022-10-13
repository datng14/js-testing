const puppeteer = require('puppeteer')
const { generateText, checkAndGenerate } = require('./util')

test('should output name and age', () => {
  const text = generateText('Dat', 30)
  expect(text).toBe('Dat (30 years old)')
})

test('should output data-less text', () => {
  const text = generateText('', null)
  expect(text).toBe(' (null years old)')
})

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 33)
  expect(text).toBe('Max (33 years old)')
})

test('should create an element with text an correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920, 1080']
  })
  const page = await browser.newPage()
  page.goto('file:///Users/datng/Documents/Projects/DEMO/js-testing-introduction/index.html')

  await page.waitForSelector('input#name')
  await page.click('input#name')
  await page.type('input#name', 'Dat')
  await page.waitForSelector('input#age')
  await page.click('input#age')
  await page.type('input#age', '30')
  await page.click('#btnAddUser')

  const finalText = await page.$eval('.user-item', el => el.textContent)
  expect(finalText).toBe('Dat (30 years old)')
}, 10000)
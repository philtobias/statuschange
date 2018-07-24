const puppeteer = require('puppeteer');
const chalk = require('chalk');
const {
  IFTTT_API_KEY,
  IFTTT_SUCCESS_EVENT,
  IFTTT_FAILURE_EVENT,
  URI,
  TITLE,
  SELECTOR,
  SELECTOR_CLASS,
  NOTIFY_ON_SUCCESS,
  NOTIFY_ON_FAILURE } = process.env;
const IFTTTMaker = require('iftttmaker')(IFTTT_API_KEY);

console.log(`${TITLE} job ran at ${new Date()}`);
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URI);

  const isSuccess = await page.evaluate((selector, selectorClass) => {
    return !document.querySelector(selector).classList.contains(selectorClass);
  }, SELECTOR, SELECTOR_CLASS);

  await browser.close();

  if(isSuccess && NOTIFY_ON_SUCCESS) {
    IFTTTMaker.send(IFTTT_SUCCESS_EVENT).then(function () {
      console.log('Success notification was sent');
    }).catch(function (error) {
      console.log('The success notification could not be sent:', error);
    });
  } else if(NOTIFY_ON_FAILURE) {
    IFTTTMaker.send(IFTTT_FAILURE_EVENT).then(function () {
      console.log('Failure notification was sent');
    }).catch(function (error) {
      console.log('The failure notification could not be sent:', error);
    });
  }
})();
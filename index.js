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

async sendIFFFTMakerRequest(isSuccess) {
  const eventType = isSuccess ?  : IFTTT_FAILURE_EVENT;
  const message = isSuccess ? 'success' : 'failure';

  if(isSuccess && NOTIFY_ON_SUCCESS) {
    try {
      await IFTTTMaker.send(IFTTT_SUCCESS_EVENT);
      console.log(`${message} notification was sent`);
    } catch(error) {
      console.log(`The {$message} notification could not be sent:`, error);
    }
  } else if(NOTIFY_ON_FAILURE) {
    try {
      await IFTTTMaker.send(IFTTT_FAILURE_EVENT)
      console.log('Failure notification was sent');
    } catch(error) {
      console.log('The failure notification could not be sent:', error);
    };
  }
}

console.log(`${TITLE} job ran at ${new Date()}`);
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URI);

  const isSuccess = await page.evaluate((selector, selectorClass) => {
    return !document.querySelector(selector).classList.contains(selectorClass);
  }, SELECTOR, SELECTOR_CLASS);

  await browser.close();
  await sendIFFFTMakerRequest(isSuccess);
})();
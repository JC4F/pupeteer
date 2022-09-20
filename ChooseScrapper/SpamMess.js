const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.facebook.com");

  await page.type("#email", "lquan12122002@gmail.com");
  await page.type("#pass", "");
  await Promise.all([
    page.click("button[type='submit']"),
    page.waitForNavigation(),
  ]);

  await page.goto("https://www.facebook.com/messages/t/100009351232624");
  await page.waitForTimeout(5000);
  await page.click("div[contenteditable]");
  await page.click("div[contenteditable]");
//   await page.keyboard.down("Control");
 for(let i = 0; i < 20; i++) {
     await page.keyboard.type(`Day roi a`);
     await page.keyboard.press('Enter')
     await page.keyboard.type(`Ngu tiep di`);
     await page.keyboard.press('Enter')
 }
//   await page.keyboard.up("Control");
  //   await browser.close();
})();

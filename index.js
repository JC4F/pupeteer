const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  let data = []
  let answer = []
  const browser = await puppeteer.launch({ headless: false,  args: [`--window-size=1920,1080`], defaultViewport: {
    width:1920,
    height:1080
  } });
  const page = await browser.newPage();
  await page.goto("https://trogiup.chotot.com/nguoi-mua/cho-tot-bao-ve-nguoi-dung-nhu-the-nao/");

  await page.waitForTimeout(3000);
  const questList = await page.$$eval("#Submenu2 a", ques => {
    return ques.map(x => x.innerHTML)
  })

  for (let i = 1; i <= questList.length; i++){
    await page.click(`#Submenu2 li:nth-child(${i}) a`)
    await page.waitForTimeout(3000);

    const element = await page.waitForSelector('.entry-content'); 
    const value = await element.evaluate(el => el.innerHTML); 

    answer.push(value);
  }

  for (let i = 0; i < questList.length; i++){
    data.push(`insert into Assistance values(N'${questList[i]}', N'${answer[i]}', '2022-09-10 16:48:40.285', '2022-09-10 16:48:40.285', 0, 0)`)
  }

  await fs.writeFile("datas.txt", data.join("\n"))

  //   await browser.close();
})();

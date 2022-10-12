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
  await page.goto("https://fullstack.edu.vn/blog?page=2");

  await page.waitForTimeout(3000);
  const itemList = await page.$$eval(".PostItem_wrapper__5s6Lk", item => {
    return item.map(x => {
      return {
        title: x.querySelector('h2').innerHTML,
        description: x.querySelector('.PostItem_desc__be9G8').innerHTML,
        link: x.querySelector('.PostItem_info__DZr39 a').href
      }
    })
  })

  for(let item of itemList) {
    await page.goto(item.link);
    await page.waitForTimeout(2000);
    const element = await page.waitForSelector('.MarkdownParser_wrapper__JYN63.BlogDetail_markdownParser__QFL3L'); 
    const value = await element.evaluate(el => el.innerHTML); 
    let item1 = {...item, content: value}
    itemList[itemList.indexOf(item)] = item1;
  }

  data = itemList.map(cur => {
    return `insert into BLOG values (${Math.floor(Math.random() * 4) + 3}, N'${cur.content}', N'${cur.title}', N'${cur.description}', null, '2022-09-10 16:48:40.285', '2022-09-10 16:48:40.285', ${Math.floor(Math.random() * 4) + 3})`
  });
  await fs.writeFile("datas.txt", data.join("\n"))

  //   await browser.close();
})();

const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  let data = [], blog=[]
  let description = ["Các cửa hàng, doanh nghiệp thuộc chương trình “Đối Tác Chợ Tốt” sẽ được gắn nhãn “ĐỐI TÁC” trên giao diện tin đăng và trong cửa hàng như hình minh họa bên dưới:",
  "Trong giai đoạn hiện tại, Chợ Tốt đang chọn lọc một số cửa hàng, doanh nghiệp đạt tiêu chuẩn để tham gia chương trình.",
  "Nếu bạn quan tâm đến chương trình “Đối Tác Chợ Tốt”, vui lòng để lại thông tin theo link bên dưới để Chợ Tốt ưu tiên gửi thông báo đến bạn khi chúng tôi mở rộng quy mô chương trình.",
  "Với mục tiêu tạo niềm tin với khách mua xe và đề cao chữ Tín trong việc bán xe trực tuyến, Chợ Tốt ra mắt chương trình Đối Tác Chợ Tốt Xe.",
  "Để tin đăng xe có thể nổi bật, hiệu quả và thu hút người mua giữa hàng ngàn tin đăng khác ở Chợ Tốt là 1 điều không hề đơn giản. Thấu hiểu mong muốn của người dùng, Chợ Tốt sẽ chỉ cho bạn mẹo đăng tin rao bán xe hiệu quả nhất.",
  "Chụp hình vào những khung giờ đẹp (7h – 9h sáng hoặc 16-17h chiều). Tránh chụp chiếc xe vào giờ nghỉ trưa hay khi đang để trong một bãi đậu xe để tránh dư sáng hay thiếu sáng cho hình ảnh của bạn.",
  "Tìm một vị trí biệt lập (công viên, sân bãi rộng thoáng) để chiếc xe của bạn trở thành tâm điểm của bức ảnh và có phông nền đẹp.",
  "Chụp tổng thể chiếc xe, trước, sau, mặt bên, bánh xe, lốp xe, động cơ, yên ghế, và đồng hồ đo để người mua tiềm năng có thể đọc được số km mà xe đã chạy."]
  const browser = await puppeteer.launch({ headless: false,  args: [`--window-size=1920,1080`], defaultViewport: {
    width:1920,
    height:1080
  } });
  const page = await browser.newPage();
  await page.goto("https://trogiup.chotot.com/toi-la-nguoi-ban/ban-hang-tren-cho-tot-nhu-the-nao/#section-890");

  await page.waitForTimeout(3000);
  const itemList = await page.$$eval("ul.list-seller li a", item => {
    return item.map(x => x.href)
  })

  let i=1;
  for(let item of itemList) {
    if(i===20) break;
    await page.goto(item);
    await page.waitForTimeout(2000);
    const titleEle = await page.waitForSelector('.content-detail-seller h1')
    const contentEle = await page.waitForSelector('.content-detail-seller .entry-content')
    const title = await titleEle.evaluate(el => el.innerHTML)
    const content = await contentEle.evaluate(el => el.innerHTML)
    blog.push({title, content});
    i++;
  }

  data = blog.map(cur => {
    return `insert into BLOG values (${Math.floor(Math.random() * 4) + 3}, N'${cur.content}', N'${cur.title}', N'${description[Math.floor(Math.random() * 8)]}', null, '2022-09-10 16:48:40.285', null)`
  });
  await fs.writeFile("datas.txt", data.join("\n"))

  //   await browser.close();
})();

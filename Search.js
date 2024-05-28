import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();


  await page.goto('https://www.google.com');

 
  const searchQuery = 'puppeteer';
  await page.type('input[name="q"]', searchQuery);
  await page.keyboard.press('Enter');


  await page.waitForSelector('h3');

  const results = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('h3'));
    return items.map(item => ({
      title: item.innerText,
      url: item.parentElement.href
    }));
  });

  
  console.log(results);


  await browser.close();
})();

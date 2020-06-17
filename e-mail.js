// npm install chromedriver selenium-webdriver puppeteer

let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let url, pwd, user,id;

(async function (){
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.url;
    user = credentials.user;
    pwd = credentials.pwd; 
    id = credentials.id;
    other_id = credentials.other_id;
    subject = credentials.subject;
    body = credentials.body;

    // start browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 400
        
    }); 
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];

    //goto page
    //1.
    await tab.goto(url);
    
     // Entering email
     await tab.waitForSelector("input[type = 'email']");
     await tab.type("input[type = 'email']",user);

     // Next button
     await tab.click("#identifierNext");

     // Entering password
     await tab.waitForSelector("input[type = 'password']");
     await tab.type("input[type = 'password']",pwd, { delay: 200 });

     // Next button
     await tab.click("div[id = 'passwordNext']");

     // Compose new mail
     await tab.waitForSelector("div[ jslog='20510; u014N:cOuCgd,Kr2w4b']");
     await tab.click("div[ jslog='20510; u014N:cOuCgd,Kr2w4b']");

     // Entering mail of another person
     await tab.waitForSelector("textarea[class = 'vO']");
     await tab.type("textarea[class = 'vO']",other_id);
     // Subject
     await tab.type("input[class = 'aoT']",subject);
     // Body
     await tab.type("div[class = 'Am Al editable LW-avf tS-tW']",body);

     // Send button
     await tab.click("div[class = 'T-I J-J5-Ji aoO v7 T-I-atl L3']");
     
;})()

// statement to run the code
// node e-mail.js credentials.json


// create another file credentials.json
/*

{
    "user":"enter_email",
   "pwd":"enter_password",
    "url": "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fmail.google.com%2Fmail&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession",
    "other_id": "enter_password",
    "subject":  "Hor kida",
    "body": "Sab vadia ?"
}

*/

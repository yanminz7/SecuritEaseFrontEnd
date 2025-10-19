import { Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import  SearchPage from "../page-objects/SearchPage";
import { CustomWorld }   from "../setup/world";
setDefaultTimeout(60000_000);

let searchPage : SearchPage;
let searchResultNumber = 0;

Given('I am on the {string}', async function (this: CustomWorld,homepage:string) {
    await this.page!.goto(homepage);
        
});

When('I search for {string}', async function (this: CustomWorld,keyword:string) {
    
    searchPage = new SearchPage(this.page!);
    searchResultNumber = await searchPage.search(keyword);
  
});

Then('I should see at least {int} relevant results', async function (this: CustomWorld,expectedResultNumber:number) {
    console.log(`Get ${searchResultNumber} relavent search result`);
    expect(searchResultNumber).toBeGreaterThan(expectedResultNumber);

});

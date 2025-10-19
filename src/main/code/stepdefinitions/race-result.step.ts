import { Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { DataTable } from '@cucumber/cucumber';
import { expect } from "@playwright/test";
import  BBC from "../page-objects/BBC";
import { CustomWorld }   from "../setup/world";
setDefaultTimeout(60000_000);

let bbc : BBC ;
let resultMap = new Map<string, string>;

Given('I am on the BBC Sport {string}', async function (this: CustomWorld,sport:string) {
         
    bbc = new BBC(this.page!);
    await bbc.openBBCSport(sport);
        
});


When('I search Result for the {string} {string}', async function (this: CustomWorld,year:string,event:string) {   
     await bbc.getSportResultForEvent(year,event,resultMap);       
});

Then('the top 3 finishers should be:', async function (dataTable:DataTable) {
   const rows = dataTable.rows(); 
   for (const row of rows) {
    const expectedRank = row[0];     
    const expectedDriver = row[1]; 
    const driver=resultMap.get(expectedRank)  
    
    console.log(`Expected Rank: ${expectedRank}, Expected Driver: ${expectedDriver} , Actual driver: ${driver}`);

    expect(driver).toEqual(expectedDriver);

  }
  

});



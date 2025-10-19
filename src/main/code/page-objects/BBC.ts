import { Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext,expect as pwExpect, Locator } from "@playwright/test";

/**
 * BBC class encapsulates interactions with the BBC Sports Result page
 */
class BBC {
   private page: Page;
   /**
   * Constructor accepts a Playwright Page object.
   * @param newpage - The Playwright page instance to interact with the UI.
   */
   constructor( newpage: Page){
     this.page = newpage;
   }
   /**
    * Open BBC Sport home page and navigate to sport 
    * paramter: Sport name (For example: Football, Cricket, Formula)
    */
   async openBBCSport(sport:string){
      await this.page.goto("https://www.bbc.com/sport");
      // Navigate to sport page
      await this.page.getByTestId('navigation').getByRole('link', { name: sport }).click();
   }
   /***
    * Get the top 3 sport result for the event of that year
    * @param year - The calendar year to search within (e.g. "2023").
    * @param event - The name of the sport event (e.g. "Las Vegas Grand Prix").
    * @param map - the map hold 'Rank' and 'Driver' pair for the top results.
    */
   async getSportResultForEvent(year:string,event:string,resultMap :Map<string, string>){
     
      // Navigate to the BBC Sport "Results" page
      await this.page.getByRole('link', { name: 'Results' }).click();
      await this.page.waitForLoadState('networkidle');
      // Click the calendar link for the year
      await this.page.getByTestId(`datepicker-date-link-${year}`).click();
      await this.page.waitForLoadState('networkidle');
      //  Get all the sport event sections displayed for that year
      await this.page.waitForSelector('button.ssrcss-1spef27-Button', { state: 'attached', timeout: 20000 }).catch(() => {});
      // Locate the top level web elements for all the events
      const sections = this.page.locator('section.ssrcss-1mb5d43-Drawer.elwr9uk6');  
      const count = await sections.count();
    
      // Loop all the events in that year
      for (let i = 0; i < count; i++) {
         const section = sections.nth(i);
         // Get event name 
         const button = section.locator('button.ssrcss-1spef27-Button.eoocusk1');
         const text = await button.innerText();
         if(text.toLowerCase().includes(event.trim().toLowerCase())){
            // Locate the button that contains the event title (e.g. "Las Vegas Grand Prix")
            await button.click();
            await this.page.waitForLoadState('networkidle');
            // Locate the results table for the expanded event section
            const tableLocator =  section.locator('table[aria-label="Race result"][data-testid="sport-table"]');
            const rows = tableLocator.locator('tbody tr');
            const rowCount = await rows.count();
            // Loop through each row in the result table (can filter top 3 here)
            for (let j = 0; j < rowCount; j++) {
              // Extract the rank (position) and name (driver/player) from the row
              const row =  rows.nth(j);
              const rank = row.locator('td:nth-of-type(1) span.visually-hidden.ssrcss-1f39n02-VisuallyHidden.e16en2lz0');
              const name = row.locator('td:nth-of-type(2) span.ssrcss-1hf3wfc-FullName.e1dzfgvv4');
              const rankText = await rank.innerText();
              const nameText = await name.innerText();
              // Create a result entry and put it in the Map               
              resultMap.set(rankText, nameText);           
              console.log("Rank:"+ rankText + ", Driver:"+nameText);              
            }
            break;
         }         
      }
     
    }

}

export default BBC;

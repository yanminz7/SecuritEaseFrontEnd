import { Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext,expect as pwExpect, Locator, expect } from "@playwright/test";
import RegisterPage from "./RegisterPage";

/**
 * SearchPage class encapsulates the search functionality on the BBC Sports website.
 * It automates typing a keyword into the search bar and returns the number of relevant results.
 */

class SearchPage {
   private page: Page;
    /**
   * Initializes the SearchPage with a Playwright Page instance.
   * @param newpage - The current Playwright page object
   */
   constructor( newpage: Page){
     this.page = newpage;
   }
   /**
   * Performs a search using the given keyword and returns the number of non-empty search results.
   * Also handles closing any registration pop up if it appears.
   *
   * @param keyword - The term to search on the BBC website
   * @returns The number of relevant (non-empty headline) search results
   */
   async search(keyword:string){
    // Click on the "Search BBC" link to activate the search input
     await this.page.getByRole('link', { name: 'Search BBC' }).click();    
     await this.page.getByRole('textbox', { name: 'Search news, topics and more' }).click();
     await this.page.waitForLoadState('networkidle');
     // Focus and fill the search textbox with the keyword
     await this.page.getByRole('textbox', { name: 'Search news, topics and more' }).fill(keyword);
     await this.page.getByRole('button', { name: 'Search' }).click();
     // Wait for the page to finish loading search results
     await this.page.waitForLoadState('networkidle');
    // Check if the registration popup appears and close it if present
     const register=await this.page.waitForSelector("div.tp-iframe-wrapper.tp-active", { state: 'attached', timeout: 3000 }).catch(() => {});
     if (register !=null){
         console.log('Register page displayed');
         const registerPage = new RegisterPage(this.page);
         await registerPage.close();
         console.log('Close Register page');
     }
     // Locate all search result cards (each represents an article or content block)
     const results = this.page!.getByTestId('newport-card');
     const count = await results.count();
     // Initialize the counter for valid (non-empty) results
     let searchResultNumber = 0;
     for(let i=0;i<count;i++){
       const row = results.nth(i);
       const headline = row.getByTestId("card-headline");
       const headlineText = await headline.textContent();
       console.log('Headline: '+headlineText);
       // Count result only if headline is non-empty
       if (headlineText !== '') searchResultNumber++;
 
       }  
       // Return the total number of relevant (non-empty) search results
       console.log('Returned search result number :'+searchResultNumber);
       return searchResultNumber;
     }
  }


export default SearchPage;

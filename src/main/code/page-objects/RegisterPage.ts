import { Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext,expect as pwExpect, Locator } from "@playwright/test";

/**
 * RegisterPage class encapsulates interactions with the registration page.
 */
class RegisterPage {
   private page: Page;
   /**
   * Constructor accepts a Playwright Page object.
   * @param newpage - The Playwright page instance to interact with the UI.
   */
   constructor( newpage: Page){
     this.page = newpage;
   }
 /**
   * Closes the registration page by:
   * 1. Locating the iframe wrapper div with class "tp-iframe-wrapper tp-active"
   * 2. Accessing the iframe inside that div
   * 3. Finding the close button within the iframe
   * 4. Clicking the close button to dismiss the registration popup
   */
   async close(){
    // Locate the active iframe wrapper that contains the registration 
     const div = this.page.locator("div.tp-iframe-wrapper.tp-active");
     // Access the iframe element inside the wrapper
     const iframe = div.frameLocator('iframe');        
    // Locate the close button within the iframe (based on its class)
     const button = iframe.locator('button.pn-article__close');
    // Click the close button to close register popup
     await button.click();
   }
}

export default RegisterPage;
import { Before,BeforeAll,BeforeStep,After,AfterAll,AfterStep } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext, expect as pwExpect, Locator } from "@playwright/test";
import { CustomWorld }   from "../setup/world";
import os from 'os';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  const platform = os.platform();  // 'win32', 'linux', 'darwin', etc.

	// If running on Windows → show browser; otherwise headless
	const isWindows = platform.startsWith('win');
	const options = {
	headless: !isWindows
	};

   console.log(`Detected OS: ${platform} → headless = ${options.headless}`);
  
   browser = await chromium.launch(options);
});

AfterAll(async () => {
});

Before(async function (this: CustomWorld) {
  context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await context?.close();
});
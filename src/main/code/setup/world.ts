import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext } from 'playwright';

export interface CustomWorld extends World {
  page?: Page;
  browser?: Browser;
  context?: BrowserContext;
}

export class CustomWorld extends World implements CustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
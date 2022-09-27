import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import loginData from '/home/docknbhc3gsk3/PlaywrightProject/tests/data/loginData.json';

const massOfData = loginData;

// console.log(massOfData.valid[0]); 

////////////////////////////////////////////////////////////////////////////////////////////////////
//LOCATORS ////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//Login Console
const locatorEmailConsole = '[placeholder="Fill in your personal email"]'
const locatorPasswordConsole = '[placeholder="Choose a safe password"]'

// Errors spam
const errorLoginConsole = '//*[@id="single-spa-application:@dock-console/auth"]/div[2]/div/div/div'

// Buttons
const accesLoginConsole = '//*[@id="single-spa-application:@dock-console/auth"]/div[1]/div[2]/div/form/button'

//Faker
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password(10, true, /[A-Z]/, '12345A ');

// Login de acesso ao console
const accesConsolelValid = massOfData.valid;
// ['email']
// ['password']

let accesConsolelInvalid = massOfData.invalid;
// ['email']
// ['password']

//////////////////////////////////////////////////////////////////////////////////////////////////
//GERAL /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://dock-console.dev.caradhras.io/');
});

test.afterEach(async ({ page }, testInfo) => {
  await page.close();
});

//////////////////////////////////////////////////////////////////////////////////////////////////
//LOGIN /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


test('Login correto no console', async ({ page }) => {

  await expect(page.locator('text=Hello, nice to see you here!')).toBeVisible();

  accesConsolelValid.forEach(async element => {
    // console.log(element);

    page.locator(locatorEmailConsole).click();
    page.locator(locatorEmailConsole).fill(element.email);

    page.locator(locatorPasswordConsole).click();
    page.locator(locatorPasswordConsole).fill(element.password);

    page.locator(accesLoginConsole).click();
  });

});

////////////////////////////////////////////////////////////////////////////////////////////////

test('Login incorreto no console', async ({ page }) => {

  await expect(page.locator('text=Hello, nice to see you here!')).toBeVisible();

  accesConsolelInvalid.forEach(async element => {
    // console.log(element);

    page.locator(locatorEmailConsole).click();

    page.locator(locatorEmailConsole).fill(element.email);
    page.locator(locatorPasswordConsole).click();
    page.locator(locatorPasswordConsole).fill(element.password);

    page.locator(accesLoginConsole).click();

    expect(page.locator(errorLoginConsole)).toBeVisible();

  });

});

//////////////////////////////////////////////////////////////////////////////////////////////////
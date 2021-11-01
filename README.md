# autotrader-testing-framework

IDE - Visual Studio Code 

Pre-requisites - 
1. Download Node Js in Local Machine
2. Download Visual Studio Code 

How to Setup Framework - 
1. Pull the framework from github via Visual Studio Code 
2. Open new Terminal 
3. run cmd - 'npm init' (To create package.json file)
4. run cmd - 'npm install --save-dev cypress@8.4.1' (To install cypress)
5. run cmd - 'npm install -g npm@8.1.2' (to install latest version of npm)


How To Run - 
Via - Cypress Test Runner 
1. run cmd - './node_modules/.bin/cypress open'
2. The above command will open the cypress test runner
3. Select the browser type from dropbox located at the top right hand corner (Selector Electron Browser since it runs      faster)
4. You should see "search-for_cars.js" file in the test runner
5. Click on the file to start runner the test 
6. test execution starts in a seperate runner window 

Via - Terminal 
1. Open Terminal 
2. run command - './node_modules/.bim/cypress run' (This will tigger your entire test suite in headless mode)
3. run command - './node_modules/.bin/cypress run --headed (This will tigger your entire test suite in headed mode)


Autotrader Search Testing Optimisation and Expansion Ideas - 

Test Optimisation - 
1. Use of Alias to make code more readable 
2. Use of Data Tables inorder to pass different filters rather than hardcoded as in this example 
3. Use of better reporting tools like Mochawesome Reporting 
4. Use of CI Tools likes of Jenkins 
5. Resuability of Code by using beforeEach()

Test Expansion - 
1. Use Page Object Models to improve Framework 
2. Negative Testing for all Webelements 
3. Use Boundary Values analysis to apply filters 
4. Robost selectors (css, xpath) in case of change in webelements 
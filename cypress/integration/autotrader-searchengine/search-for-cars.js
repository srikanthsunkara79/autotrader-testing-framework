/// < reference types = "Cypress " />

const { stringify } = require("querystring");

describe("Check for Cars in Autotrader", () => {
    
    // Basic Filter Specs - 
    //      Make - 'Honda', Model - 'Civic', Postcode - 'CH2 3JQ', 
    //      Cash, Min Price - '1000', Max Price - '2000'
    it("Check for Honda Civic Cars with initial Basic Filters applied", () => {
        cy.visit("https://www.autotrader.co.uk/");


        // Provide Postcode 
        cy.get('#postcode').type('CH23JQ');

        // Select Distance
        cy.get('#distance').select('100', { force : true});

        // Select Make 
        cy.get("#make").select('Honda', {force : true}).should('have.value', 'Honda');

        // Select Model
        cy.get('#model').select('Civic', {force : true}).should('have.value', 'Civic');

        // Select Cash with Max(2000) and Min(1000) Price filters set
        cy.get('#price-type-0').should('be.checked');
        cy.get('#minPrice').select([3], {force : true}).should('have.value', '1000');
        cy.get('#maxPrice').select([4], {force : true}).should('have.value', '2000');

        // Get Search Result by clicking Search button 
        cy.get('.atds-button--primary').click();

        // Validate Make and Model with filters
        cy.get("ul[class='search-page__products']").children().first().click();
        cy.get('aside').should('contain', 'Honda Civic');
        
        // Validate Price with Min & Max Price 
        cy.get('[data-testid=advert-price]').then(($val) => {
            cy.log($val.text());
            var initialPrice = $val.text();
            var priceInString = initialPrice.replace('£','');
            priceInString = priceInString.replace(',','');
            const price = Number(priceInString);
            expect(price).to.be.lessThan(2001);
            expect(price).to.be.greaterThan(999);
        });
    });

    // Basic Filters - 
    //      Postcode - 'CH23JQ'
    //      Model - 'Fiat'
    // Filters After Search Result - 
    //      Distance - Within 100 Miles
    //      Min Price - 3000
    //      Milage < 70000
    //      Fuel Type - Petrol 
    it("Search Fiat cars and apply filters after search results", () => {
        cy.visit("https://www.autotrader.co.uk/");
        cy.reload();

        // Provide Postcode 
        cy.get('#postcode').clear();
        cy.get('#postcode').type('CH23JQ');

        // Select Make 
        cy.get("#make").select('Fiat', {force : true}).should('have.value', 'Fiat');

        // Get Search Result by clicking Search button 
        cy.get('.atds-button--primary').click();

        // Adding Distance - 100 Miles Filter
        cy.get("[name='radius']").select('100', { force : true}).should('contain', 'Within 100 miles');


        // Select Min Price - 1000
        cy.get('#price-from').select('1000', { force : true});

        // Select Milage - 70000
        cy.get('#mileageid > .options-button__inner').click()
        .then( () => {
            cy.get('#maximum-mileage').select('70000', {force:true}).should('have.value', '70000');
        })

        // Select Fuel Type - Petrol
        cy.get("[data-button-for='fuel-type']").click();
        cy.get(':nth-child(11) > .flyout-menu > .flyout > .sf-flyout__scrollable-options > .sf-flyout__options > :nth-child(3) > .at-field__selection > .at-field__input').click();

        // Validate Results with Filters 
        // Validate selected Cars Make 
        cy.get("ul[class='search-page__products']").children().first().click();
        cy.get('aside').should('contain', 'Fiat');

        // Validate selected Cars Min Price 
        cy.get('[data-testid=advert-price]').then(($val) => {
            cy.log($val.text());
            var initialPrice = $val.text();
            var priceInString = initialPrice.replace('£','');
            priceInString = priceInString.replace(',','');
            const price = Number(priceInString);
            expect(price).to.be.greaterThan(1000);
        });

        // Validate Fuel Type 
        cy.get('.sc-efQSVx > :nth-child(4)').then(($val) => {
            expect($val.text()).to.contain('Petrol');
        })

    })
})
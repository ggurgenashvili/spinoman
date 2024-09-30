describe('Admin Panel Authentication Tests', () => {

    beforeEach(() => {
        // Set up intercepts for login and dashboard redirection
        cy.intercept('GET', '**/oauth2/login**').as('loginPage');
        cy.intercept('GET', '**/apps/bo/dashboard**').as('dashboardRedirect');
    });

    it.only('should successfully log in and redirect to the dashboard', () => {
        // Visit the login page with the redirect parameter
        cy.visit('https://dev-bo.spinoman.com/oauth2/login?successful_auth_redirect=https://dev-bo.spinoman.com/apps/bo/dashboard');

        // Wait for the login page to load
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200);

        // Enter valid username and password
        cy.get('[name="username"]').type('superuser');
        cy.get('[name="password"]').type('superuser');

        // Click the submit button to log in
        cy.get('button[type="submit"]').click();

        // Wait for the successful redirect to the dashboard
        cy.wait('@dashboardRedirect').its('response.statusCode').should('eq', 200);

        // Verify that the URL includes '/dashboard' after successful login
        cy.url().should('include', '/dashboard');

        // Check that the dashboard content is visible
        cy.contains('Dashboard').should('be.visible');
    });

    it('should display an error with incorrect login credentials', () => {
        // Visit the login page
        cy.visit('https://dev-bo.spinoman.com/oauth2/login?successful_auth_redirect=https://dev-bo.spinoman.com/apps/bo/dashboard');

        // Enter invalid username and password
        cy.get('[name="username"]').type('wronguser');
        cy.get('[name="password"]').type('wrongpassword');

        // Click the submit button to attempt login
        cy.get('button[type="submit"]').click();

        // Check for an error message indicating failed login
        cy.contains('Invalid username or password').should('be.visible');

        // Ensure that the URL does not include '/dashboard' (i.e., login failed)
        cy.url().should('not.include', '/dashboard');
    });

    it('should not allow access to the dashboard without login', () => {
        // Attempt to directly visit the dashboard URL without logging in
        cy.visit('https://dev-bo.spinoman.com/apps/bo/dashboard', { failOnStatusCode: false });

        // Check that the user is redirected to the login page or gets an unauthorized access message
        cy.url().should('include', '/oauth2/login');
        cy.contains('Login').should('be.visible');
    });

});

describe('Create blog with API', () => {
    it('create blog', () => {
        // Set the necessary cookies for authentication
        cy.setCookie('dev-auth', 'YjY1N2UyNTEyZGE2NDBlNWE4NWQyNzFlNzE4NDY1ZTQ4NGZiYzhhM2U3YjU0YjUxODA5NjkyODg3YTc3MjFkNw==');  // Replace with your actual cookie name and value
        cy.setCookie('dev-bo-gw', '96173c5361a04481b0c2b4eef7aa98ed31e3a5c1ff744ab8a8ba3c044aaf450f');  // Replace with your actual cookie name and value
        // cy.setCookie('dev-spinoman', '5fb358b2e31444e8a11ffe7e3dd698b3885fb26382b04937bd8f3deb91e390ad');  // Replace with your actual cookie name and value

        cy.request('https://dev-bo.spinoman.com/back-office/content/api/bo/blogs')
        cy.request('POST', 'https://dev-bo.spinoman.com/back-office/content/api/bo/blogs', {
            "title": "newblog",
            "media": "giosblog",
            "shortDescription": "",
            "content": "product01",
            "publicationDate": "2024-09-19T06:37:17.575Z",
            "categoryIds": [

            ],
            "visibility": "NOT_PUBLISHED"
        }).then(
            (response) => {
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('name', 'Jane') // true
            }
        )
    });
});

function createBlog(title, media, content, publicationDate, categoryIds = [], visibility = "NOT_PUBLISHED") {
    return cy.request({
        method: 'POST',
        url: 'https://dev-bo.spinoman.com/back-office/content/api/bo/blogs',
        body: {
            title: title,
            media: media,
            shortDescription: "",
            content: content,
            publicationDate: publicationDate,
            categoryIds: categoryIds,
            visibility: visibility
        }
    }).then((response) => {
        // Validate the response
        expect(response.status).to.eq(201); // Check if the response status code is 201 (Created)
        return response; // Return the response for further chaining if needed
    });
}

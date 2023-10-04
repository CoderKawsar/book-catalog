### Live Link: https://musical-puffpuff-75dfc3.netlify.app/

A simple and clean landing page for a book catalog system using React and redux . The landing have a header, a list of the top 10 recently added books and a footer. Open Routes such are "All Books", "Sign In", and "Sign Up".

### Login Page and Registration Page: ( Firebase authentication)

A way for users to create new accounts with a unique email and password. Also, there is a way for users to log in using their credentials(Email, password sign in, or google sign in). After a successful login, the login button is replaced with a logout button in the navbar. There is a way for users to securely log out of the application.

### All Books Page

- Fetched a list of books from an API using RTK Query and Displayed the list of books (Book Card). Each book displays key information such as

  - Title
  - Author
  - Genre
  - Publication Date

- There is a search bar on top that allows users to search for books based on criteria such as title, author, or genre.

- Filtering options in the side of the search bar to narrow down the book list based on genre & publication year.

- Search and filtering operations are efficient and provide accurate results.

- Implemented an "Add New" Button to navigate to the "add-new-book" page to add a new book. You can also add "Add New Book" as a navigation menu for authenticated users.

### Add New Book Page

Authenticated users can add a new book by filling out a form. After submitting the form, the user will be notified of the success or failure of the operation with a toast or other notification.

### Book Details Page

When a user clicks on a book from the list, displays a detailed view of the book. The detailed view includes the following information:

- **Title**
- **Author**
- **Genre**
- **Publication Date**
- **Reviews**

The reviews are displayed on the book details page.

**Two buttons to the book details page:**

- Edit Button
- Delete Button

When a user clicks on the **Edit Book** button, they are redirected to the **edit-book** page. When a user clicks on the **Delete Book** button, they see a confirmation dialogue to confirm that they want to delete the book. The can only edit or delete the book, if only they created/added the book.

**Authenticated users are able to leave reviews for books.** Implemented a submit box for submitting a review.

### Edit Books Page:

Authenticate users can edit a book using a form. The form have current data when editing. After submitting the form, the user are notified using a toast. If there is any issue, the user is also be notified by error message.

## Bonus Part :

Implemented a wishlist feature where users can add books they want to read in the future. Users can also create a list of books they are currently reading or plan to read soon. Provided options to mark books as finished reading. The are present in the book details page above the reviews portion.

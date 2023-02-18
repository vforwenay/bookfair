**Description:**

It is a bookfair application, where multiple sellers can register themselves & sell books. Buyers can register themselves and browse sellers & books. Buyers can also create a cart (limited to one seller) & order the books. The order will be visible to the buyer. 

**To Run the Frontend**
``npm install``
``npm start``

**To Run the Backend**
``npm install``
``nodemon index.js``

**To Run the Prisma Migrations**
``npx prisma migrate dev --name init``

**To Seed the Database**
``npx prisma db seed``

**To see the models**
``npx prisma studio``

**Task details:**

- Seller module
    - Seller can create account(name, email, no password)
    - Seller can create shop(name)
    - Seller can create books(name, stock count, image(optional))
    - Seller can view created books(name, stock count)
    - Seller can see orders (consisting books from their shop only, because buyer can create order consisting books of many shops)

- Buyer module
    - Buyer can create account(simply name & email is enough, no need for password)
    - Buyer can view shops(name, seller name)
    - Buyer can view books in a shop
    - Buyer can create order consisting of books from one shop only

- Notes
    - There can be many books in an order. But, each book count will be 1 by default.

- WebApplicationRoutes
    - [bookfair.com/seller](http://bookfair.com/seller(This)
        - This will show Signup & Login buttons
    - [bookfair.com/seller/new](http://bookfair.com/seller/new)
        - Seller signup page
    - [bookfair.com/seller/login](http://bookfair.com/seller/login)
        - Seller login page
    - [bookfair.com/seller/:sellerId](http://bookfair.com/seller/:sellerId)
        - Seller home
        - Displays the seller profile
        - Links to view books, orders
    - bookfair.com/seller/:sellerId/books
        - Lists all the books of the seller
        - There will be an option to create new book
    - bookfair.com/seller/:sellerId/books/new
        - Allows to create a new book with name & count
    - bookfair.com/seller/:sellerId/orders
        - Displays all the orders
    - [bookfair.com/buyer](http://bookfair.com/buyer(This)
        - will show Signup & Login buttons for Buyer
    - bookfair.com/buyer/new
        - Buyer signup form
    - bookfair.com/buyer/login
        - Buyer login form
    - bookfair.com/buyer/:buyerId
        - Displays buyer profile
        - Links to orders will be present
    - bookfair.com/sellers
        - Buyer can see all the sellers
    - bookfair.com/sellers/:sellerId
        - Buyer can see seller profile, but not the orders, etc which are private to seller
    - bookfair.com/sellers/:sellerId/books
        - Buyer can see all the books of a seller
        - Buyer can add books into cart
    - bookfair.com/buyer/:buyerId/cart
        - Displays the added books with name, seller name
        - If no books are present, display appropriate message
        - Allows the buyer to create the order
- Tools
    - Client side
        - React, Angular, or any. Webpack, Redom/JavaScript, HTML, CSS (any css libraries of choice)
    - Server side
        - Node.js, Postgres.
    - Hosting
        - Heroku, Glitch, Vercel, etc.
    

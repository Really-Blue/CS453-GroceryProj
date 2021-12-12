# CS453-GroceryProj
A senior project aimed at building a web application using node and express js.

*Important items:
This Project requires 2 event listeners, ES6 class style, one GET and one POST method (at least one), and usage of a NOSQL database. 
-Our project features multiple event listeners in the form of buttons for searches and creations.
-The javascript has been formatted to follow the ES6 style for all js files (save for at the moment app.js and main.js which will be removed).
-Our project features two GET methods and 1 POST method (the POST method was reused for two similar functions of the application) all found on "server.js".
-We used Node.js to communicate with our NOSQL database Mongodb, the total tech stack used was Mongodb, Express and Node.js
-Front End was done with JS and HTML/CSS while backend was with Node.js, Express and Mongodb

*To Run:
This project should have all the necessary files and dependencies ready for the user.
-Necessary items: Node(version:v16.13.1) and Mongodb (version:5.0.4)
1. Firstly clone the project to your machine.
2. Users will then open the project and run npm install to make use of package.json (to install dependencies).
3. Users will then have to make a choice of one of two options:
-In "server.js" there is a function named populateFoodData() that when ran will create a collection (within the created database grocery when running the program) titled "groceryItems" and fill it with supplicant data. If this choice is made then users will need to add a call to this function in the startDBandServer() function in "server.js" and after running the project remove it or comment it out.
-Otherwise users will need to create a database "grocery" and collection "groceryItems" to use the food.json file to import the data in using the command "mongoimport --db grocery --collection groceryItems --file food.json --jsonArray".
4. Now that the data is setup users will need to run the command "mongod -dbpath data/db" or wherever your dbpath is setup as (if not already done look into setting up mongodb).
5. Users can then run "node server" in the location of the project in a terminal and if able to connect to mongodb and localhost port 3000 will be able to access the application.
6. The application link is "http://localhost:3000/" first time users will need to create an account (try not to use any actual passwords) and then return to the landing page to login and progress into the grocery list side.
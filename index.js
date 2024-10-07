const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const errorHandlingMiddleware = require('./errorHandlerMiddleware');


app.use(express.json());


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  // Return the home.html file to the client
  res.sendFile(path.join(__dirname, 'home.html'));
  // res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  //res.send('This is profile router');
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    // Parse the JSON data and send it as a response
    res.json(JSON.parse(data));
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: false, message: 'Username or password missing' });
  }

  // Read data from user.json file
  const user = require('./user.json');

  if (username === user.username && password === user.password) {
    res.json({ status: true, message: 'User Is valid' });
  } else if (username !== user.username) {
    res.json({ status: false, message: 'User Name is invalid' });
  } else if (password !== user.password) {
    res.json({ status: false, message: 'Password is invalid' });
  }
});



/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username; // Get the username from the URL parameter
  res.send(`<b>${username} successfully logged out.</b>`); // Send the HTML response
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use(errorHandlingMiddleware);

// Export router so it can be used in the main app file
module.exports = router;

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
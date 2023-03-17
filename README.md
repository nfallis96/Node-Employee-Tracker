# Employee Tracker

GitHub Repo: https://github.com/nfallis96/Node-Employee-Tracker

## Table of Contents
* [Description](#description)
* [Demo](#demo)
* [Code Examples](#code-examples)
* [Technologies Used](#technologies-used)
* [License](#license)


## Description

The purpose of this project was to create a 


## Demo

demo pending because mysql password doesn't work.


## Code Examples

This example shows the code that is required to run the applicatioon

```js

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "etracker_db"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    startPrompt();
});

```


## Technologies Used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-red)
![Mysql Badge](https://img.shields.io/badge/Database-MySql-pink)
![Node.js Badge](https://img.shields.io/badge/Environment-Node.js-blue)
![inquirer Badge](https://img.shields.io/badge/NPM-Inquirer-yellow)
![Ctable Badge](https://img.shields.io/badge/NPM-ConsoleTable-green)
![License Badge](https://img.shields.io/badge/License-MIT-purple)


## License

MIT License

Copyright (c) 2023 Nicole Fallis 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 
# Limitations

    MAX / MIN 999999999999999 

    Handles negative numbers

    Handles decimals(floats) and intergers

# Important Dev Pre-req

Make sure to install Node.JS & npm

# For Developers

## Install NPM packages and deps
     npm install

## Node Packages used 

    "express":  Our Server

    "mocha": Test framework

    "supertest": Test framework


```
    {
    "name": "simpleapi",
    "version": "1.0.0",
    "description": "Get request handling",
    "main": "index.js",
    "scripts": {
        "test": "mocha server/tests/apiTest.js --exit",
        "start": "node server/index.js"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/alphabin/simpleAPI.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/alphabin/simpleAPI/issues"
    },
    "homepage": "",
    "dependencies": {
        "body-parser": "^1.19.0",
        "express": "^4.17.1",
        "mocha": "^7.1.1",
        "supertest": "^4.0.2"
    }
    }
```
## RestAPI Routes

RestAPI routes are defined here

[GETRoutes](https://github.com/alphabin/simpleAPI/blob/master/server/routes/appRoutes.js)

Routes controller are defined here

[Controllers](https://github.com/alphabin/simpleAPI/blob/master/server/controller/apiController.js)

Helper Class of `NumberConver` does the heavy lifiting for logic

[NumberConverter](https://github.com/alphabin/simpleAPI/blob/master/server/controller/utility/utility.js

## Run tests
     npm run test

These tests are located in

    server/tests/apiTest.js
    [a link](https://github.com/alphabin/simpleAPI/blob/master/server/tests/apiTest.js)

Example Results as such

    > mocha server/tests/apiTest.js

    Example app listening at http://localhost:3000


    GET /num_to_english?number=0
        ✓ Non secure test 

    GET /num_to_english?number=0
        ✓ Non secure test 

    GET /num_to_english?number=1
        ✓ Non secure test 

    GET /num_to_english?number=10
        ✓ Non secure test 

    GET /num_to_english?number=15
        ✓ Non secure test 

    GET /num_to_english?number=12345678
        ✓ Non secure test 

    GET /num_to_english?number=
        ✓ Non secure test 

    GET /num_to_english?number=-15
        ✓ Non secure test 

    GET /num_to_english?number=-29
        ✓ Non secure test 

    GET /num_to_english?number=-1000.41
        ✓ Non secure test 

    GET /num_to_english_secure?number=11
        ✓ Secure test

    GET /num_to_english_secure?number=21
        ✓ Secure test

    GET /num_to_english_secure?number=15
        ✓ Secure test

    GET /num_to_english_secure?number=12345678
        ✓ Secure test

    GET /num_to_english_secure?number=
        ✓ Secure test

    GET /num_to_english_secure?number=-11
        ✓ Secure test

    GET /num_to_english_secure?number=-21
        ✓ Secure test

    GET /num_to_english_secure?number=-222.31
        ✓ Secure test

    GET /num_to_english_secure?number=-222.31
        ✓ Secure test


    19 passing (65ms)
## Run the app
     npm run start

App runs on port 3000

### Request

`GET /num_to_english?number=`

Example Request

    curl -i -H 'Accept: application/json' http://localhost:3000/num_to_english?number=1

Example Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 38
    ETag: W/"26-ms/ATm7s5tQ43SdWo4gzaLcLV6c"
    Date: Wed, 15 Apr 2020 08:45:06 GMT
    Connection: keep-alive

    {"status":"ok","num_in_english":"one"}

### Secure Request

`GET /num_to_english_secure?number=&apiKey=`

Important difference is the apiKey param, we can use any one the following as a key for the demo

    //Simulates a database records of valid keys, in realife we would be dynamic collection like mongo 
    const keyStore = ["12345","45689","667788"]

Ideally these are given through a login like JWT proccess where its verified , , refreshed and expired dynamically.


Example Request

    curl -sS -i -H 'Accept: application/json' http://localhost:3000/num_to_english_secure?number=100\&apiKey=12345

Example Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 46
    ETag: W/"2e-cGqp/+3kw/rjrYBqDBK1Kz8b6i8"
    Date: Wed, 15 Apr 2020 08:53:18 GMT
    Connection: keep-alive

    {"status":"ok","num_in_english":"one hundred"}

## CI / CD Pipeline

When a merge request is completed into master Github actions

The workflow of the CI/CD pipeline is defined

[CI/CD Script](https://github.com/alphabin/simpleAPI/blob/master/.github/workflows/nodejs.yml)

Visit to see all the jobs so far and status, this dashboard is critical for automation of the app 

[CI/CDDashboard](https://github.com/alphabin/simpleAPI/actions?query=workflow%3A%22Node+Github+CI%22)

Triggers the test cases and if all the test cases pass, then pushes the latest code to our production simpleAPI site and Deploys it
    
    198.199.85.83

Example request on Prod on a Browser

    http://198.199.85.83:3000/num_to_english?number=1

    http://198.199.85.83:3000/num_to_english_secure?number=100\&apiKey=12345

Example request through CURL

    curl -i -H 'Accept: application/json' http://198.199.85.83:3000/num_to_english?number=100

    curl -sS -i -H 'Accept: application/json'   http://198.199.85.83:3000/num_to_english_secure?number=100\&apiKey=12345

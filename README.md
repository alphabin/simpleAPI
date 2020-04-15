 

# Important Dev prereq

Make sure to install Node.JS & npm

# For Developers 
## Install NPM packages and deps
     npm install
     
## Run tests
     npm run test


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
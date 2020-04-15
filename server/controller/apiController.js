
const numberHelper = require('./utility/utility');


//Simulates a database records of valid keys, in realife we would be dynamic collection like mongo 
const keyStore = ["12345","45689","667788"]

function returnMessage(status,english)
{
  return  {
       status: status,
        num_in_english: english
    }
}


function validateApiKey(key){
    if(keyStore.includes(key))
    {
        return true
    }

    return false;
}


//---Main functions
function GetEnglish(req,res)
{
    res.set('Content-Type', 'application/json');

    var number = parseFloat(req.query.number);
     
    if(numberHelper.isValidInput(number))
    {
      res.status(200).json(new returnMessage("ok",numberHelper.convertToString(number)))
   
    }
    else
    {
      res.status(422).json(new returnMessage("fail",""))
    }


}

function GetSecureEnglish(req,res)
{
    res.set('Content-Type', 'application/json');

    var number = parseFloat(req.query.number)
    var apiKey = req.query.apiKey

    if(numberHelper.isValidInput(number) && validateApiKey(apiKey))
    {
        res.status(200).json(new returnMessage("ok",numberHelper.convertToString(number)))

    }
    else
    {
        res.status(422).json(new returnMessage("fail",""))
    }

}

module.exports = {
    getNumEnglish(req,res)
   {
      GetEnglish(req,res);
   },

   getSecureNumEnglish(req,res)
   {
       GetSecureEnglish(req,res);
   }
}
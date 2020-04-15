class NumberConver {

    constructor() {
        this.ones = ['', ' one', ' two', ' three', ' four', ' five', ' six', ' seven', ' eight', ' nine', ' ten', ' eleven', ' twelve', ' thirteen', ' fourteen', ' fifteen', ' sixteen', ' seventeen', ' eighteen', ' nineteen'];
        this.tens = ['', '', ' twenty', ' thirty', ' forty', ' fifty', ' sixty', ' seventy', ' eighty', ' ninety', ' hundred'];
        this.th = ['', ' thousand', ' million', ' billion', ' trillion'];

    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    isValidInput(input) {
        if (input || input == 0) //checks for null,undefined,or empty
        {

            if ((this.isNumeric(input) || input == 0 )) {
                if(Math.abs(input) < 1000000000000000) //MAX / MAX 999999999999999
                    return true
            }

        }



        return false;
    }

    convertToString(number) {
        let word = ""
        if (number == 0) {
            return "zero"
        }


        //valid float
        if (number.toString().includes(".")) {
            if (number.toString().split(".").length == 1) {
                return " point" + this.convertToString(number.toString().split(".")[0])
            }
            else if (number.toString().split(".").length == 2) {
                if(number.toString().includes("-0."))
                {
                    return "negative point " + this.convertToString(number.toString().split(".")[1])
                }
                else
                    return this.convertToString(number.toString().split(".")[0])+ " point " + this.convertToString(number.toString().split(".")[1])
            }
        }
        //valid integer (positive or negative)

        if (number < 0) {
            return "negative " + this.convertToString(Math.abs(number))
        }


        //Coverage to up to trillion
        for (let i = 0; i < this.th.length; i++) {
            let tempNumber = number % (100 * Math.pow(1000, i));
            let remainder =  Math.floor(tempNumber / Math.pow(1000, i))
            if (remainder !== 0) {
                if (remainder < 20) {
                    word = this.ones[remainder] + this.th[i] + word;
                } else {
                    word = this.tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + this.ones[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + this.th[i] + word;
                }
            }
            else{
                if(Math.floor(number / (100 * Math.pow(1000, i))) == 1)
                {
                    if(number >= 100000000000000 )
                    {
                        word  = " trillion" + word 
                    }
                    else if(number >= 100000000000 )
                    {
                        word  = " billion" + word 
                    }
                    else if(number >= 100000000 )
                        word  = " millilon" + word 
                    else if(number >= 100000 )
                        word  = " thousand" + word 
                }
            }
           
            tempNumber = number % (Math.pow(1000, i + 1));

            

            if (Math.floor(tempNumber / (10 * Math.pow(1000, i))) !== 0)
            { 
               
           
                    word = this.ones[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + (this.ones[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] == ""?"":' hundred') + word;
                
            }

        }

      
        //special case negative zero
        if(word.trim() == "negative zero")
            word = "zero"

        return word.trim();
    }



}


module.exports = new NumberConver()
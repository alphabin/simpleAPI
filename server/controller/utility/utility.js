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

            if (this.isNumeric(input)) {
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
            let remainder = Math.floor(tempNumber / Math.pow(1000, i))
            if (remainder !== 0) {
                if (remainder < 20) {
                    word = this.ones[remainder] + this.th[i] + word;
                } else {
                    word = this.tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + this.ones[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + this.th[i] + word;
                }
            }

            tempNumber = number % (Math.pow(1000, i + 1));

            if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
                word = this.ones[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + ' hundred' + word;
        }


        return word.trim();
    }



}


module.exports = new NumberConver()
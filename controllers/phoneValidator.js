
module.exports = {
    phoneValidation: function (number) {
        console.log(number)
        let str = number;
        let splitStr = [];
        let splitStrTwo = [];
        let splitStrThree = [];
        let valid = false;

        // Splits the string once
        splitCheck = (str) => {
            if (str.indexOf(" ") >= 0) {
                splitStr = str.split(" ")
                console.log('splitStr: ' + splitStr)
                splitCheckTwo(splitStr)
            } else if (str.indexOf(".") >= 0) {
                splitStr = str.split(".")
                console.log('splitStr: ' + splitStr)
                splitCheckTwo(splitStr)
            } else if (str.indexOf("/") >= 0) {
                splitStr = str.split("/")
                console.log('splitStr: ' + splitStr)
                splitCheckTwo(splitStr)
            } else if (str.indexOf("-") >= 0) {
                splitStr = str.split("-")
                console.log('splitStr: ' + splitStr)
                splitCheckTwo(splitStr)
            } else if (str.indexOf(" ") === -1) {
                splitStr = str.split("")
                console.log('splitStr: ' + splitStr)
                validateNum(splitStr)
            }

        }

        //Splits the string a second time in each of its array indeces and checks for 
        splitCheckTwo = (splitStr) => {
            for (let i = 0; i < splitStr.length; i++) {
                if (splitStr[i].indexOf(" ") >= 0) {
                    let res = splitStr[i].split(" ")
                    for (let j = 0; j < res.length; j++) {
                        splitStrTwo.push(res[j])
                    }
                } else if (splitStr[i].indexOf(".") >= 0) {
                    let res = splitStr[i].split(".")
                    for (let j = 0; j < res.length; j++) {
                        splitStrTwo.push(res[j])
                    }
                } else if (splitStr[i].indexOf("/") >= 0) {
                    let res = splitStr[i].split("/")
                    for (let j = 0; j < res.length; j++) {
                        splitStrTwo.push(res[j])
                    }
                } else if (splitStr[i].indexOf("-") >= 0) {
                    let res = splitStr[i].split("-")
                    for (let j = 0; j < res.length; j++) {
                        splitStrTwo.push(res[j])
                    }
                } else {
                    splitStrTwo.push(splitStr[i])
                }
                console.log("splitStringTwo[" + i + "]: " + splitStrTwo[i])
            }
            console.log("splitStringTwo: " + splitStrTwo)
            splitFinal(splitStrTwo);
        }

        splitFinal = (splitStrTwo) => {
            for (let m = 0; m < splitStrTwo.length; m++) {
                let res = splitStrTwo[m].split("")
                for (let n = 0; n < res.length; n++) {
                    splitStrThree.push(res[n])
                    console.log("splitStringThree" + n + ": " + splitStrThree[n])
                }
            }
            console.log("splitStringThree: " + splitStrThree)
            validateNum(splitStrThree);
        }

        validateNum = (splitStrThree) => {
            // create separate array to check for NaNs
            console.log("validateNum running")
            let validArr = [];

            for (let k = 0; k < splitStrThree.length; k++) {
                console.log(splitStrThree[k])
                let res = parseInt(splitStrThree[k]);
                console.log("parsed string: " + res)
                validArr.push(res);
            }
            console.log("valid array: " + validArr)

            for (let l = 0; l < validArr.length; l++) {
                if (validArr[l] == 0) {
                    valid = true
                    console.log("All good!")
                } else if (validArr[l]) {
                    valid = true
                    console.log("All good!")
                } else {
                    console.log("Bad entry")
                    valid = false
                }
                console.log(valid)
            }
            // if (!valid) {
            //     alert("Please check the format of your phone number. Try " +
            //         "writing the number with no spaces or characters (i.e. '( )', '-', etc.).")
            // }
        }

        splitCheck(str);

        return valid;
    }
}


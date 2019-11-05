const firstNumber  = document.getElementById('first-number')
const secondNumber = document.getElementById('second-number')
const resulScreen = document.getElementById('result-screen')

const sumOfOneNumber = (ten, number, anotherNumber)=>{
    let sum = parseInt(number) + parseInt(anotherNumber)
    if (ten) {
        sum += 1
    }
    return [sum, ten]
}

const shouldKeepAddingUp = (numberEvaluated)=>{
    parseInt(numberEvaluated)
    let should = false
    if(numberEvaluated >= 10){
        numberEvaluated -= 10
        should = true
    }
    return [numberEvaluated, should]
}

const sumOfAllNumbers = (biggerOrEqualArray, shorterOrEqualArray) =>{
    let keepAddingUp = false
    let ten = false
    let counter = 0
        ultimateArray = biggerOrEqualArray.map((number, index) =>{
            number = parseInt(number)
            let sumArray = []
            if(counter < shorterOrEqualArray.length){
                sumArray = sumOfOneNumber(ten, number, shorterOrEqualArray[counter])
                counter += 1
                ten = sumArray[1]
            } else {
                if(ten){
                    number += 1
                }
                sumArray = [number, ten]
            }

            let sumEvaluated = shouldKeepAddingUp(sumArray[0])
            ten = sumEvaluated[1]

            keepAddingUp = sumEvaluated[1] || sumArray[1] || counter <= shorterOrEqualArray.length
            
            if(keepAddingUp){
                if(index + 1 < biggerOrEqualArray.length){
                    return sumEvaluated[0]
                } else {
                    if(ten){
                        return sumEvaluated[0] + 10
                    } else {
                        return sumEvaluated[0]
                    }
                }
            } else {
                return number
            }
        }
    )
    return ultimateArray
}

const sumOfBigNumbers = (firstNumberInverted, secondNumberInverted) => {
    let ultimateArray = []
    if(firstNumberInverted.length >= secondNumberInverted.length){
        ultimateArray = sumOfAllNumbers(firstNumberInverted, secondNumberInverted)
    } else if (secondNumberInverted.length > firstNumberInverted.length) {
        ultimateArray = sumOfAllNumbers(secondNumberInverted, firstNumberInverted)
    }

    return ultimateArray.reverse();
}

const actionButton = ()=>{
    
    const firstNumberInverted = [...firstNumber.value].reverse()
    const secondNumberInverted = [...secondNumber.value].reverse()
    const result = sumOfBigNumbers(firstNumberInverted, secondNumberInverted)

    resulScreen.innerText = result.join("")
}
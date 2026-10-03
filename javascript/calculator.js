const billAmount = 50.00
const tipPercentage = 15

const tipAmount = (billAmount * tipPercentage)/100
const finalBill = billAmount + tipAmount

console.log(`Original Bill: ${billAmount}`);
console.log(`Tip ${tipPercentage}% is: ${tipAmount}`);
console.log(`Final Bill: ${finalBill}`);

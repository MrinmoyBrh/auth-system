const customerAge = 22
const isStudent=true
let ticketPrice = 15

if (customerAge <12 || customerAge>=65){
    ticketPrice = 8
    console.log("Applied age Discount.");

}else if(isStudent &&customerAge<=25){
    ticketPrice = 10
    console.log("Applied student Discount.");
}else{
    ticketPrice = 15
    console.log("Standard Adult Ticket.");
}

// console.log(`Customer age: ${customerAge}`);
// console.log(`Final Ticket price: ${ticketPrice}`);

const fruit = ["Apple", "Banana", "Cherry" ]

for(const item of fruit){
    console.log(item);
}
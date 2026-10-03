//Terminal task manager

const tasks = [
    "Install nodejs",
    "Learn Variables",
    "Learn if/else",

];

tasks.push("Master Arrays and Loops");

console.log(`You have ${tasks.length} tasks for today:\n`);

let taskNumber = 1

for(const task of tasks){
    console.log(`${taskNumber}. [ ] ${task}`);
    taskNumber = taskNumber + 1
}
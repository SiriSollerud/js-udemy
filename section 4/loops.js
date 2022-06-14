//for loop
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}

//for-of loop --> executes for every element in an array
for (const iterator of object) {
    
}

//for-in loop --> execute for every key in an object
for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        
    }
}

let i = 0;
for (const logEntry of battleLog) {
    for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
    }
    i++;
}


// while loop
while (condition) {
    
}

//do-while loop
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 3);

//labled statement --> break or continue
let a = 0;
outerLoop: do {
    console.log('Outer: ', a);
    for (let p = 0; p < array.length; p++) {
        if (p === 3) {
            break outerLoop;
        }
        console.log('Inner: ', a)
        
    }
    a++;
} while (a < 3);
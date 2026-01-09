function await(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}


async function taskA() {
    await await (1000);
    console.log("Task A");
}

async function taskB() {
    await await (1000);
    console.log("Task B");
}   
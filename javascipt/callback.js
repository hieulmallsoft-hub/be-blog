function myFunction(param) {
    param('Hello, World!');
}


function myCallback(value) {
    console.log('Value: ' + value);
}

myFunction(myCallback);
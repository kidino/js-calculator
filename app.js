// calculator needs to capture 2 numbers. we need to know which
// number we are capturing either the first one or the second.
// we need to start capturing the second number after the user
// hit an operator key. we will use these STATUS_ constants to
// let us know which it is. no1 will store the first number and
// no2 will store the second number. later will do a mathematical
// operations with the selector operator.

let no1 = '0';
let no2 = '0';
let operator = '';

const STATUS_FIRST_NUMBER = 0;
const STATUS_SECOND_NUMBER = 1;
const STATUS_OPERATOR = 2;

// by default we are capturing the first number.
let current_status = STATUS_FIRST_NUMBER;

// using event delegation to capture for all buttons
document.getElementById('buttons').addEventListener(
    'click',
    function(e){
        let key = e.target.innerText;
        handleKey( key )
    }
);

function handleKey( key ) {

    switch(key) {
        // handling number buttons and the dot
        case '0' : 
        case '1' : 
        case '2' : 
        case '3' : 
        case '4' : 
        case '5' : 
        case '6' : 
        case '7' : 
        case '8' : 
        case '9' : 
        case '.' :
            handle_numbers(key);
            break;

        // handling operator buttons
        case '/':
        case '*':
        case '-':
        case '+':
            handle_operators(key);
            break;

        // handling the Cancel button
        case 'C':
            handle_cancel();
            break;

        // handling the equal button
        case '=':
            handle_calculate();
            break;
    }    

}

function handle_numbers(key) {

    // the dot can only be accepted once. we cannot add another dot
    // if there is already a dot.
    if((document.getElementById('display').innerText.indexOf('.') > -1)
    && (key == '.'))
     {
        return;
    }

    if(current_status == STATUS_FIRST_NUMBER) {
        // handling if user enters 0 multiple times. a number cannot start with
        // two zeros like 00. other we will append the number to the back.
        // currently it is a string, not an integer / float data yet.
        if(no1 == '0') {
            no1 = key;
        } else {
            no1 += key;
        }
        update_display(no1);
    } else if(current_status == STATUS_SECOND_NUMBER) {
        // handling if user enters 0 multiple times. a number cannot start with
        // two zeros like 00
        if(no2 == '0') {
            no2 = key;
        } else {
            no2 += key;
        }
        update_display(no2);
    } else { // current_status == OPERATOR
        current_status = STATUS_SECOND_NUMBER;
        no2 = key;
        update_display(no2);
    }
}

// when an operator button is pressed, we are ready to start
// capturing the second number into no2.
function handle_operators(key) {
    current_status = STATUS_SECOND_NUMBER;
    operator = key;
}

// cancel button -- resets everything to default
function handle_cancel() {
    current_status = STATUS_FIRST_NUMBER;
    update_display('0')
    no1 = '0';
    no2 = '0';
    operator = '';    
}

// equal button -- we will ca
function handle_calculate() {
    let result = 0;
    // parseFloat converts string to float number data type for
    // mathematical operation
    no1 = parseFloat(no1);
    no2 = parseFloat(no2);
    switch(operator) {
        case '/' : 
            result = no1 / no2;
            break;

        case '*' : 
            result = no1 * no2;
            break;

        case '-' : 
            result = no1 - no2;
            break;

        case '+' : 
            result = no1 + no2;
            break;        
    }

    handle_cancel();
    update_display(result)
}

// updates the display screen
function update_display( num ) {
    document.getElementById('display').innerText = num;
}

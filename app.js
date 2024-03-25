let no1 = '0';
let no2 = '0';
let operator = '';

const STATUS_FIRST_NUMBER = 0;
const STATUS_SECOND_NUMBER = 1;
const STATUS_OPERATOR = 2;

let current_status = STATUS_FIRST_NUMBER;

document.getElementById('buttons').addEventListener(
    'click',
    function(e){
        let key = e.target.innerText;
        handleKey( key )
    }
);

function handleKey( key ) {

    // document.getElementById('display').innerText 
    // += key;

    switch(key) {
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
        case '/':
        case '*':
        case '-':
        case '+':
            handle_operators(key);
            break;
        case 'C':
            handle_cancel();
            break;
        case '=':
            handle_calculate();
            break;
    }    

}

function handle_numbers(key) {

    if((document.getElementById('display').innerText.indexOf('.') > -1)
    && (key == '.'))
     {
        return;
    }

    if(current_status == STATUS_FIRST_NUMBER) {
        if(no1 == '0') {
            no1 = key;
        } else {
            no1 += key;
        }
        update_display(no1);
    } else if(current_status == STATUS_SECOND_NUMBER) {
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

function handle_operators(key) {
    current_status = STATUS_SECOND_NUMBER;
    operator = key;
}

function handle_cancel() {
    current_status = STATUS_FIRST_NUMBER;
    update_display('0')
    no1 = '0';
    no2 = '0';
    operator = '';    
}

function handle_calculate() {
    let result = 0;
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

function update_display( num ) {
    document.getElementById('display').innerText = num;
}
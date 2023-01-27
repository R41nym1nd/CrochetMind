'use strict';
//REGULAR RAISES
const ListOfPatterns = document.querySelector('.patterns'),
      start = document.querySelector('#start'),
      end = document.querySelector('#end'),
      eye = document.querySelector('#pattern-toggle-view'),
      btnHelp = document.querySelector('#pattern-help'),
      result = document.querySelector('.pattern-result'),
      btnGenerator = document.querySelector('.pattern-generator');

btnGenerator.addEventListener('click',() => {
    let startPoints = Number(start.value),
        endPoints = Number(end.value),
        patterns = ListOfPatterns.value;

    let pattern = ``;

    switch (patterns) {
        case 'spiral':
            pattern = getRegularPattern(startPoints, endPoints, 'spiral');
            break;
            case 'circle':
            pattern = getRegularPattern(startPoints, endPoints, 'circle');
            break;
        case 'square':
            pattern = getRegularPattern(startPoints, endPoints, 'square');
            break;
        case 'triangle':
            pattern = getRegularPattern(startPoints, endPoints, 'triangle');
            break;
    };
    
    return result.innerHTML = pattern;
});

function getRegularPattern(initial, final, pat) { //get pattern with regular raises and regular decreases
    //create an output
    let output = ``;
    // obtain pattern with regular raises and join it to the output
    output += getRegularRaises(initial, final, pat);

    //create transition pattern

    // obtain pattern with reuglar decreases

    return output;
};

function getRegularRaises(initial, final, pat) { //get the pattern of regular raises
    //validate start points and end points
    if (!validatePoints(initial, final, pat)) {
        return console.error('Incorrect values.');
    };

    //starting point
    let regularRaises = `0 ~ Anillo Mágico ~ <br>`;

    //get points for the pattern
    if (pat === 'spiral') {
        regularRaises += getSpiralRaises(initial, final);
    };
    if (pat === 'circle') {
        regularRaises += getCircleRaises(initial, final);
    }
    if (pat === 'square') {
        regularRaises += getSquareRaises(initial, final);
    }
    if (pat === 'triangle') {
        regularRaises += getTriangleRaises(initial, final);
    }

    return regularRaises;
};

function getSpiralRaises(initial, final) {
    let spiralRaises = `1 ~ ${initial} sc [${initial}] ~ (start)<br>`;
    
    spiralRaises += `2 ~ (1 inc)*${initial} [${initial * 2}] ~<br>`;

    if (final == initial * 2) {
        return spiralRaises;
    };
    
    let acum = initial;
    
    //generate raises until final points are reached
    for (let i = 3, sc = 1; acum < final; i++) { // sc stands for single crochet quantity
        acum = initial * i;
        spiralRaises += `${i} ~ (${sc} sc, inc)*${initial} [${initial * i}] ~<br>`;
        sc++;
    };

    return spiralRaises;
};

function getCircleRaises(initial, final) { //get spiral raises with compensations
    let circleRaises = `1 ~ ${initial} sc [${initial}] ~ (start)<br>`;
    
    circleRaises += `2 ~ (1 inc)*${initial} [${initial * 2}] ~<br>`;

    if (final == initial * 2) {
        return circleRaises;
    };
    
    circleRaises += `3 ~ (inc, ${initial} sc)*${initial} [${initial * 3}] ~<br>`;
    
    if (final == initial * 3) {
        return circleRaises;
    };

    let acum = initial, c = 1; //c stands for uneven rows compensation singlecrochets

    for (let i = 4, sc = 2; acum < final; i++) {
        acum = initial * i;
        if (i % 2 == 0) {
            circleRaises += `${i} ~ (${sc} sc, inc)*${initial} [${initial * i}] ~<br>`;
        } else {
            circleRaises += `${i} ~ ${c} sc, (${sc} sc, inc)*${initial-1}, inc, ${c+1} sc [${initial * i}] ~<br>`;
            c++;
        };
        sc++;
    };

    return circleRaises;
};

function validatePoints(initial, final, pat) { //validate points entered
    if (initial == 0 || final == 0) {
        swal({
            icon: 'error',
            text: 'Points can\'t be 0 (zero).',
            buttons: false,
            timer: 4200,
        });
        return false;
    };
    if (final % initial != 0) {
        swal({
            icon: 'error',
            text: 'Final points must be a multiple of start points.',
            buttons: false,
            timer: 4200,
        });
        return false;
    };
    if (initial == final) {
        swal({
            icon: 'error',
            text: 'Points can\'t be the same.',
            buttons: false,
            timer: 4200,
        });
        return false;
    };
    if (initial < 3) {
        swal({
            icon: 'error',
            text: 'Start value must be 3 (three) or greater.',
            buttons: false,
            timer: 4200,
        });
        return false;
    }
    if (initial > 100) {
        swal({
            icon: 'warning',
            text: '🤨 What? 🤔 Really?? OK...🤐',
            buttons: false,
            timer: 2000,
        });
        return true;
    };
    if (pat == 'square') {
        if (initial <= 3) {
            swal({
                icon: 'error',
                text: 'Start value must be greater than 3 (three).',
                buttons: false,
                timer: 4200,
            });
            return false;
        };
    };
    if (pat == 'triangle') {
        if (initial % 3 != 0) {
            swal({
                icon: 'error',
                text: 'Start value must be a multiple of 3 (three).',
                buttons: false,
                timer: 4200,
            });
            return false;
        };
    };

    return true;
};

function fixEnd() { //adapts end points to be proportional to start points
    let startValue = Number(start.value);
    end.setAttribute('min',startValue); //make min-value of end equals startValue
    
    let endMin = end.getAttribute('min')
    end.setAttribute('step', startValue); //make values ​​of end multiples of start

    let difference = end.value % endMin;
    end.value -=  difference;
};
start.onclick = () => { 
    fixEnd()
};
end.onclick = () => {
    fixEnd()
};
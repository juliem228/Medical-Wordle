let height = 6;
let width  = 5;

let row = 0;
let col = 0;

let gameOver = false;

let keyboard = document.querySelector('.key-container')


let word = [
    //array of possible secret words, randomly generated in a subsequent function
    'BRAIN',
    'SKULL',
    'NERVE',
    'AXONS',
    'ELBOW',
    'CHEST',
    'ACIDS',
    'HEART',
    'LUNGS',
    'VALVE',
    'BLOOD',
    'VEINS',
    'CLOTS',
    'DIGIT',
    'NAILS',
    'ACRID',
    'OBESE',
    'KNEES',
    'THIGH',
    'LIVER',
    'STONE',
    'URINE',
    'FECES',
    'BELLY',
    'TEETH',
    'MOIST',
    'ALPHA',
    'ACTIN',
    'ACUTE',
    'CELLS',
    'GLAND',
    'ABUSE',
    'GENES',
    'SCALP',
    'SLEEP',
    'CANAL',
    'AORTA',
    'APNEA',
    'TESTE',
    'OVARY',
    'JOINT',
    'ATLAS',
    'ATOPY',
    'NODES',
    'BINGE',
    'BOLUS',
    'BONES',
    'SCANS',
    'BOWEL',
    'BRADY',
    'BROCA',
    'TUBES',
    'BRUIT',
    'BURSA',
    'SPINE',
    'RAPID',
    'STUDY',
    'HYMEN',
    'CHYME',
    'CILIA',
    'COLIC',
    'COLON',
    'WASTE',
    'CROWN',
    'CYSTS',
    'DAILY',
    'DELTA',
    'WAVES',
    'CYCLE',
    'BEATS',
    'FIBER',
    'FLUID',
    'LIPID',
    'FECAL',
    'FETAL',
    'FOVEA',
    'LOBES',
    'DRUGS',
    'GLANS',
    'PENIS',
    'GRAFT',
    'SHAFT',
    'BLOCK',
    'HEELS',
    'HERTZ',
    'HIVES',
    'FLASH',
    'VIRUS',
    'COVID',
    'TESTS',
    'ILEUM',
    'KEGEL',
    'LASER',
    'LATEX',
    'GLOVE',
    'WIPES',
    'LOCUS',
    'LUMEN',
    'MACRO',
    'MICRO',
    'MOTOR',
    'OPTIC',
    'ORBIT',
    'MEDIA',
    'PAINS',
    'FLOOR',
    'ULCER',
    'SWEAT',
    'POWER',
    'ITCHY',
    'HURTS',
    'PULSE',
    'PUPIL',
    'QUADS',
    'RANGE',
    'RENAL',
    'ROOTS',
    'RATES',
    'SHOCK',
    'SHUNT',
    'SINUS',
    'SLING',
    'CHART',
    'SPASM',
    'STENT',
    'STRIA',
    'TACHY',
    'TINEA',
    'PEDIS',
    'TONIC',
    'TOOTH',
    'TOXIC',
    'TOXIN',
    'TRANS',
    'TUMOR',
    'LEAKS',
    'WATER',
    'FUNGI',
    'GENUS',
    'SPORE',
    'YEAST',
    'PILUS',
    'FEVER',
    'ALGAE',
    'CLONE',
    'CODON',
    'PHASE',
    'EXONS',
    'GLIAL',
    'KREBS',
    'LYSIS',
    'NAKED',
    'PRION',
    'REDOX',
    'WORMS',
    'SCOPE',
    'SERUM',
    'SMEAR',
    'SOMAS',
    'SPIKE',
    'STAGE',
    'FIELD',
    'DIMER',
    ''
];  

let keys = [
    //contains all the qwerty keys needed to display on the screen
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'

]

let onlyLetters = [
    //array of only letters minus 'ENTER' or '<<' to be used in the addLetter function
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
]

window.onload = function() {
    initialize()
}

function initialize() {
    word = word[Math.floor(Math.random() * word.length)]; //generates secret word
    console.log(word)
    // create the game board 
    for (let r = 0; r < height; r++) {
        for(let c = 0 ; c < width; c++) {
            //<span id='0-0' class='tile'>p</span> 
            let tile = document.createElement('span');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile"); 
            tile.innerText = "";
            document.getElementById('board').appendChild(tile);
        }
    }
    
    //Listen for key press on PHYSICAL keyboard
    document.addEventListener("keyup", (e) => {
         if (gameOver) return;    
         //alert(e.code) 
         if ('KeyA' <= e.code && e.code <= 'KeyZ') {
             if (col < width) {
                let currentTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currentTile.innerText == '') {
                    currentTile.innerText = e.code[3]
                    col += 1
                }
             }
         } else if (e.code == 'Backspace') {
             if (0 < col && col <= width) {
                 col -= 1;
                 let currentTile = document.getElementById(row.toString() + '-' + col.toString());
                 currentTile.innerText = '';
             }
         } else if (e.code == "Enter" && col > 4) {
              update();
              row += 1; //start new row
              col = 0; //start new row at index 0
              
         }

         if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("message-container").innerText = 'The answer is ' + word + '!';
         }
   
})

keys.forEach(key => {
    //creates onscreen keyboard
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement);
})

const handleClick = (key ) => {
    console.log('clicked', key)
    addLetter(key)
}

const addLetter = (letter) => {
    //allows functionality to onscreen keyboard
    let tile = document.getElementById(row.toString() + '-' + col.toString())
    if (onlyLetters.includes(letter) && col <= width) {
        let tile = document.getElementById(row.toString() + '-' + col.toString())
        tile.innerText = letter
        col++
    } else if (letter == 'ENTER' && col > 4) {
        update();
        row += 1; //start new row
        col = 0; //start new row at index 0
    } else if (letter == '<<') {
        if (0 < col && col <= width) {
        col-=1
        let tile = document.getElementById(row.toString() + '-' + col.toString())
        tile.innerText = ''
        }
    }
}
}


const update = () => {
    let correct = 0;
    let delay = 0
    for (let c = 0; c < width; c++) {
        //is this letter in the correct position, and adding the tile flip
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currentTile.innerText;
        setTimeout(() => {      
        currentTile.classList.add('flip')
        if (word[c] == letter) {
            currentTile.classList.add('correct');
            correct += 1;
        } //is it in the word?
        else if (word.includes(letter)) {
            currentTile.classList.add('present')
        } //not in the word
        else {
            currentTile.classList.add('absent')
        }
        if (correct == width) {
            gameOver = true; 
            document.getElementById("message-container").innerText = 'Congratulations! The answer is ' + word + '!';  
            }
        }, 400 * delay) 
        delay+= 1;
    }
}

/*------------------------------------------------------------
 -------------------------------------------------------------
 ---------              QUESTION                    ----------
 -------------------------------------------------------------
 -----------------------------------------------------------*/
// Question: Constructor and prototype
function Question(type, text, choices, answer, hint) {
    this.qType = type; // holds a string
    this.qText = text; // holds a string
    this.qChoices = choices; // holds an array of 4 strings
    this.qAnswer = answer; // holds a string
    this.qHint = hint; // holds a string
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.qAnswer === this.qChoices[choice];
};

Question.prototype.typeIs = function () {
    return this.qType;
};

Question.prototype.askTextQuestion = function () {
    // show progess info
    currQuiz.showProgress();
    // write question
    document.getElementById('question').innerText = this.qText;
    // write 4 answers
    document.getElementById('choice0').innerText = this.qChoices[0];
    document.getElementById('choice1').innerText = this.qChoices[1];
    document.getElementById('choice2').innerText = this.qChoices[2];
    document.getElementById('choice3').innerText = this.qChoices[3];
};



/*------------------------------------------------------------
 -------------------------------------------------------------
 ---------                 QPIC                     ----------
 -------------------------------------------------------------
 -  Inherits Question (enables addition of image arguments)  -
 -----------------------------------------------------------*/

function Qpic(type, text, choices, answer, hint, picSrc, picAlt) {
  Question.call(this, type, text, choices, answer, hint);
  this.picSrc = picSrc; // holds a string
  this.picAlt = picAlt; // holds a string
}

Qpic.prototype = Object.create(Question.prototype);

Qpic.prototype.showInDiv = function(divToUseId,className) {
  var div = document.getElementById("divToUseId");
  var picHTML = '';
  picHTML += '<img class="';
  picHTML += className;
  picHTML += '" src="';
  picHTML += this.picSrc;
  picHTML += '" alt="';
  picHTML += this.picAlt;
  picHTML += '" />';
  div.innerHTML = picHTML;
};

Question.prototype.askPicQuestion = function (question) {
    // write question
    // write 4 answers
    // show pic
    this.showinDiv(qPicDiv, qPicImg);
};



/*------------------------------------------------------------
 -------------------------------------------------------------
 ---------              CREATE QUIZ                 ----------
 -------------------------------------------------------------
 -----------------------------------------------------------*/



var quizCodes = {
    "unit1": [
        [
            [
            "1101",
            "Plate Tectonics"                
            ],
            [
            "1102",
            "Tectonic Hazards"                
            ],
            [
            "1103",
            "Climate Change"                
            ],
            [
            "1104",
            "Tropical Storms"                
            ],
            [
            "1105",
            "Drought and Fire"                
            ],
            [
            "1106",
            "Rain and Floods"                
            ]
        ],
        [
            [
            "1201",
            "Ecosystems"                
            ],
            [
            "1202",
            "Tropical Forests"                
            ],
            [
            "1203",
            "Hot Deserts"                
            ],
            [
            "1204",
            "Cold Environments"                
            ],
            [
            "1205",
            "Oceanic Environments"                
            ] 
        ],
        [
            [
            "1301",
            "UK Environments"               
            ],
            [
            "1302",
            "Coastal Processes"              
            ],
            [
            "1303",
            "Coastal Features"                
            ],
            [
            "1304",
            "River Processes"                
            ],
            [
            "1305",
            "River Features"                
            ],
            [
            "1306",
            "Glacial Landscapes"               
            ]            
        ]
    ],
    "unit2": [
        [
            [
            "2101",
            "Urban Land Use"            
            ],
            [
            "2102",
            "Population Growth"                
            ],
            [
            "2103",
            "Urbanisation"                
            ],
            [
            "2104",
            "Megacities"                
            ],
            [
            "2105",
            "Industrial Decline"                
            ]
        ],
        [
            [
            "2201",
            "Rich and Poor"                
            ],
            [
            "2202",
            "Economic Change"                
            ],
            [
            "2203",
            "Demographic Transition"                
            ],
            [
            "2204",
            "Multi-Nationals"                
            ],
            [
            "2205",
            "Gender Inequality"               
            ],
            [
            "2206",
            "Tourism"               
            ]    
        ],
        [
            [
            "2301",
            "Feeding the World"                
            ],
            [
            "2302",
            "Water Resources"                
            ],
            [
            "2303",
            "Water Management"                
            ],
            [
            "2304",
            "Energy Resources"                
            ],
            [
            "2305",
            "Energy Efficiency"                
            ]          
        ]
    ],
    "unit3": [
        [
            [
            "3101",
            "Making links"               
            ]
        ],
        [
            [
            "3201",
            "Case study - Dharavi"               
            ],
            [
            "3201",
            "Case study - Rocinha"                
            ],
            [
            "3201",
            "Case study - 3 Gorges"                
            ]
        ],
        [
            [
            "3301",
            "Fieldwork skills"                
            ],
            [
            "3302",
            "Using Field Data"                
            ]           
        ]
    ],
    "unit4": [
        [
            [
            "4101",
            "Grid References"                
            ],
            [
            "4102",
            "OS Symbols"                
            ],
            [
            "4103",
            "Contours"              
            ],
            [
            "4104",
            "OS Map Skills"               
            ]
        ],
        [
            [
            "4201",
            "Graphs and Charts"                
            ],
            [
            "4202",
            "Describing Photos"                
            ] 
        ],
        [
            [
            "4301",
            "Exam literacy"          
            ],
            [
            "4302",
            "Keywords - Economy"              
            ],
            [
            "4303",
            "Keywords - Environment"                
            ],
            [
            "4304",
            "Keywords - Economy"                
            ],
            [
            "4305",
            "Reading Data"                
            ]           
        ]
    ]
};



















var posiblePicks = ['img1', 'img2', 'img3', 'img4'];
var character;
var actualEnemy;
var waiting = [];
var characterHP = '';
var enemyHP = '';
var enemyAttack = '';
var characterAttack = '';
var attacking = [];

let audioLose = document.createElement("audio");
audioLose.setAttribute("src", "assets/sounds/lose.mp3");
let audioWin = document.createElement("audio");
audioWin.setAttribute("src", "assets/sounds/win.mp3");
let audioAttack = document.createElement("audio");
audioAttack.setAttribute("src", "assets/sounds/attack.mp3");
$('#attack').hide()
// for lose/win

var defeated = 0;

//Object

var gameObject = {
    characters: [{
        hpp: '#hp1',
        pname: '#name1',
        name: "Obi-Wan Kenobi",
        attack: 6,
        hp: 150,
        increaseAttack: 6,
        imgSource: "assets/images/obiwan.jpg",
        divid: "#img1",
        imgid: "#one",
    },
    {
        hpp: '#hp2',
        pname: '#name2',
        name: "Dark Vader",
        attack: 8,
        hp: 140,
        increaseAttack: 5,
        imgSource: "assets/images/darkvader.jpeg",
        divid: "#img2",
        imgid: "#two"
    },
    {
        hpp: '#hp3',
        pname: '#name3',
        name: "Luke Skywalker",
        attack: 8,
        hp: 110,
        increaseAttack: 6,
        imgSource: "assets/images/lukesky.jpeg",
        divid: "#img3",
        imgid: "#three"
    },
    {
        hpp: '#hp4',
        pname: '#name4',
        name: "Master Yoda",
        attack: 9,
        hp: 130,
        increaseAttack: 5.5,
        imgSource: "assets/images/yoda.jpeg",
        divid: "#img4",
        imgid: "#four"
    }]
}

function insideCharacter(array) {
    for (i = 0; i < array.length; i++) {
        var indexArray = '#' + array[i];
        $("#row2").append($(indexArray));
        $(indexArray).removeClass("character").addClass("enemy");
        $(indexArray).attr('value', 'enemy');
    }
};

function insideEnemy(array) {
    for (i = 0; i < array.length; i++) {
        var indexArray = '#' + array[i];
        $("#row3").append($(indexArray));
        $(indexArray).removeClass("enemy").addClass("waiting");
        $(indexArray).attr('value', 'waiting');
    }
};

function elementGenerator() {
    gameObject.characters.forEach(element => {
        //Images
        $(element.imgid).attr('src', element.imgSource);

        //Name
        $(element.pname).text(element.name);

        //hp
        $(element.hpp).text(element.hp);
    });
};

function attack() {

    gameObject.characters.forEach(element => {
        if (element.divid.includes(character)) {
            characterHP = element.hp;
            characterAttack = element.attack;
            element.attack = element.attack + element.increaseAttack;
        }
        if (element.divid.includes(actualEnemy)) {
            enemyHP = element.hp;
            enemyAttack = element.attack;
        }
    });

    gameObject.characters.forEach(element => {
        if (element.divid.includes(character)) {
            element.hp = element.hp - enemyAttack;
            if (element.hp < 0) {
                characterElement = '#' + character;
                $(characterElement).remove();
                audioLose.play();
                $('#message').text('You lost the game!')
            }
        }
        if (element.divid.includes(actualEnemy)) {
            element.hp = element.hp - characterAttack;
            if (element.hp < 0) {
                $('#attack').hide()
                enemyElement = '#' + actualEnemy;
                $(enemyElement).remove();
                defeated++;
                if (defeated === 3) {
                    audioWin.play();
                    $('#message').text('You won the game!')
                }
            }
        }
    })
    elementGenerator();

}

$('.character').on('click', function () {

    if ($(this).attr('value') === 'character') {
        character = $(this).attr('id');
        var newArray = function (posibleNums) {
            return posibleNums != character
        }
        posiblePicks = posiblePicks.filter(newArray);
        insideCharacter(posiblePicks);
    }
    else if ($(this).attr('value') === 'enemy') {
        actualEnemy = $(this).attr('id');
        var newArray = function (posibleNums) {
            return posibleNums != actualEnemy;
        }
        posiblePicks = posiblePicks.filter(newArray);
        insideEnemy(posiblePicks);
        $('#attack').show()
    }

    else if ($(this).attr('value') === 'waiting') {
        $(this).attr('value', 'enemy');
        $("#row2").append($(this));
        $(this).removeClass("waiting").addClass("enemy");
        actualEnemy = $(this).attr('id');
        $('#attack').show()
    }

});


$('#attack').on('click', function () {

    audioAttack.play();
    attack();

})

elementGenerator();


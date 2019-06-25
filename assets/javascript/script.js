// Audio
let audioLose = document.createElement("audio");
audioLose.setAttribute("src", "assets/sounds/lose.mp3");
let audioWin = document.createElement("audio");
audioWin.setAttribute("src", "assets/sounds/win.mp3");
let audioAttack = document.createElement("audio");
audioAttack.setAttribute("src", "assets/sounds/attack.mp3");

// Hiding the attack button so the user doesn't increase the attack without losing hp
$('#attack').hide()

//Object
var gameObject = {
    enemyAttack: '',
    characterAttack: '',
    characterHP: '',
    enemyHP: '',
    charactersDefeated: 0,
    choosenCharacter: '',
    choosenEnemy: '',
    posiblePicks: ['img1', 'img2', 'img3', 'img4'],
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
    }],
    elementGenerator: function () {
        this.characters.forEach(element => {
            //Images
            $(element.imgid).attr('src', element.imgSource);

            //Name
            $(element.pname).text(element.name);

            //hp
            $(element.hpp).text(element.hp);
        });
    },
    characterSelect: function (array) {
        for (i = 0; i < array.length; i++) {
            var indexArray = '#' + array[i];
            $("#row2").append($(indexArray));
            $(indexArray).removeClass("character").addClass("enemy");
            $(indexArray).attr('value', 'enemy');
        }
    },
    enemySelect: function (array) {
        for (i = 0; i < array.length; i++) {
            var indexArray = '#' + array[i];
            $("#row3").append($(indexArray));
            $(indexArray).removeClass("enemy").addClass("waiting");
            $(indexArray).attr('value', 'waiting');
        }
    },
    attack: function () {
        this.characters.forEach(element => {
            if (element.divid.includes(this.choosenCharacter)) {
                this.characterHP = element.hp;
                this.characterAttack = element.attack;
                element.attack = element.attack + element.increaseAttack;
            }
            if (element.divid.includes(this.choosenEnemy)) {
                this.enemyHP = element.hp;
                this.enemyAttack = element.attack;
            }
        });
        this.characters.forEach(element => {
            if (element.divid.includes(this.choosenCharacter)) {
                element.hp = element.hp - this.enemyAttack;
                console.log(element.hp)
                if (element.hp < 0) {
                    characterElement = '#' + character;
                    $(characterElement).remove();
                    audioLose.play();
                    $('#message').text('You lost the game!')
                }
            }
            if (element.divid.includes(this.choosenEnemy)) {
                element.hp = element.hp - this.characterAttack;
                if (element.hp < 0) {
                    $('#attack').hide()
                    enemyElement = '#' + this.choosenEnemy;
                    $(enemyElement).remove();
                    this.charactersDefeated++;
                    if (this.charactersDefeated === 3) {
                        audioWin.play();
                        $('#message').text('You won the game!')
                    }
                }
            }
        })
        this.elementGenerator();
    }
}

// Making sure the doc is ready
$(function() {

// Click functions 
$('.character').on('click', function () {
    if ($(this).attr('value') === 'character') {
        gameObject.choosenCharacter = $(this).attr('id');
        var newArray = function (posibleNums) {
            return posibleNums != gameObject.choosenCharacter
        }
        gameObject.posiblePicks = gameObject.posiblePicks.filter(newArray);
        gameObject.characterSelect(gameObject.posiblePicks);
    }
    else if ($(this).attr('value') === 'enemy') {
        gameObject.choosenEnemy = $(this).attr('id');
        var newArray = function (posibleNums) {
            return posibleNums != gameObject.choosenEnemy;
        }
        gameObject.posiblePicks = gameObject.posiblePicks.filter(newArray);
        gameObject.enemySelect(gameObject.posiblePicks);
        $('#attack').show()
    }
    else if ($(this).attr('value') === 'waiting') {
        $(this).attr('value', 'enemy');
        $("#row2").append($(this));
        $(this).removeClass("waiting").addClass("enemy");
        gameObject.choosenEnemy = $(this).attr('id');
        $('#attack').show()
    }
});

$('#attack').on('click', function () {
    audioAttack.play();
    gameObject.attack();
})

gameObject.elementGenerator();

});
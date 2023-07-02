var word_len = 5;
var words = 6;

var game = document.querySelector(".game");
var keyboard = document.querySelector(".keyboard");

var keyboard_ = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

var cord_w = 0;
var cord_h = 0;

var url = 'https://raw.githubusercontent.com/droyson/go-fetch-words/main/5-letter-words.json';
var storedText;

var word_list = [];
var random_word;

var end_game = false;

fetch(url)
  .then(function(response) {
    response.json().then(function(text) {
        word_list = text;
        random_word = word_list[getRandomArbitrary(0, word_list.length)].toUpperCase();
    });
  });

var time_out = '200';

var len_keyboard = 0;

for (var i = 0; i < keyboard_.length; i++){
    len_keyboard += keyboard_[i].length
}

for (var i = 0; i < words; i++){
    var element = document.createElement("div");
    element.setAttribute('class', 'word_line');
    for (var j = 0; j < word_len; j++){
        var element_1 = document.createElement("div");
        element_1.setAttribute('class', 'line');
        var element_2 = document.createElement("div");
        element_2.setAttribute('class', 'block');
        element_1.appendChild(element_2);
        element.appendChild(element_1)
    }
    game.appendChild(element);
}

for (var a = 0; a < keyboard_.length; a++){
    var line = keyboard_[a];
    var element = document.createElement("div");
    element.setAttribute('class', 'key_line');
    for (var b = 0; b < line.length; b++){
        var element_1 = document.createElement("div");
        element_1.setAttribute('class', 'line');
        var element_2 = document.createElement("div");
        element_2.setAttribute('class', 'key');
        element_2.innerHTML = line[b];
        var attribute = 'add_symbol("' + line[b] + '")'
        element_2.setAttribute('onclick', attribute)
        element_1.appendChild(element_2);
        element.appendChild(element_1)
    }
    if (a == 1){
        var element_1 = document.createElement("div");
        element_1.setAttribute('class', 'line');
        var element_2 = document.createElement("div");
        element_2.setAttribute('class', 'del');
        element_2.innerHTML = '←';
        element_2.setAttribute('onclick', 'del_symbol()')
        element_1.appendChild(element_2);
        element.appendChild(element_1)
    }
    if (a == 2){
        var element_1 = document.createElement("div");
        element_1.setAttribute('class', 'line');
        var element_2 = document.createElement("div");
        element_2.setAttribute('class', 'enter');
        element_2.innerHTML = 'ENTER';
        element_2.setAttribute('onclick', 'enter()')
        element_1.appendChild(element_2);
        element.appendChild(element_1)
    }
    keyboard.appendChild(element);
}

function add_symbol(symbol){
    if (cord_w < word_len & cord_h < words & !end_game){
        var childs = game.querySelectorAll('.word_line');
        for (var i = 0; i < childs.length; i++){
            var blocks = childs[i].querySelectorAll('.block');
            for (var j = 0; j < blocks.length; j++){
                if (cord_w == j & cord_h == i){
                    blocks[j].innerHTML = symbol;
                }
            }
        }
	cord_w += 1;
    }
    
}

function del_symbol(){
    if (cord_w > 0 & !end_game){
        cord_w -= 1;
        var childs = game.querySelectorAll('.word_line');
        var blocks = childs[cord_h].querySelectorAll('.block');
        blocks[cord_w].innerHTML = '';
    }
}

function enter(){
    if (!end_game){
        var childs = game.querySelectorAll('.word_line');
        var blocks = childs[cord_h].querySelectorAll('.block');
        var success_count = 0;
        var writed_word = '';
        for (var i = 0; i < blocks.length; i++){writed_word += blocks[i].innerHTML}
        if (writed_word.length < word_len){
            msgBox("Writed Word Length = " + writed_word.length + " < " + word_len);
        }
        else if (word_list.indexOf(writed_word.toLowerCase()) == -1){
            msgBox("Word not Found");
        }
        else{
            for (var i = 0; i < blocks.length; i++){
                if (random_word[i] == blocks[i].innerHTML){
                    blocks[i].setAttribute('class', 'block green');
                    success_count += 1
                }
                else if (random_word.indexOf(blocks[i].innerHTML) > -1){
                    blocks[i].setAttribute('class', 'block orange')
                }
                else{
                    blocks[i].setAttribute('class', 'block gray')
                }
            }
            var keys = keyboard.querySelectorAll('.key');
            for (var i = 0; i < writed_word.length; i++){
                for (var key = 0; key < keys.length; key++){
                    if (keys[key].innerHTML === writed_word[i]){
                        if (writed_word[i] == random_word[i]){
                            keys[key].setAttribute('class', 'key green');
                        }
                        else if (random_word.indexOf(keys[key].innerHTML) > -1){
                            keys[key].setAttribute('class', 'key orange')
                        }
                        else if (random_word.indexOf(keys[key].innerHTML) <= -1){
                            keys[key].setAttribute('class', 'key gray')
                        }
                    }
                }
            }

            cord_w = 0
            cord_h += 1;

            if (success_count == word_len){
                msgBox('You Win!');
                end_game = true;
            }
            else if (success_count != word_len & cord_h == words){
                msgBox('You Lose! Success word is ' + random_word);
                end_game = true;
            }
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function msgBox(message){
    setTimeout(() => {
        alert(message);
      }, time_out);
}

function msgBoxEnd(message){
    setTimeout(() => {
        alert(message);
        endGame();
      }, time_out);
}

function endGame(){
    cord_w = 0;
    cord_h = 0;
    end_game = false;
    random_word = word_list[getRandomArbitrary(0, word_list.length)].toUpperCase();
    var blocks = game.querySelectorAll('.block');
    for (var i = 0; i < blocks.length; i++){
        blocks[i].innerHTML = '';
        blocks[i].setAttribute('class', 'block')
    }
    var keys = keyboard.querySelectorAll('.key');
    for (var i = 0; i < keys.length; i++){
        keys[i].setAttribute('class', 'key');
    }
}

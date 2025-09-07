var WordCounter = /** @class */ (function () {
    function WordCounter(text) {
        this.text = text;
    }
    WordCounter.prototype.getText = function () {
        return this.text;
    };
    WordCounter.prototype.counter = function () {
        var word = "";
        var map = new Map();
        for (var i = 0; i < this.text.length; i++) {
            var char = this.text[i];
            if (char === " ") {
                if (word !== "") {
                    map.set(word, (map.get(word) || 0) + 1);
                }
                word = "";
            }
            else {
                word += char;
            }
        }
        if (word !== "") {
            map.set(word, (map.get(word) || 0) + 1);
        }
        return map;
    };
    return WordCounter;
}());
var text = "Una vida sin pan o una vida feliz";
var wordCounter = new WordCounter(text);
console.log(wordCounter.getText());
var result = wordCounter.counter();
result.forEach(function (value, key) {
    console.log(key, "-", value);
});

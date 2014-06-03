var natural = require ('natural');
//console.log(natural.JaroWinklerDistance("cars","car"))
tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has flees."));

var firstWord = 'frog';
var secondWord = 'dog';


var jw = natural.JaroWinklerDistance(firstWord, secondWord);
var ld = natural.LevenshteinDistance(firstWord,secondWord);

var divide = (ld/jw);

console.log (jw,ld, divide);

classifier = new natural.BayesClassifier();

classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the siver', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');

classifier.train();

console.log(classifier.classify('i am silver'));
const LANGUAGE_TO_SEARCH_FUNC = {
  it: searchItalian,
}

const LANGUAGE_HASH = {
  it: 'italian'
}

export const searchWord = (language, word) => {
  const searchFunc = LANGUAGE_TO_SEARCH_FUNC[language]
  searchFunc(language, word)
}

function searchItalian(language, word) {
  openCollinsDictionary(word, language)
  openForvo(word, language);
  openGoogleImages(word, language);
}

// a website that has IPA definitions of words
function openCollinsDictionary(word, language) {
  const longLanguage = LANGUAGE_HASH[language];
  const wordParts = word.split(' ');
  // Collins Dictionary only has records for individual words.
  // For example, if word is "Happy Birthday", Collins will not work.
  // So, instead, search for "Happy" and search for "Birthday"
  wordParts.forEach((wordPart) => {
    window.open(
      `https://www.collinsdictionary.com/dictionary/${longLanguage}-english/${wordPart}`
    );
  })
}

function openGoogleImages(word, language) {
  window.open(
    `https://www.google.${language}/search?tbm=isch&sout=1&q=${word}`,
    'images'
  );
}

// a website that has recordings of native speakers pronouncing words
function openForvo(word, language) {
  window.open(`http://www.forvo.com/word/${word}/#${language}`, 'forvo');
}

// function openWordReference(word) {
//   window.open(`http://www.wordreference.com/iten/${word}`, 'wordreference');
// }

// function openGoogleTranslate(word, language) {
//   window.open(
//     `https://translate.google.com/#view=home&op=translate&sl=${language}&tl=en&text=${word}`,
//     'translate'
//   );
// }
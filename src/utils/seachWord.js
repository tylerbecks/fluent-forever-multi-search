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

function openCollinsDictionary(searchWord, language) {
  const longLanguage = LANGUAGE_HASH[language];
  window.open(
    `https://www.collinsdictionary.com/dictionary/${longLanguage}-english/${searchWord}`
  );
}

function openGoogleImages(searchWord, language) {
  window.open(
    `https://www.google.${language}/search?tbm=isch&sout=1&q=${searchWord}`,
    'images'
  );
}

function openForvo(searchWord, language) {
  window.open(`http://www.forvo.com/word/${searchWord}/#${language}`, 'forvo');
}

// function openWordReference(searchWord) {
//   window.open(`http://www.wordreference.com/iten/${searchWord}`, 'wordreference');
// }

// function openGoogleTranslate(searchWord, language) {
//   window.open(
//     `https://translate.google.com/#view=home&op=translate&sl=${language}&tl=en&text=${searchWord}`,
//     'translate'
//   );
// }
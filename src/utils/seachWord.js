const LANGUAGE_TO_SEARCH_FUNC = {
  it: searchItalian,
  es: searchSpanish,
}

const LANGUAGE_HASH = {
  es: "spanish",
  it: "italian",
}

export const searchWord = (language, translatedWord, englishWord) => {
  const searchFunc = LANGUAGE_TO_SEARCH_FUNC[language]
  searchFunc(language, translatedWord, englishWord)
}

function searchItalian(language, translatedWord, englishWord) {
  openCollinsDictionary(translatedWord, language)
  openForvo(translatedWord, language)
  openGoogleImages(translatedWord, language)
  openWordReference(englishWord, language)
}

function searchSpanish(language, translatedWord, englishWord) {
  openForvo(translatedWord, language)
  openGoogleImages(translatedWord, language)
  openWordReference(englishWord, language)
}

// a website that has IPA definitions of words
function openCollinsDictionary(translatedWord, language) {
  const longLanguage = LANGUAGE_HASH[language]
  const wordParts = translatedWord.split(" ")
  // Collins Dictionary only has records for individual words.
  // For example, if translatedWord is "Happy Birthday", Collins will not work.
  // So, instead, search for "Happy" and search for "Birthday"
  wordParts.forEach(wordPart => {
    window.open(
      `https://www.collinsdictionary.com/dictionary/${longLanguage}-english/${wordPart}`
    )
  })
}

function openGoogleImages(translatedWord, language) {
  window.open(
    `https://www.google.${language}/search?tbm=isch&sout=1&q=${translatedWord}`,
    "images"
  )
}

// a website that has recordings of native speakers pronouncing words
function openForvo(translatedWord, language) {
  window.open(
    `http://www.forvo.com/word/${translatedWord}/#${language}`,
    "forvo"
  )
}

function openWordReference(englishWord, language) {
  window.open(
    `https://www.wordreference.com/${language}/translation.asp?tranword=${englishWord}`,
    "wordreference"
  )
}

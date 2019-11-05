import days from "../data/days"
import prepositions from "../data/prepositions"
import pronouns from "../data/pronouns"

const PREPOSITION_IMAGES_LINK =
  "https://fluent-forever.com/wp-content/uploads/prepositionimages/prepositions.html"
const PRONOUN_IMAGES_LINK =
  "https://blog.fluent-forever.com/pictures-of-pronouns/"
const DAY_IMAGES_LINK =
  "https://blog.fluent-forever.com/images-for-the-days-of-the-week/"

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
  openGoogleImages(language, translatedWord, englishWord)
  openWordReferenceItalian(englishWord, language)
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

function openGoogleImages(language, translatedWord, englishWord) {
  if (days.includes(englishWord)) {
    window.open(DAY_IMAGES_LINK, 'days_images')
  }
  if (prepositions.includes(englishWord)) {
    window.open(PREPOSITION_IMAGES_LINK, 'preposition_images')
  }
  if (pronouns.includes(englishWord)) {
    window.open(PRONOUN_IMAGES_LINK, 'pronoun_images')
  }

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

function openWordReferenceItalian(englishWord, language) {
  window.open(
    `https://www.wordreference.com/en${language}/${englishWord}`,
    "wordreference"
  )
}

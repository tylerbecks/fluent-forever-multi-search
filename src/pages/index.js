import "semantic-ui-css/semantic.min.css"
import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import WordSearchTool from "../components/WordSearchTool"
import SEO from "../components/seo"
import { getItem, setItem } from "../utils/store"

const STORE_LANGUAGE_KEY = "language"
const STORE_INDEX_KEY = "currentWordIndex"

let englishWords

const IndexPage = () => {
  const [language, setLanguage] = useState(getDefaultLanguage())
  const [index, setIndex] = useState(getInitialIndex())
  const [translatedWord, setTranslatedWord] = useState("")
  let englishWord = englishWords && englishWords[index].word

  useEffect(() => {
    ;(async () => {
      const newTranslatedWord = await fetchTranslatedWord(englishWord, language)
      setTranslatedWord(newTranslatedWord)
    })()
  }, [index, language])

  const onChangeLanguage = newLanguage => {
    setLanguage(newLanguage)
    setItem(STORE_LANGUAGE_KEY, newLanguage)
  }

  const onChangeIndex = (newIndex) => {
    setIndex(newIndex)
    setItem(STORE_INDEX_KEY, newIndex)
  }

  return (
    <StaticQuery
      query={graphql`
        query AllWordsJson {
          allFrequentWordsJson {
            edges {
              node {
                word
                hint
              }
            }
          }
        }
      `}
      render={data => {
        if (!englishWords) {
          englishWords = data.allFrequentWordsJson.edges.map(({ node }) => node)
        }

        const { hint, word: englishWord } = englishWords[index]

        return (
          <Layout language={language} onChangeLanguage={onChangeLanguage}>
            <SEO title="Home" />
            <WordSearchTool
              englishWord={englishWord}
              hint={hint}
              index={index}
              language={language}
              onChangeIndex={onChangeIndex}
              totalWordCount={englishWords.length}
              translatedWord={translatedWord}
            />
          </Layout>
        )
      }}
    />
  )
}

const getDefaultLanguage = () => {
  const storedLanguage = getItem(STORE_LANGUAGE_KEY)
  return storedLanguage || "es"
}

const getInitialIndex = () => {
  const storedIndex = Number(getItem(STORE_INDEX_KEY))
  return storedIndex || 0
}

const fetchTranslatedWord = async (englishWord, targetLanguage) => {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GATSBY_GOOGLE_TRANSLATE_API_KEY}&q=${englishWord}&target=${targetLanguage}&source=en`
  )
  const json = await response.json()
  const translation = json.data.translations[0].translatedText

  return translation
}

export default IndexPage

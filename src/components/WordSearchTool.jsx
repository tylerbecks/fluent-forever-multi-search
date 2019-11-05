import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Header, Label, Progress, Flag } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"
import { getItem, setItem } from "../utils/store"

const STORE_INDEX_KEY = "currentWordIndex"
let englishWords

export default ({ language }) => {
  const [index, setIndex] = useState(getInitialIndex())
  const [translatedWord, setTranslatedWord] = useState("")
  let englishWord = englishWords && englishWords[index].word

  useEffect(() => {
    ;(async () => {
      const translatedWord = await fetchTranslatedWord(englishWord, language)
      setTranslatedWord(translatedWord)
    })()
  }, [index, language])

  const handleClickNext = () => {
    if (index === englishWords.length - 1) return
    changeWord(index + 1)
  }

  const handleClickPrev = () => {
    if (index === 0) return
    changeWord(index - 1)
  }

  const changeWord = newIndex => {
    setIndex(newIndex)
    setItem(STORE_INDEX_KEY, newIndex)
  }

  const handleSearch = () => {
    searchWord(language, translatedWord, englishWord)
  }

  const isPrevDisabled = () => index === 0
  const isNextDisabled = () => index === englishWords.length - 1

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
          <Card raised>
            <Progress
              attached="top"
              color="green"
              total={englishWords.length}
              value={index + 1}
            />
            <Progress
              attached="bottom"
              color="green"
              total={englishWords.length}
              value={index + 1}
            />
            <Card.Content>
              <Header textAlign="left">
                <Flag name="us" />
                {englishWord}
                {hint && <Label content={hint} color="green" circular />}
              </Header>
              <Header textAlign="left">
                <Flag name={language} />
                {translatedWord}
              </Header>
            </Card.Content>

            <Card.Content extra>
              <Button.Group>
                <Button
                  icon="angle double left"
                  disabled={isPrevDisabled()}
                  onClick={handleClickPrev}
                  type="button"
                />
                <Button
                  content="Search!"
                  color="orange"
                  type="submit"
                  onClick={handleSearch}
                />
                <Button
                  icon="angle double right"
                  disabled={isNextDisabled()}
                  onClick={handleClickNext}
                  type="button"
                />
              </Button.Group>
            </Card.Content>
          </Card>
        )
      }}
    />
  )
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

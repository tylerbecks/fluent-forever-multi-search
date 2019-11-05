import "semantic-ui-css/semantic.min.css"
import React, { useState } from "react"
import Layout from "../components/layout"
import WordSearchTool from "../components/WordSearchTool"
import SEO from "../components/seo"
import { getItem, setItem } from '../utils/store'

const STORE_LANGUAGE_KEY = "language"

const IndexPage = () => {
  const [language, setLanguage] = useState(getDefaultLanguage())

  const onChangeLanguage = newLanguage => {
    setLanguage(newLanguage)
    setItem(STORE_LANGUAGE_KEY, newLanguage)
  }

  return (
    <Layout language={language} onChangeLanguage={onChangeLanguage}>
      <SEO title="Home" />
      <WordSearchTool language={language} />
    </Layout>
  )
}

const getDefaultLanguage = () => {
  const storedLanguage = getItem(STORE_LANGUAGE_KEY)
  return storedLanguage || "es"
}

export default IndexPage

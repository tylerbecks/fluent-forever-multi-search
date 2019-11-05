import "semantic-ui-css/semantic.min.css"
import React, { useState } from "react"
import Layout from "../components/layout"
import WordSearchTool from "../components/WordSearchTool"
import SEO from "../components/seo"

const STORE_LANGUAGE_KEY = "language"

const IndexPage = () => {
  const storedLanguage =
    typeof window !== "undefined" && localStorage.getItem(STORE_LANGUAGE_KEY)

  const [language, setLanguage] = useState(storedLanguage || "es")

  const onChangeLanguage = newLanguage => {
    setLanguage(newLanguage)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORE_LANGUAGE_KEY, newLanguage)
    }
  }

  return (
    <Layout language={language} onChangeLanguage={onChangeLanguage}>
      <SEO title="Home" />
      <WordSearchTool language={language} />
    </Layout>
  )
}

export default IndexPage

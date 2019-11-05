import "semantic-ui-css/semantic.min.css"
import React, { useState } from "react"
import Layout from "../components/layout"
import WordSearchTool from "../components/WordSearchTool"
import SEO from "../components/seo"

const IndexPage = () => {
  const [language, setLanguage] = useState("es")

  const onChangeLanguage = newLanguage => {
    setLanguage(newLanguage)
  }

  return (
    <Layout language={language} onChangeLanguage={onChangeLanguage}>
      <SEO title="Home" />
      <WordSearchTool language={language} />
    </Layout>
  )
}

export default IndexPage

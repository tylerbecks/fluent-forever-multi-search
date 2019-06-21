import 'semantic-ui-css/semantic.min.css'
import React from "react"
import Layout from "../components/layout"
import WordPicker from "../components/WordPicker"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <WordPicker />
  </Layout>
)

export default IndexPage

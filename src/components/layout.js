import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { createUseStyles } from "react-jss"
import Header from "./header"
import { Container } from "semantic-ui-react"
import "./layout.css"

const useStyles = createUseStyles({
  container: {
    alignItems: "center",
    display: [["flex"], "!important"],
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "70vh",
  },
})

/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
export default ({ children, language, onChangeLanguage }) => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={() => (
        <>
          <Header language={language} onChangeLanguage={onChangeLanguage} />
          <Container className={classes.container} textAlign="center">
            {children}
          </Container>
        </>
      )}
    />
  )
}

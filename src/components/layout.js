import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import injectSheet from "react-jss"
import Header from "./header"
import { Container } from "semantic-ui-react"
import "./layout.css"

const styles = {
  container: {
    alignItems: "center",
    display: [["flex"], "!important"],
    justifyContent: "center",
    minHeight: "70vh",
  },
}

/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
const Layout = ({ classes, children, language, onChangeLanguage }) => (
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
          <main>{children}</main>
        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default injectSheet(styles)(Layout)

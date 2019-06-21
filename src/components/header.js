import React from "react"
import { Link } from "gatsby"
import { Container } from "semantic-ui-react"
import { GREEN } from '../consts/styles'
import Image from './image'

export default () => (
  <header
    style={{
      background: GREEN,
      marginBottom: `1.45rem`,
    }}
  >
    <Container>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Image />
      </Link>
    </Container>
  </header>
)

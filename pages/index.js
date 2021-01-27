import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.secondary} ;
`

export default function Home() {
  return (
      <Title>My Project</Title>
  )
}

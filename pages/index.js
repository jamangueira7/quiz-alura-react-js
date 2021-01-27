import React from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import db from '../db.json';

import Widget from '../src/components/Widget';

const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary} ;
`;

const BackgroundImage = styled.div`
    background-image: url(${db.bg});
    flex:1;
    background-size: cover;
    background-position: center;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
      margin: auto;
      padding: 15px;
  }
`;


export default function Home() {
  return (
      <BackgroundImage>
          <QuizContainer>
              <Widget>
                  <Widget.Header>
                      <h1>The legend of zelda</h1>
                  </Widget.Header>
                  <Widget.Content>
                      <p>fasdjflasdfa aflkaj flasldkjf aewf jaljfv alskjfljea fjejflejjetrj...</p>
                  </Widget.Content>
              </Widget>
              <Widget>
                  <Widget.Header>
                      <h1>Quizes da galera</h1>
                  </Widget.Header>
                  <Widget.Content>
                      <p>fasdjflasdfa aflkaj flasldkjf aewf jaljfv alskjfljea fjejflejjetrj...</p>
                  </Widget.Content>
              </Widget>
          </QuizContainer>
      </BackgroundImage>
  );
}

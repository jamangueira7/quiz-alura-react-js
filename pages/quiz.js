import React, { useState } from 'react';
import styled from 'styled-components';
import db from '../db.json';
import { useRouter } from 'next/router';

import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

function LoadingWidget() {
    return (
      <Widget>
          <Widget.Header>
              <h3>
                 Carregando...
              </h3>
          </Widget.Header>
          <Widget.Content>
              [Desafio do Loading]
          </Widget.Content>
      </Widget>
    );
}

export default function QuizPage() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                <Widget>
                    <Widget.Header>
                        <h3>
                            Pergunta
                            1
                            de
                            {` ${db.questions.length}`}
                        </h3>
                    </Widget.Header>
                    <img
                        alt="Descrição"
                        style={{
                            width: '100%',
                            height: '150px',
                            objecFit: 'cover'
                        }}
                        src="https://placehold.it/400x400"
                    />
                    <Widget.Content>
                        <h2>
                            Titulo
                        </h2>
                        <p>
                            Descrição
                        </p>
                        <Button>
                            Confirmar
                        </Button>
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
                <LoadingWidget />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/jamangueira7" />
        </QuizBackground>
    );
}

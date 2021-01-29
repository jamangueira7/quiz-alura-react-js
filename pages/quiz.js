import React, { useState, useEffect } from 'react';
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

function QuestionWidget({ question, totalQuestion, questionIndex, onSubmit }) {
    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `question_${questionIndex}`;
    const isCorret = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return (
        <Widget>
        <Widget.Header>
            <h3>
                {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}

            </h3>
        </Widget.Header>
        <img
            alt="Descrição"
            style={{
                width: '100%',
                height: '150px',
                objecFit: 'cover'
            }}
            src={question.image}
        />
        <Widget.Content>
            <h2>
                {question.title}
            </h2>
            <p>
                {question.description}
            </p>
            <form onSubmit={(e) => {
                e.preventDefault();
                setIsQuestionSubmited(true);
                setTimeout(() => {
                    onSubmit();
                    setIsQuestionSubmited(false);
                }, 3000);
            }}>
                {question.alternatives.map((alternative, index) => {
                    const alternativeId = `alternative_${index}`;
                    return (
                        <Widget.Topic
                            key={alternativeId}
                            as="label"
                            htmlFor={alternativeId}
                        >
                            <input
                                style={{ display: 'none' }}
                                id={alternativeId}
                                type="radio"
                                onChange={() => setSelectedAlternative(index)}
                                name={questionId}
                            />
                            {alternative}
                        </Widget.Topic>
                    );
                })}

                <Button type="submit" disabled={!hasAlternativeSelected}>
                    Confirmar
                </Button>

                {isQuestionSubmited && isCorret && <p>Você acertou!</p>}
                {isQuestionSubmited && !isCorret && <p>Você errou!</p>}
            </form>
        </Widget.Content>
    </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const totalQuestion = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 3000);
    }, [])


    function HandleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if(nextQuestion < totalQuestion) {
            setCurrentQuestion(nextQuestion);
        }else {
            setScreenState(screenStates.RESULT);
        }
    }
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                   {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestion={totalQuestion}
                        onSubmit={HandleSubmitQuiz}
                    />
                   )}
                {screenState === screenStates.LOADING && <LoadingWidget/>}
                {screenState === screenStates.RESULT && <div>Voce acertou x perguntas, Parabens!</div>}
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/jamangueira7" />
        </QuizBackground>
    );
}

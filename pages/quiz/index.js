import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import db from '../../db.json';
import { useRouter } from 'next/router';

import Widget from '../../src/components/Widget';
import QuizContainer from '../../src/components/QuizContainer';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import AlternativeForm from '../../src/components/AlternativeForm';
import Button from '../../src/components/Button';
import GitHubCorner from '../../src/components/GitHubCorner';

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

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    Tela de resultado
                </h3>
            </Widget.Header>
            <Widget.Content>
                <p>
                    Você acertou {results.reduce((somatoriaAtual, resultAtual) => {
                        return resultAtual === true && resultAtual+1;
                    }, 0)} perguntas!
                </p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result_${index}`}>
                            #{index + 1} Resultado: { result === true ? 'Acertou': 'Errou' }
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({
    question,
    totalQuestion,
    questionIndex,
    onSubmit,
    addResult,
}) {

    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `question_${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
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
            <AlternativeForm
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmited(false);
                        setSelectedAlternative(undefined);
                    }, 3000);
                }}
            >
                {question.alternatives.map((alternative, index) => {
                    const alternativeId = `alternative_${index}`;
                    const alternativeStatus =  isCorrect ? 'SUCCESS' : 'ERROR';
                    const isSelectd =  selectedAlternative === index;

                    return (
                        <Widget.Topic
                            key={alternativeId}
                            as="label"
                            htmlFor={alternativeId}
                            data-selected={isSelectd}
                            data-status={isQuestionSubmited && alternativeStatus}
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

                {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
            </AlternativeForm>
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
    const [screenState, setScreenState] = useState(screenStates.QUIZ);
    const [results, setResult] = useState([]);
    const totalQuestion = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result) {
        setResult([
            ...results,
            result,
        ]);
    }

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
                        addResult={addResult}
                    />
                   )}
                {screenState === screenStates.LOADING && <LoadingWidget/>}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/jamangueira7" />
        </QuizBackground>
    );
}

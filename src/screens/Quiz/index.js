import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import GitHubCorner from '../../components/GitHubCorner';
import QuestionWidget from '../../../src/components/QuestionWidget';
import LoadingWidget from '../../../src/components/LoadingWidget';
import ResultWidget from '../../../src/components/ResultWidget';

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
    const router = useRouter();
    const name = router.query.name;
    const [screenState, setScreenState] = useState(screenStates.QUIZ);
    const [results, setResult] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const totalQuestion = externalQuestions.length;
    const bg = externalBg;

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
        <QuizBackground backgroundImage={bg}>
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
                {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/jamangueira7" />
        </QuizBackground>
    );
}

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from "../Widget";
import AlternativeForm from "../AlternativeForm";
import Button from "../Button";
import BackLinkArrow from "../BackLinkArrow";
import Right from "../Right";
import Wrong from "../Wrong";

export default function QuestionWidget({
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
                <BackLinkArrow href="/" />
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

                    {isQuestionSubmited && isCorrect && <Right>Você acertou!</Right>}
                    {isQuestionSubmited && !isCorrect && <Wrong>Você errou!</Wrong>}
                </AlternativeForm>
            </Widget.Content>
        </Widget>
    );
}

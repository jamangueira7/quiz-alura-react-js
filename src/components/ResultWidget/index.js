import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from "../Widget";
import BackLinkArrow from "../BackLinkArrow";


export default function ResultWidget({ results, name }) {
    return (
        <Widget>
            <Widget.Header>
                <BackLinkArrow href="/" />
                <h3>
                    Tela de resultado
                </h3>
            </Widget.Header>
            <Widget.Content>
                <p>
                    {name}, você acertou {results.filter((x) => x).length} perguntas!
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

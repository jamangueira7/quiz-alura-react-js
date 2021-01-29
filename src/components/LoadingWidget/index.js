import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from "../Widget";


export default function LoadingWidget() {
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

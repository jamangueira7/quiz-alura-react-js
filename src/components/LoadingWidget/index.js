import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Lottie } from '@crello/react-lottie';
import Widget from "../Widget";

import loadingAnimation from '../../screens/Quiz/animations/loading.json';

export default function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    Carregando...
                </h3>
            </Widget.Header>
            <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
                <Lottie
                    width="200px"
                    height="200px"
                    className="lottie-container basic"
                    config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
                />
            </Widget.Content>
        </Widget>
    );
}

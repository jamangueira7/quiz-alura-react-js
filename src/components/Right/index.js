// src/components/QuizBackground/index.js
import styled from 'styled-components';
import React from "react";

const RightComponent = styled.div`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.success}`};
  padding: 10px;
  margin: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
`;

export default function Right({ ...props }) {

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div>
            <RightComponent
                {...props}
            />
        </div>
    );
}

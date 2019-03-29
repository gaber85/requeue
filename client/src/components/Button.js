import React from "react";
import styled from '@emotion/styled';

const Button = (props) => {
  const {text, link} = props;
  return (
    <LinkButton href={link}>
      {text}
    </LinkButton>
  );
};

const LinkButton = styled('a')`
  background-color: #1db854;
  width: 60%;
  max-width: 500px;
  height: 40px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 1);
  color: white;
  font-size: 25px;
  text-decoration: none;
  cursor: pointer;
`

export default Button;

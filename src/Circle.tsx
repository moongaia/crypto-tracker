import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`; //styled-components가 props받음.

interface CircleProps {
  bgColor: string;
  borderColor?: string; //optional props
  text?: string;
} // interface는 object를 설명해주는 것. object의 shape(형태)을 설명.

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [value, setValue] = useState<number | string>(0);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
} // borderColor가 undefined이면 기본값을 보냄.

export default Circle;

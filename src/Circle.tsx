import styled from "styled-components";

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`; //styled-components가 props받음.

interface CircleProps {
  bgColor: string;
} // interface는 object를 설명해주는 것. object의 shape(형태)을 설명.

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;

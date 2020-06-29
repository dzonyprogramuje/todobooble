import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
<Container as="div">
  <Row>
    <Col>1 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
  </Row>
</Container>
    </>
  );
}

export default App;

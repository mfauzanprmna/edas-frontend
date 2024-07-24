import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AlternativeCountInput from './components/AlternativeCountInput';
import AlternativeModal from './components/AlternativeModal';
import Results from './components/Results';

const staticCriteria = [
  {name: 'Akreditasi', type: 'text'},
  {name: 'Jumlah Kelompok UKT', type: 'number' },
  {name: 'Jarak', type: 'number' },
  {name: 'Kerjasama Internasional', type:'number' },
  {name: 'Jumlah Ekstrakurikuler', type: 'number' }
];

const App = () => {
  const [count, setCount] = useState(0);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCountSubmit = (count) => {
    setCount(count);
    setShowModal(true);
  };

  const handleAlternativeSubmit = (values) => {
    setAlternatives((prevAlternatives) => [
      ...prevAlternatives,
      { name: values.name, scores: values.scores }
    ]);
    if (currentIndex + 1 < count) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowModal(false);
      calculateResults([...alternatives, { name: values.name, scores: values.scores }]);
    }
  };

  const calculateResults = async (alternatives) => {
    try {
      const response = await axios.post('http://localhost:8000/calculate', {
        criteria: staticCriteria,
        alternatives: alternatives
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error calculating EDAS:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <AlternativeCountInput onSubmit={handleCountSubmit} />
        </Col>
      </Row>
      <AlternativeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        criteria={staticCriteria}
        onSubmit={handleAlternativeSubmit}
        index={currentIndex}
      />
      {results.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Results results={results} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;

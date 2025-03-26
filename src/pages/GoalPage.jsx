import React from 'react';
import { Container } from 'react-bootstrap';
import GoalComponent from '../components/GoalComponent';

const GoalPage = ({ currentBalance }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Current Balance: ${currentBalance.toFixed(2)}</h2>
      <GoalComponent currentBalance={currentBalance} />
    </Container>
  );
};

export default GoalPage;

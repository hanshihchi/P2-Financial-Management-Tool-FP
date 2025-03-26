import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GroupExpenseLeft from '../components/GroupExpenseLeft';
import GroupExpenseRight from '../components/GroupExpenseRight';

const GroupPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <GroupExpenseLeft onGroupChange={setSelectedGroup} />
        </Col>
        <Col md={6}>
          <GroupExpenseRight group={selectedGroup} onGroupChange={setSelectedGroup} />
        </Col>
      </Row>
    </Container>
  );
};

export default GroupPage;

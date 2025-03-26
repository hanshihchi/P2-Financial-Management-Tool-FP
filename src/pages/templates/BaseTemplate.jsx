import { Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

export default function BaseTemplate({ children }) {
	const currentPath  = useLocation().pathname;

  return (
    <>
      <Container>
        <h1>Financial Management Tool</h1>

        <Nav variant="pills" activeKey={currentPath}>
          <Nav.Item>
            <Nav.Link eventKey="/" as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/income" as={Link} to="/income">Income</Nav.Link> 
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/expense" as={Link} to="/expense">Expense</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/group" as={Link} to="/group">Group</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/goal" as={Link} to="/goal">Goal</Nav.Link> 
          </Nav.Item>
        </Nav>
        {children}
      </Container>
    </>
  );
}
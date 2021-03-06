import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Facebook, Twitter, Chrome} from "react-feather";

export default function Footer(props) {
  return (
    <Container fluid className="footer">
      <Row>
        <Col className="footerLogos">
          <Facebook />
          <Twitter />
          <Chrome />
        </Col>
        <Col className="footerTextAbout">About us</Col>
      </Row>
    </Container>
  );
}

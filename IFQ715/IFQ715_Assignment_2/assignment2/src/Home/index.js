import { Card, Col, Row } from "react-bootstrap";
import "./home.css";

export default function Home({isLoggedIn}) {
  return (
    <div>
      <section className="mt-3 text-center">
        <h2 className="">Happiness Data App</h2>
        <p className="mt-3">
          Welcome to the Happiness Data App! In this app, you can search
          happiness factors and rankings for years between 2015 to 2020 by
          country. Please select the option Rankings or Factors to discover
          more!
        </p>
      </section>
      <section>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <a href={isLoggedIn? "/rankings" : "/login"}>
              <Card className="text-white">
                <Card.Img
                  src="/images/happiness_ranking.jpg"
                  alt="Happiness Rankings"
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-center">
                  <Card.Title>Happiness Rankings</Card.Title>
                  <Card.Text>
                    Search rankings of happiness by countries and years
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Col>

          <Col xs={12} md={6}>
            <a href={isLoggedIn ? "/factors" : "/login"}>
              <Card className="text-white">
                <Card.Img
                  src="/images/happiness_factors.jpg"
                  alt="Happiness Rankings"
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-center">
                  <Card.Title>Happiness Factors</Card.Title>
                  <Card.Text>
                    Find out what factors make a country happy
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Col>
        </Row>
      </section>
    </div>
  );
}

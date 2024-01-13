import { Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import GameFeed from "../components/GameFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {
    return(
        <Base>
            <Container>
                <Row>
                   {/* Category Side Menu */}
                   <Col md={2}>
                        <CategorySideMenu/>
                    </Col>

                    {/* Games Feed */}
                    <Col md={10}>
                        <GameFeed/>
                    </Col>
                </Row>
            </Container>
        </Base>

    )
}

export default Home;
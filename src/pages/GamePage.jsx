import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { getSingleGame } from "../services/game-service";
import { BASE_URL } from "../services/helper";

const GamePage = () => {

    const {gameId} = useParams();
    const [game, setGame] = useState(null);

    ///Print Data
    const printData = (dates) => {

        return new Date(dates).toLocaleString();
    }
    
    ///
    useEffect(() => {

        ///load game by ID
        getSingleGame(gameId).then((data) => {

            console.log(data);
            setGame(data);

        }).catch((error) => {

            console.log(error);
        })

    }, [])

    return (
        <Base>
            <Container>
                <Link to="/">Home</Link> / {game && (<Link to="">{game.gameTitle}</Link>)}

                <Row>
                    <Col md={{size:12}}>
                        <Card className="mt-3 ps-2 border-0 shadow">
                            {
                                game && (
                                    <CardBody className="text-center">
                                        {/* Game Posted On */}
                                        <CardText>Posted On: <b>{printData(game.addedDate)}</b></CardText>

                                        {/* Game title */}
                                        <CardText><b>{game.gameTitle}</b></CardText>

                                        {/* Category Title */}
                                        <CardText>
                                            <span className="text-muted">TAGS: {game.category.categoryTitle}</span>
                                        </CardText>

                                        {/* Divider */}
                                        <div className="divider" style={{width:'100%', height:'1px',background:'#e2e2e2'}}></div>

                                        {/* Game Image */}
                                        <div className="text-center image-container mt-3 shadow" style={{maxWidth:'50%'}}>
                                            <img className="text-center img-fluid" src={BASE_URL+'/games/image/'+game.imageName} />
                                        </div>

                                         {/* Divider */}
                                         <div className="divider" style={{width:'100%', height:'1px',background:'#e2e2e2'}}></div>

                                        {/* Description */}
                                        <CardText className="mt-5" dangerouslySetInnerHTML={{__html:game.description}}></CardText>
                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    )

}

export default GamePage;
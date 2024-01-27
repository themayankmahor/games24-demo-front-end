import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { getSingleGame } from "../services/game-service";
import { BASE_URL } from "../services/helper";
import SimilarGames from "../components/game-page/SimilarGames";
import GameEmbed from "../components/game-page/GameEmbed";

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
                                    <CardBody className="text-center d-flex flex-column align-items-center">
                                        {/* Game title */}
                                        <CardText><h2><b>{game.gameTitle}</b></h2></CardText>

                                        {/* Category Title */}
                                        <CardText>
                                            <span className="text-muted">TAGS: {game.category.categoryTitle}</span>
                                        </CardText>

                                        {/* Divider */}
                                        <div className="divider" style={{width:'100%', height:'1px',background:'#e2e2e2'}}></div>

                                        {/* Game Image */}
                                        {/* <div className="text-center mt-3 shadow" style={{maxWidth:'100%'}}>
                                            <img className="text-center img-fluid" src={BASE_URL+'/games/image/'+game.bannerImage} />
                                        </div> */}

                                        <GameEmbed/>

                                         {/* Divider */}
                                         <div className="divider" style={{width:'100%', height:'1px',background:'#e2e2e2'}}></div>

                                         {/* Links */}
                                         <div className="d-flex justify-content-between mt-5" style={{width:'60%'}}>
                                            {/* Google Play Link */}
                                            {
                                                game.googlePlayLink && (
                                                    <div>
                                                        <a href={game.googlePlayLink} target="_blank" rel="noopener noreferrer"> <h5>{game.googlePlayLink}</h5></a>
                                                    </div>
                                                )
                                            }
                                        
                                            {/* Apple Store Link */}
                                            {
                                            game.appleStoreLink && (
                                                <div>
                                                    <h5>{game.appleStoreLink}</h5>
                                                </div>
                                            )
                                            }
                                         </div>



                                        {/* Description */}
                                        <CardText className="mt-5" dangerouslySetInnerHTML={{__html:game.description}}></CardText>

                                        {/* Screen Shots */}
                                        <div className="d-flex justify-content-between mt-5" style={{width:'100%'}}>
                                        {/* Screen Shot 1  */}
                                        {
                                            game.screenShot1 && (
                                                <div>
                                                    <img className="img-fluid p-2" src={BASE_URL+'/games/image/'+game.screenShot1} />
                                                </div>
                                            )
                                        }
                                        {/* Screen Shot 2  */}
                                        {
                                            game.screenShot2 && (
                                                <div>
                                                    <img className="img-fluid p-2" src={BASE_URL+'/games/image/'+game.screenShot2} />
                                                </div>
                                            )
                                        }
                                        {/* Screen Shot 3 */}
                                        {
                                            game.screenShot3 && (
                                                <div>
                                                    <img className="img-fluid p-2" src={BASE_URL+'/games/image/'+game.screenShot3} />
                                                </div>
                                            )
                                        }
                                        {/* Screen Shot 4 */}
                                        {
                                            game.screenShot4 && (
                                                <div>
                                                    <img className="img-fluid p-2" src={BASE_URL+'/games/image/'+game.screenShot4} />
                                                </div>
                                            )
                                        }
                                        </div>
                                        
                                        {/* Similar Games */}
                                        <div className="mt-5" style={{ width: '100%' }}>
                                            <SimilarGames excludeGameID={gameId} categoryID={game.category.categoryId} />
                                        </div>
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
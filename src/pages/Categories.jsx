import { Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import CategorySideMenu from "../components/CategorySideMenu"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import GameFeed from "../components/GameFeed"
import { getGamesByCategory } from "../services/category-service"
import { toast } from "react-toastify"
import Game from "../components/Game"

const Categories = () => {

    const {categoryId} = useParams();
    const [games, setGames] = useState([]);

    ///
    useEffect(() => {

        //get games by category
        getGamesByCategory(categoryId).then((data) => {

            setGames([...data]);
            
        }).catch((error) => {
            console.log(error)
            toast.error("Error in loading posts");
        })

    }, [])

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
                        
                        {
                            games && games.map((game, index) => {
                                return(
                                    <Game key={index} game={game}/>
                                )
                            })
                        }

                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Categories;
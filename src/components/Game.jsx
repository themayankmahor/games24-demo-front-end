import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import userContext from "../context/userContext";

const Game = ({game={gameId:-1, gameTitle:"This is default game title", description:"This is default game content"}, deleteGame}) => {

    const userContextData = useContext(userContext);
    
    return(
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{game.gameTitle}</h1>

                <CardText>
                    {game.description.substring(0,10)}...
                </CardText>

                <div>
                    <Link className="btn btn-success mx-2" to={'/games/'+game.gameId}>Play</Link>
                    {/* Delete */}
                    {
                        userContextData.user.login && (
                            <Button className="mx-2" color="danger" onClick={() => deleteGame(game)}>Delete</Button>
                        )
                    }
                    {/* Update */}
                    {
                        userContextData.user.login && (
                            <Button className="mx-2" color="warning">Update</Button>
                        )
                    }

                </div>
            </CardBody>
        </Card>
    )
}

export default Game;
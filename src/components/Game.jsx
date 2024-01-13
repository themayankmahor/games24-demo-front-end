import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import userContext from "../context/userContext";

const Game = ({game={id:-1, gameTitle:"This is default game title", description:"This is default game content"}}) => {

    const userContextData = useContext(userContext);
    
    return(
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{game.gameTitle}</h1>

                <CardText dangerouslySetInnerHTML={{ __html: game.description}}>

                </CardText>

                <div>
                    <Link className="btn btn-success mx-2" to={'/games/'+game.gameId}>Play</Link>
                    {/* Delete Button */}
                    {
                        userContextData.user.login ? <Button className="mx-2" color="danger">Delete</Button> : ''
                    }

                    {/* Update Button */}
                    {
                        userContextData.user.login ? <Button className="mx-2" color="warning">Update</Button> : ''
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default Game;
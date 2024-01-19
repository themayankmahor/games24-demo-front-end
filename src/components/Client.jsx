import { useContext } from "react"
import userContext from "../context/userContext";
import { Button, Card, CardBody, CardText } from "reactstrap";

const Client = ({client = {id:-1, clientName:"This is Default Client Name", testimony:"This is default Testimony"}, deleteClient}) => {

    const userContextData = useContext(userContext);

    return(
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{client.clientName}</h1>
            </CardBody>
            <CardText className="px-4">
                <p>{client.testimony}</p>
            </CardText>

            <div className="d-flex justify-content-end p-3">
                {
                    userContextData.user.login && (
                        <Button className="mx-2" color="danger" onClick={() => deleteClient(client)}>Delete</Button>
                    )
                }
            </div>
        </Card>
    )
}

export default Client;
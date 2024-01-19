import { useContext } from "react"
import userContext from "../context/userContext";
import { Button, Card, CardBody } from "reactstrap";

const Tag = ({tag = {tagId:-1, tagTitle:"This is Default Tag Title"}, deleteTag}) => {

    const userContextData = useContext(userContext);

    return(
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{tag.tagTitle}</h1>
            </CardBody>

            <div className="d-flex justify-content-end p-3">
                {
                    userContextData.user.login && (
                        <Button className="mx-2" color="danger" onClick={() => deleteTag(tag)}>Delete</Button>
                    )
                }
            </div>
        </Card>
    )
}

export default Tag;
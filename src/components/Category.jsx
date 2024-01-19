import { useContext } from "react"
import userContext from "../context/userContext";
import { Button, Card, CardBody } from "reactstrap";

const Category = ({category = {categoryId:-1, categoryTitle:"This is Default Tag Title", categoryDescription:"This is default Description"}, deleteCategory}) => {

    const userContextData = useContext(userContext);

    return(
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{category.categoryTitle}</h1>
            </CardBody>

            <div className="d-flex justify-content-end p-3">
                {
                    userContextData.user.login && (
                        <Button className="mx-2" color="danger" onClick={() => deleteCategory(category)}>Delete</Button>
                    )
                }
            </div>
        </Card>
    )
}

export default Category;
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ListGroup, ListGroupItem } from "reactstrap"
import { getAllCategory } from "../services/category-service";
import { toast } from "react-toastify";

const CategorySideMenu = () => {

    const [categories, setCategories] = useState([]);
    
    //when page loads first time
    useEffect(() => {

        //load all categories
        getAllCategory().then((data) => {
            
            setCategories([...data]);

        }).catch(error => {

            toast.error("Error in loading categories !!");
        })
    }, [])
    
    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" className="border-0" action={true}>
                    All Games
                </ListGroupItem>

                {
                    categories && categories.map((category, index) => (

                        <ListGroupItem tag={Link} to={'/categories/'+category.categoryId} key={index} className="border-0 shadow-0" action={true}>
                            {category.categoryTitle}
                        </ListGroupItem>
                    ))
                }

            </ListGroup>
        </div>
    )

}

export default CategorySideMenu;
import { Button, Form, Input, Table } from "reactstrap";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { doCreateCategory, doDeleteCategory, getAllCategory } from "../../services/category-service";
import { toast } from "react-toastify";
import Category from "../../components/Category";

const AddCategory = () => {

    const [category, setCategory] = useState(
        {
            categoryTitle:"",
            categoryDescription:""
        }
    );

    const [allCategory, setAllCategory] = useState([]);
    const [refreshPage, setRefreshPage] = useState(true);

    ///Handle category change
    const handleFieldChange = (event) => {
        setCategory(
            {
                ...category,
                [event.target.name]:event.target.value
            }
        );
        
    };

      ///Delete Category
      const deleteCategory = (category) => {

        doDeleteCategory(category.categoryId).then((data) => {

            toast.success("Category Deleted !!!");

            let newCategories = allCategory.filter(c => c.categoryId != category.categoryId)
            setAllCategory([...newCategories]);

        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong !!");
        })
    }

    ///handle form submit
    const handleFormSubmit = (event) => {

        event.preventDefault();

        //create category
        doCreateCategory(category).then((data) => {

            toast.success("Category Created");
            setCategory(
              {
                categoryTitle:"",
                categoryDescription:""
              }
            )
            setRefreshPage(true);
        }).catch((error) => {

            
            toast.error("Something went wrong on server !!!");
        })
        
    }

    ///
    useEffect(() => {

      if (refreshPage)
      {
        ///load all categories
        getAllCategory().then((data) => {
          //set all category
          setAllCategory(data);

          //set refresh page[false]
          setRefreshPage(false);

        }).catch((error) => {

          toast.error("Error in loading All categories !!!");
        })
      }

    }, [refreshPage])

    return(

        <Base>
        <div className="p-5">
          <h2>Add Category</h2>
          <Form onSubmit={handleFormSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Category Title</th>
                  <th>Category Description</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                      {/* Category Title */}
                    <td>
                      
                      <Input
                        name="categoryTitle"
                        type="text"
                        value={category.categoryTitle}
                        onChange={handleFieldChange}
                      />
                    </td>
  
                    {/* Category Description */}
                    <td>
                      <Input
                        name="categoryDescription"
                        type="textarea"
                        value={category.categoryDescription}
                        onChange={handleFieldChange}
                      />
                    </td>
                  </tr>
               
              </tbody>
            </Table>
            <Button color="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        
        {/* All Categories */}
        <div className="p-5">
            <div>
                <h1>All Categories ({allCategory.length})</h1>
            </div>
            {
                allCategory.map((category, index) => (

                    <Category category={category} key={index} deleteCategory={deleteCategory} />
                ))
            }
        </div>
      </Base>

    )

}

export default AddCategory;
import { Button, Form, Input, Table } from "reactstrap";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { doCreateTag, doDeleteTag, doGetAllTags } from "../../services/tag-service";
import { toast } from "react-toastify";
import Tag from "../../components/Tag";

const AddTag = () => {

    //tags
    const [tag, setTag] = useState(
        {
            tagTitle:""
        }
    )

    ///tags
    const [allTags, setAllTags] = useState([]);
    const [refreshPage, setRefreshPage] = useState(true);

    ///Handel Tag Change
    const handleTagChange = (event) => {
        setTag(
            {
                ...tag,
                [event.target.name]:event.target.value
            }
        )
    }

    ///Handle Form submit
    const handleFormSubmit = (event) => {
        //
        event.preventDefault();

        //create tag
        doCreateTag(tag).then((data) => {

            toast.success("Tag Created....");

            //reset
            setTag({
                tagTitle:""
            })

            setRefreshPage(true);

        }).catch((error) => {
            toast.error("Something went wrong on server !!!");
        })
    }

    ///Delete Tag
    const deleteTag = (tag) => {

        doDeleteTag(tag.tagId).then((data) => {

            toast.success("Tag Deleted !!!");

            let newTags = allTags.filter(t => t.tagId != tag.tagId)
            setAllTags([...newTags]);

        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong !!");
        })
    }

    useEffect(() => {

        if (refreshPage)
        {
            ///Get all Tags
            doGetAllTags().then((data) => {
                //set all tags
                setAllTags(data);
                console.log(data);

                setRefreshPage(false);
            }).catch((error) => {

                console.log(error);
            })
        }

    }, [refreshPage])

    return(
        <Base>
        <div className="p-5">
          <h2>Add Tag</h2>
          <Form onSubmit={handleFormSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tag Title</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                      {/* Tag Title */}
                    <td>
                      
                      <Input
                        name="tagTitle"
                        type="text"
                        value={tag.tagTitle}
                        onChange={handleTagChange}
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

        {/* All Tags */}
        <div className="p-5">
            <div>
                <h1>All Tags ({allTags.length})</h1>
            </div>
            {
                allTags.map((tag, index) => (

                    <Tag tag={tag} key={index} deleteTag={deleteTag} />
                ))
            }
        </div>

      </Base>
    )

}

export default AddTag;
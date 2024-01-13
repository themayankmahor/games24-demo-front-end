import { useContext, useEffect, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { getAllCategory } from "../services/category-service";
import userContext from "../context/userContext";
import { toast } from "react-toastify";
import { doAddGame, doUploadGameImage } from "../services/game-service";

const AddGame = () => {
    
    const userContextData = useContext(userContext);
    const [categories, setCategories] = useState(null);
    const [image, setImage] = useState(null);

    ///game
    const [game, setGame] = useState({
        
        gameTitle:'',
        description:'',
        googlePlayLink:'',
        categoryId:''

    })

    ///handle image file
    const handleFileChange = (event) => {

        //set image data
        setImage(event.target.files[0]);
        
    }

    ///field changed
    const fieldChanged = (event) => {

        setGame({
            ...game,
            [event.target.name]:event.target.value
        })
    }

    ///handle form submit
    const handleFormSubmit = (event) => {

        event.preventDefault();

        //
        if (game.gameTitle.trim() === '')
        {
            toast.error("Title is required !!!");
            return;
        }

        //
        if (game.description.trim() === '')
        {
            toast.error("Game description is required !!!");
            return;
        }

        ///
        if (game.googlePlayLink.trim() === '')
        {
            toast.error("Add Google Play Link !!!");
            return;
        }

        ///
        if (game.categoryId === -'')
        {
            toast.error("Choose game category");
            return;
        }

        ///create new post
        doAddGame(game).then((data) => {
            
            //upload image
            doUploadGameImage(image, data.gameId).then((data) => {

                toast.success("Image Uploaded !!!")

            }).catch(error => {
                toast.error("Error in uploading image")
            })

            toast.success("Game Added");

            //set game null after adding new game
            setGame({
                gameTitle:'',
                description:'',
                googlePlayLink:''
            })
        }).catch(error => {
            console.log(error);
            toast.error("Something went wrong");
        })


    }


    ///
    useEffect(() => {
        
        ///get all categories
        getAllCategory().then((data) => {
            
            //set all categories
            setCategories(data);

        }).catch((error) => {
            console.log(error);
        })

    }, [game])

    return(
        <div className="wrapper">

            <Card className="shadow-sm my-4 mx-4">
                <CardBody>
                    {/* {JSON.stringify(game)} */}
                    <h3>Add Game</h3>

                    <Form onSubmit={handleFormSubmit}>
                        
                        {/* Game Title */}
                        <div className="my-3">
                            <Label for="gameTitle" >Game Title</Label>
                            <Input name="gameTitle" type="text" id="gameTitle" placeholder="Enter Game Title" className="rounded-0" onChange={fieldChanged}/>
                        </div>
                        
                        {/* Game Description */}
                        <div className="my-3">
                            <Label for="description" >Description</Label>
                            <Input name="description" type="textarea" id="description" placeholder="Enter Game Description" className="rounded-0" onChange={fieldChanged}/>
                        </div>

                        {/* Image Selector*/}
                        <div className="mt-3">
                            <Label for="image" >Select Game</Label>
                            <Input type="file" id="image" onChange={handleFileChange}/>
                        </div>

                        {/* Google Play Link */}
                        <div className="my-3">
                            <Label for="googlePlayLink" >Google Play Link</Label>
                            <Input name="googlePlayLink" type="text" id="googlePlayLink" placeholder="Enter Google play link" className="rounded-0" onChange={fieldChanged}/>
                        </div>

                        {/* Game Category */}
                        <div className="mt-3">
                            <Label for="category">Game Category</Label>
                            <Input type="select" id="category" className="rounded-0" name="categoryId" onChange={fieldChanged}>
                                <option disabled selected>--SELECT--</option>

                                {
                                    categories && categories.map((category) => (
                                        <option value={category.categoryId} id={category.categoryId}>{category.categoryTitle}</option>
                                    ))
                                }
                            </Input>
                        </div>

                        <Container className="text-center my-4">
                            <Button type="submit" className="rounded-0" color="primary">Add Game</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )

}

export default AddGame;
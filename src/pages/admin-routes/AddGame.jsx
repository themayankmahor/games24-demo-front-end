import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label, Table } from "reactstrap";
import { getAllCategory } from "../../services/category-service";
import { doAddGame, doUploadGameBannerImage, doUploadGameScreenShot1Image, doUploadGameScreenShot2Image, doUploadGameScreenShot3Image, doUploadGameScreenShot4Image, doUploadGameSquareImage } from "../../services/game-service";
import { toast } from "react-toastify";
import { doGetAllTags } from "../../services/tag-service";
import Base from "../../components/Base";

const AddGame = () => {

  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);

  ///Games
  const [games, setGames] = useState([
    {
      gameTitle: "",
      description: "",
      googlePlayLink: "",
      appleStoreLink:"",
      steamLink:"",
      bannerImage:"",
      squareImage:"",
      screenShot1:"",
      screenShot2:"",
      screenShot3:"",
      screenShot4:"",
      categoryId: "",
      tagId:"",
    },
  ]);

  ///Handle game change fields
  const handleGameChange = (index, field, value) => {

    const updatedGames = [...games];
    updatedGames[index][field] = value;
    console.log(games);
    setGames(updatedGames);
  };

  ///Add new Row
  const addGameRow = () => {
    setGames([
      ...games,
      {
        gameTitle: "",
        description: "",
        googlePlayLink: "",
        appleStoreLink:"",
        steamLink:"",
        bannerImage:"",
        squareImage:"",
        screenShot1:"",
        screenShot2:"",
        screenShot3:"",
        screenShot4:"",
        categoryId: "",
        tagId:"",
      },
    ]);
  };

  ///Remove row
  const removeGameRow = (index) => {
    const updatedGames = [...games];
    updatedGames.splice(index, 1);
    console.log(games);
    setGames(updatedGames); 
  };

  ///Handle Form Submit
  const handleFormSubmit = async (event) => {
    // Prevent default behavior of the form
    event.preventDefault();
  
    try {
      for (let i = 0; i < games.length; i++) {
        console.log(games[i].bannerImage);
        
        // Add games
        const data = await doAddGame(games[i]);
  
        console.log(games[i]);

        if (games[i].bannerImage)
        {
          // Upload game image
          const bannerImageData = await doUploadGameBannerImage(games[i]?.bannerImage, data.gameId);
        }

        if (games[i].squareImage)
        {
          // Upload game image
          const squareImageData = await doUploadGameSquareImage(games[i]?.squareImage, data.gameId);
        }
  
        if (games[i].screenShot1)
        {
          // Upload game image
          const ss1ImageData = await doUploadGameScreenShot1Image(games[i]?.screenShot1, data.gameId);
        }
  
        if (games[i].screenShot2)
        {
          // Upload game image
          const ss2ImageData = await doUploadGameScreenShot2Image(games[i]?.screenShot2, data.gameId);
        }
  
        if (games[i].screenShot3)
        {
          // Upload game image
          const ss3ImageData = await doUploadGameScreenShot3Image(games[i]?.screenShot3, data.gameId);
        }
  
        if (games[i].screenShot4)
        {
          // Upload game image
          const ss4ImageData = await doUploadGameScreenShot4Image(games[i]?.screenShot4, data.gameId);
        }
  
        // toast.success(imageData);
        toast.success("Game Added!!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding game");
    }
  };


  //Load categories when page loads first time
  useEffect(() => {

    ///Get Tags
    doGetAllTags().then((data) => {

      //set tags
      setTags(data);

    }).catch((error) => {

      console.log(error);
    })

    //get categories
    getAllCategory()
      .then((data) => {

        //set categories
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array to ensure it runs only once

  return (

    <Base>
          <div className="wrapper p-4">
      <h2>Add Games</h2>
      <Form onSubmit={handleFormSubmit}>
        {/* {JSON.stringify(games)} */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Game Title</th>
              <th>Description</th>
              <th>Add Links</th>
              <th>Add Images</th>
              <th>Choose Category</th>
              <th>Choose Tag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index}>
                <td>
                  <Input
                    type="text"
                    value={game.gameTitle}
                    onChange={(e) => handleGameChange(index, "gameTitle", e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    type="textarea"
                    value={game.description}
                    onChange={(e) => handleGameChange(index, "description", e.target.value)}
                  />
                </td>
                <td>
                  <Input
                  placeholder="Add Play Store Link"
                    type="text"
                    value={game.googlePlayLink}
                    onChange={(e) => handleGameChange(index, "googlePlayLink", e.target.value)}
                  />
                  <Input
                  placeholder="Add Apple Store Link"
                    type="text"
                    value={game.appleStoreLink}
                    onChange={(e) => handleGameChange(index, "appleStoreLink", e.target.value)}
                  />
                  <Input
                  placeholder="Add Steam Link"
                    type="text"
                    value={game.steamLink}
                    onChange={(e) => handleGameChange(index, "steamLink", e.target.value)}
                  />
                </td>
                <td>
                  <Label>Banner Image</Label>
                  <Input
                    id="image"
                    type="file"
                    name="bannerImage"
                    onChange={(e) => handleGameChange(index, "bannerImage", e.target.files[0])}
                  />
                  <Label>Square Image</Label>
                  <Input
                    id="image"
                    type="file"
                    name="squareImage"
                    onChange={(e) => handleGameChange(index, "squareImage", e.target.files[0])}
                  />
                  <Label>ScreenShot 1</Label>
                  <Input
                    id="image"
                    type="file"
                    name="screenShot1"
                    onChange={(e) => handleGameChange(index, "screenShot1", e.target.files[0])}
                  />
                  <Label>ScreenShot 2</Label>
                  <Input
                    id="image"
                    type="file"
                    name="screenShot2"
                    onChange={(e) => handleGameChange(index, "screenShot2", e.target.files[0])}
                  />
                  <Label>ScreenShot 3</Label>
                  <Input
                    id="image"
                    type="file"
                    name="screenShot3"
                    onChange={(e) => handleGameChange(index, "screenShot3", e.target.files[0])}
                  />
                  <Label>ScreenShot 4</Label>
                  <Input
                    id="image"
                    type="file"
                    name="screenShot4"
                    onChange={(e) => handleGameChange(index, "screenShot4", e.target.files[0])}
                  />
                </td>
                <td>
                  <Input
                    id="category"
                    type="select"
                    name="categoryId"
                    onChange={(e) => handleGameChange(index, "categoryId", e.target.selectedOptions[0].value)}
                  >
                  <option disabled selected>--SELECT--</option>
                  {
                    categories && categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
                    ))
                  }
                  </Input>
                </td>
                <td>
                  <Input
                    id="tag"
                    type="select"
                    name="tagId"
                    onChange={(e) => handleGameChange(index, "tagId", e.target.selectedOptions[0].value)}
                  >
                  <option disabled selected>--SELECT--</option>
                  {
                    tags && tags.map((tag) => (
                        <option key={tag.tagId} value={tag.tagId}>{tag.tagTitle}</option>
                    ))
                  }
                  </Input>
                </td>
                <td>
                  <Button color="danger" onClick={() => removeGameRow(index)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button style={{marginRight:'10px'}} color="primary" onClick={addGameRow}>
          Add Row
        </Button>
        <Button color="success" type="submit">
          Add Game(s)
        </Button>
      </Form>
    </div>
    </Base>
    
  );
};

export default AddGame;
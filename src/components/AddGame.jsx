import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Table } from "reactstrap";
import { getAllCategory } from "../services/category-service";
import userContext from "../context/userContext";
import { doAddGame, doUploadGameImage } from "../services/game-service";
import { toast } from "react-toastify";

const AddGame = () => {

  const userContextData = useContext(userContext);
  const [categories, setCategories] = useState(null);

  ///Games
  const [games, setGames] = useState([
    {
      gameTitle: "",
      description: "",
      googlePlayLink: "",
      imageName:"",
      categoryId: "",
    },
  ]);

  ///Handle game change fields
  const handleGameChange = (index, field, value) => {


    // const updatedGames = [...games];

    // if (field === "imageName" && value) {
    //   // Handle image file
    //   const fileName = value.name;
    //   updatedGames[index][field] = fileName;
    // } else {
    //   // Handle other fields
    //   updatedGames[index][field] = value;
    // }
    // console.log(updatedGames[index]);
    // setGames(updatedGames);
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
        imageName:"",
        categoryId: "",
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
        console.log(games[i].imageName);
        
        // Add games
        const data = await doAddGame(games[i]);
  
        console.log(games[i]);

        if (games[i].imageName)
        {
          // Upload game image
          const imageData = await doUploadGameImage(games[i]?.imageName, data.gameId);
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

    //call get categories
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
    <div className="wrapper p-4">
      <h2>Add Games</h2>
      <Form onSubmit={handleFormSubmit}>
        {/* {JSON.stringify(games)} */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Game Title</th>
              <th>Description</th>
              <th>Google Play Link</th>
              <th>Add Image</th>
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
                    type="text"
                    value={game.googlePlayLink}
                    onChange={(e) => handleGameChange(index, "googlePlayLink", e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    id="image"
                    type="file"
                    name="imageName"
                    onChange={(e) => handleGameChange(index, "imageName", e.target.files[0])}
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
                  <Button color="danger" onClick={() => removeGameRow(index)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color="primary" onClick={addGameRow}>
          Add Game
        </Button>
        <Button color="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddGame;
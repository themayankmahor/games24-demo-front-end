import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Table, Button, Form } from "react-bootstrap";
import { doCreateClients, doDeleteClientTestimony, getAllClients } from "../../services/client-service";
import { toast } from "react-toastify";
import Client from "../../components/Client";

const AddClients = () => {

  const [clients, setClients] = useState([
    {
        clientName: "", 
        testimony: ""
    },
  ]);

  const [allClients, setAllClients] = useState([]);
  const [refreshPage, setRefreshPage] = useState(true);

  ///Handle client change
  const handleClientChange = (index, field, value) => {
    const updatedClients = [...clients];
    updatedClients[index][field] = value;
    setClients(updatedClients);
  };


  ///Add client row
  const addClientRow = () => {
    setClients([...clients, { clientName: "", testimony: "" }]);
  };


  ///Remove client row
  const removeClientRow = (index) => {
    const updatedClients = [...clients];
    updatedClients.splice(index, 1);
    setClients(updatedClients);
  };


  ///handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted clients:", clients);

    //create clients
    doCreateClients(clients).then(data => {

      //
      toast.success("Clients Added !!!");
      
      //reset Clients
      setClients([
        {
            clientName: "", 
            testimony: ""
        },
      ])
      setRefreshPage(true);
    }).catch(error => {
      console.log(error);
    })
  };

     ///Delete Tag
     const deleteClientTestimony = (clientTestimony) => {

      doDeleteClientTestimony(clientTestimony.id).then((data) => {

          toast.success("Client Testimony Deleted !!!");

          setRefreshPage(true);
          // let newClients = clientTestimony.filter(c => c.id != clientTestimony.id)
          // setAllClients([...newClients]);

      }).catch((error) => {
          console.log(error)
          toast.error("Something went wrong while deleting client testimony !!");
      })
  }

  ///Use effect
  useEffect(() => {
    
    if (refreshPage)
    {
      ///get all client testimonys
      getAllClients().then((data) => {

        //set clients
        setAllClients(data);
      }).catch((error) => {

        toast.error();
      })
      setRefreshPage(false);
    }

  }, [refreshPage])

  return (
    <Base>
      <div className="p-5">
        <h2>Add Clients</h2>
        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Testimony</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                    {/* Client Name */}
                  <td>
                    
                    <Form.Control
                      type="text"
                      value={client.clientName}
                      onChange={(e) => handleClientChange(index, "clientName", e.target.value)}
                    />
                  </td>

                  {/* Testimony */}
                  <td>
                    <Form.Control
                      type="text"
                      value={client.testimony}
                      onChange={(e) => handleClientChange(index, "testimony", e.target.value)}
                    />
                  </td>
                  {/* Remove Row Button */}
                  <td>
                    <Button variant="danger" onClick={() => removeClientRow(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="m-3" variant="primary" onClick={addClientRow}>
            Add Row
          </Button>
          <Button variant="success" type="submit">
            Add Client(s)
          </Button>
        </Form>
      </div>
          {/* All Client */}
        <div className="p-5">
        <div>
            <h1>All Client Testimony ({allClients.length})</h1>
        </div>
        {
            allClients.map((client, index) => (

                <Client client={client} key={index} deleteClient={deleteClientTestimony} />
            ))
        }
        </div>
    </Base>
  );
};

export default AddClients;
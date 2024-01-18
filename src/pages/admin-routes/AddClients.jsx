import React, { useState } from "react";
import Base from "../../components/Base";
import { Table, Button, Form } from "react-bootstrap";
import { doCreateClients } from "../../services/client-service";
import { toast } from "react-toastify";

const AddClients = () => {

  const [clients, setClients] = useState([
    {
        clientName: "", 
        testimony: ""
    },
  ]);

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

    }).catch(error => {
      console.log(error);
    })
  };

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
          <Button variant="primary" onClick={addClientRow}>
            Add Client
          </Button>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Base>
  );
};

export default AddClients;
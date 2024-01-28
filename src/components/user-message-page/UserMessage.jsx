import { useState } from "react";
import { Button, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const UserMessage = ({ message = { userMessageId: -1, name: "Default Name", email: "Default Email", message: "Default Message" }, deleteMessage }) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const closeBtn = (
        <Button className="close" onClick={toggleModal}>
            &times;
        </Button>
    );

    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{message.name}</h1>
                <CardText>
                    {message.message.substring(0,10)}...
                </CardText>
                <div>
                    <Button className="mx-2" color="success" onClick={toggleModal}>View Full</Button>

                    {/* Modal */}
                    <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal} close={closeBtn}>
                            {/* Name */}
                            <h3>{message.name}</h3>
                            
                            {/* Email */}
                            <h6>{message.email}</h6>
                        </ModalHeader>
                        <ModalBody>
                            {message.message}
                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-center">
                            <Button color="secondary" onClick={toggleModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    {/* Delete btn */}
                    <Button className="mx-2" color="danger" onClick={() => deleteMessage(message)}>
                        Delete
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default UserMessage;
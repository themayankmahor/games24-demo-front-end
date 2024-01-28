import { Button, Card, CardBody, CardHeader, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import Base from "../components/Base";
import { BASE_URL } from "../services/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doCreateUserMessage } from "../services/user-message-service";

const Contact = () => {

    ///user message details
    const [userMessage, setUserMessage] = useState(
        {
            name:'',
            email:'',
            message:''
        }
    );

    ///errors
    const [error, setError] = useState(
        {
            errors:{},
            isError:false,
        }
    );

    ///handle form event changes
    const handleEventChange = (event, field) => {

        let actualValue = event.target.value;

        console.log(userMessage);
        //reset errors
        setError({
            errors:{},
            isError:false
        })

        //set user message details
        setUserMessage({
            ...userMessage,
            [field]:actualValue
        })
        
    }

    ///Handle form submit
    const handleFormSubmit = (event) => {

        //stop default behaviour of form
        event.preventDefault();

        //handle error
        

        // //validate form data
        // if (userMessage.name.trim() == '')
        // {
        //     toast.error("Name is required !!!");
        //     return;
        // }

        //call server API
        doCreateUserMessage(userMessage).then((data) => {

            //
            console.log(data);
            toast.success("Message is sent...");

        }).catch((error) => {

            console.log(error);

            //set errors
            setError({
                errors:error,
                isError:true
            })
        })
    }

    return(
        <Base>
            {/* Banner Image */}
            <img className='' src={BASE_URL+'/games/image/banner.jpg'} style={{maxWidth:'100%'}} alt="Logo" />

            <div className="black-background">

            {/* Contact */}
            <h1 className="mb-5" style={{fontWeight:'bold', fontSize:'80px'}}>Contact</h1>

            {/* Email */}
            <div>
                <h1 className="p-2">Email : <a href="">@enteryouremail</a></h1>
                <h1 className="p-2">Twitter : <a href="">@enter</a></h1>
            </div>

            {/* Send Us a Message */}
            <div>

            </div>
                {/* Heading */}
                <h1 className="py-5" style={{fontSize:'50px'}}>Send Us a Message</h1>

                    {/* Form */}
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            {/* Name */}
                            <Label for="name"><h2>Name</h2></Label>
                            <Input 
                            className="rounded-0"
                            type="text" 
                            id="name" 
                            placeholder="Enter your Name"
                            value={userMessage.name}
                            onChange={(e) => handleEventChange(e, 'name')}
                            invalid={error.errors?.response?.data?.name ? true : false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.name}
                            </FormFeedback>

                            {/* Email */}
                            <Label className="pt-4" for="email"><h2>Email</h2></Label>
                            <Input 
                            className="rounded-0"
                            type="email" 
                            id="email" 
                            placeholder="Enter Your Email"
                            value={userMessage.email}
                            onChange={(e) => handleEventChange(e, 'email')}
                            invalid={error.errors?.response?.data?.email ? true : false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.email}
                            </FormFeedback>

                            {/* Text Area */}
                            <Label className="pt-4" for="message"><h2>Message</h2></Label>
                            <Input
                            className="rounded-0"
                            type="textarea"
                            id="message"
                            placeholder="Write a message..."
                            value={userMessage.message}
                            onChange={(e) => handleEventChange(e, 'message')}
                            invalid={error.errors?.response?.data?.message ? true : false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.message}
                            </FormFeedback>
                        </FormGroup>

                        {/* Buttons */}
                        <Container className="text-center pt-5">
                            <Button className="rounded-0" 
                            style={{width:'100px', height:'50px', fontSize:'20px', fontWeight:'bold'}} outline 
                            color="light">
                                Login
                                </Button>
                        </Container>
                    </Form>
            </div>
        </Base>
    )

}

export default Contact;
import { useContext, useState } from "react";
import userContext from "../context/userContext";
import Base from "../components/Base";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { doLoginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const userContextData = useContext(userContext);
    const [loginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    })

    ///change handler [email & password]
    const handleChange = (event, field) => {
        let actualValue = event.target.value;

        console.log(loginDetail)
        //set login details
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })

    }

    ///Reset form handler
    const handleReset = () => {

        //reset login detail
        setLoginDetail({
            username:'',
            password:''
        })
    }

    ///form submit handler
    const handleFormSubmit = (event) => {
        event.preventDefault();

        //validate
        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '')
        {
            toast.error("Email or Password is required !!");
            return;
        }

        ///submit the data to server to generate token
        doLoginUser(loginDetail).then((data) => {
            console.log(data);

            //save data to localstorage
            doLogin(data, () => {
                console.log("Login data is saved to local storage");

                //update user provider [global val]
                userContextData.setUser({
                    data:data.user,
                    login:true
                })

                ///navigate to (ADMIN) dashboard page
                navigate("/admin/dashboard");
            })

            toast.success("Successfully Logged In");
        }).catch((error) => {

            console.log(error);

            //
            if (error.response.status == 400 || error.response.status == 404)
            {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong on server");
            }

        })
        
    }

    return (
        <Base>
            <Container>
                <Row className="my-4">
                    <Col>
                    {/* Card */}
                    <Card color="dark" inverse>
                        {/* Header */}
                        <CardHeader>
                            <h3>Login</h3>
                        </CardHeader>

                        {/* Body */}
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    {/* Email */}
                                    <Label for="email">Email</Label>
                                    <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter your Email"
                                    value={loginDetail.username}
                                    onChange={(e) => handleChange(e, 'username')}
                                    />

                                    {/* Password */}
                                    <Label for="password">Password</Label>
                                    <Input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter Password"
                                    value={loginDetail.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                    />
                                </FormGroup>

                                {/* Buttons */}
                                <Container className="text-center">
                                    <Button outline color="light">Login</Button>
                                    <Button className="ms-2" color="danger" type="reset" onClick={handleReset}>Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    )

}

export default Login;
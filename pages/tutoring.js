import React from 'react';
import { Container, Row, Form, Button }  from 'react-bootstrap';

import NavPlus from '../components/navplus';
import PageHeader from '../components/pageheader';
import TutorExperience from '../components/tutorExperience';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'secretToken',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response;//.json(); // parses JSON response into native JavaScript objects
}

class Tutoring extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: ' ',
            Email: ' ',
            Username: ' ',
            Tutor: false,
            Tutee: false,
            Python: false,
            PythonExp: ' ',
            SQL: false,
            SQLExp: ' ',
            Java: false,
            JavaExp: ' ',
            JavaScript: false,
            JavScriptExp: ' ',
            Bash: false,
            BashExp: ' ',
            R: false,
            RExp: ' ',
            Justification: ' '
        }

        this.handleChange = this.handleChange.bind(this);
    }

    checkType(target) {
        switch(target.type) {
            case "checkbox":
                return target.checked
            case "radio":
                return target.value
            default:
                return target.value
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = this.checkType(event.target)

        this.setState({
            [name]: value
        })
    }

    submitTutorData = (event) => {
        console.log(JSON.stringify(this.state))
        postData('https://46mkh28k2e.execute-api.ap-southeast-2.amazonaws.com/PROD/', this.state)
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
        event.preventDefault();
      }

    render() {
    return (<>
		<NavPlus></NavPlus>

        <PageHeader pageTitle="Tutoring">
        </PageHeader>

		<Container>
            <Row>

                <Form onSubmit={this.submitTutorData}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="name" 
                            name="Name"
                            placeholder="Please enter your name"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="Email"
                            placeholder="Please enter your email"
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                            
                    <Form.Group className="mb-3" controlId="formPurpose">
                        <Form.Label>Tutoring Purpose</Form.Label>
                        <Form.Check 
                            type="checkbox" 
                            label="Looking for a Tutor" 
                            name="Tutee" 
                            id="Tutee" 
                            checked={this.state.Tutee}
                            onChange={this.handleChange}
                        />
                        {this.state.Tutee && 
                            <Container>
                                <i>
                                    <p>Please join the Data Science with Daniel Discord at: [
                                        <a href="https://www.datasciencewithdaniel.com.au" target="_blank"> 
                                            #welcome
                                        </a>
                                        ] to be connected with a Tutor!
                                    </p>
                                </i>
                            </Container>
                        }
                        <Form.Check 
                            inline type="checkbox" 
                            label="Wanting to be a Tutor" 
                            name="Tutor" 
                            id="Tutor" 
                            checked={this.state.Tutor}
                            onChange={this.handleChange}
                        />
                        {this.state.Tutor && 
                            <Container>
                                <i>
                                    <p>Please join the Tutoring Channel on Discord at: [
                                        <a href="https://www.datasciencewithdaniel.com.au" target="_blank"> 
                                            #tutoring
                                        </a>
                                        ] for Tutoring matches!
                                    </p>
                                </i>
                            </Container>
                        }
                    </Form.Group>

                    {(this.state.Tutor || this.state.Tutee) &&
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Discord Username</Form.Label>
                        <Form.Control 
                            type="name" 
                            name="Username"
                            placeholder="Please enter your Discord Username for matching purposes"
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            Please join the Data Science with Daniel Discord prior to submitting this form
                        </Form.Text>
                    </Form.Group>
                    }

                    <Form.Group> 
                    <Form.Label>Language Selection</Form.Label>
                        <Form.Check 
                            type="checkbox" 
                            label="Python" 
                            name="Python" 
                            id="Python" 
                            checked={this.state.Python}
                            onChange={this.handleChange}
                        />
                        {this.state.Python && this.state.Tutor && 
                            <TutorExperience language="Python" onChange={this.handleChange}></TutorExperience>
                        }
                        <Form.Check 
                            type="checkbox" 
                            label="SQL" 
                            name="SQL" 
                            id="SQL" 
                            checked={this.state.SQL}
                            onChange={this.handleChange}
                        />
                        {this.state.SQL && this.state.Tutor && 
                            <TutorExperience language="SQL" onChange={this.handleChange}></TutorExperience>
                        }
                        <Form.Check 
                            type="checkbox" 
                            label="Java" 
                            name="Java" 
                            id="Java" 
                            checked={this.state.Java}
                            onChange={this.handleChange}
                        />
                        {this.state.Java && this.state.Tutor && 
                            <TutorExperience language="Java" onChange={this.handleChange}></TutorExperience>
                        }
                        <Form.Check 
                            type="checkbox" 
                            label="JavaScript" 
                            name="JavaScript" 
                            id="JavaScript" 
                            checked={this.state.JavaScript}
                            onChange={this.handleChange}
                        />
                        {this.state.JavaScript && this.state.Tutor && 
                            <TutorExperience language="JavScript" onChange={this.handleChange}></TutorExperience>
                        }
                        <Form.Check 
                            type="checkbox" 
                            label="Bash" 
                            name="Bash" 
                            id="Bash"
                            checked={this.state.Bash}
                            onChange={this.handleChange}
                        />
                        {this.state.Bash && this.state.Tutor && 
                            <TutorExperience language="Bash" onChange={this.handleChange}></TutorExperience>
                        }
                        <Form.Check 
                            type="checkbox" 
                            label="R" 
                            name="R" 
                            id="R" 
                            checked={this.state.R}
                            onChange={this.handleChange}
                        />
                        {this.state.R && this.state.Tutor && 
                            <TutorExperience language="R" onChange={this.handleChange}></TutorExperience>
                        }
                    </Form.Group>

                    {this.state.Tutor &&
                        <Form.Group className="mb-3" controlId="TutorText">
                            <Form.Label>Please briefly explain why you should be accepted as a Tutor for Data Science with Daniel</Form.Label>
                            <Form.Control
                                as="textarea" 
                                rows={3}
                                name="Justification"
                                onChange={this.handleChange} 
                            />
                        </Form.Group>
                    }

                    <br/>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>

            </Row>
        </Container>

    </>)
}}

export default Tutoring;

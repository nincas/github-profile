import React, { Component } from 'react';
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Container, FormContainer } from './includes/StyledComponents'
import { 
    Button, 
    Form,
    FormControl,
    Toast,
    Col,
    Row,
    Spinner,
    Card,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

const DivCode = styled.div`
    background: rgba(0, 0, 0, 0.8);
    color: #fff !important;
    width: 600px;
    min-width: 600px;
    height: 400px;
    min-height: 400px;
    padding: 5px;
    overflow: auto;
    border-radius: 1em;

    pre {
        color: #fff;
        font-family: Fira Code;
        font-size: 11px;
    }
`

export default class Home extends Component {
    constructor () {
        super()
        this.state = {
            github: null,
            showToast: false,
            status: '...'
        }
    }

    handleSubmit (e) {
        let githubUrl = "https://api.github.com/users/"
        
        e.preventDefault()
        let data = Object.values(e.target.elements).filter((element, i) => {
            return element.value !== ""
        }).map((el, i) => {
            return {
                [el.name]: el.value
            }
        })

        this.setState({
            status: 'fetching'
        })
        
        let user = data[0].username;

        fetch(githubUrl + user)
        .then(data => data.json()) 
        .then(data => {
            this.setState({
                github: data,
                showToast: true
            })
        })
    }

    render () {
        const toggleToast = () => {
            this.setState(prevState => ({ showToast: !prevState.showToast }))
        }

        return (
            <Container>
                <Helmet>
                    <title>Github fetcher</title>
                </Helmet>
                <Row>
                    <Col>
                        <FormContainer>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label className="text-muted">Github</Form.Label>
                                    <FormControl name="username" size="sm" type="text" placeholder="Github username"/>
                                </Form.Group>
            
                                <Button size="sm" variant="dark" type="submit">Fetch</Button>
                            </Form>
                        </FormContainer>
                        <br/>
                        {
                            this.state.github != null ?
                            <Toast show={this.state.showToast} onClose={toggleToast}>
                                <Toast.Header>
                                    <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded mr-2"
                                    alt=""
                                    />
                                    <strong className="mr-auto">Github</strong>
                                    <small>{(new Date()).toLocaleTimeString()}</small>
                                </Toast.Header>
                                <Toast.Body>Done fetching</Toast.Body>
                            </Toast>
                            :
                            ''
                        }
                    </Col>
                    
                    <Col md={3}>
                        { this.state.github ? 
                        
                        <Card style={{ width: '300px' }}>
                            <Card.Img variant="top" src={this.state.github.avatar_url} />
                            <Card.Body>
                                <Card.Title>{this.state.github.login}</Card.Title>
                                <Card.Text>
                                    {this.state.github.bio ? this.state.github.bio : '...'}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>Full Name:</b> {this.state.github.name}</ListGroupItem>
                                <ListGroupItem><b>Location:</b> {this.state.github.location}</ListGroupItem>
                                <ListGroupItem><b>Repositories (public):</b> {this.state.github.public_repos}</ListGroupItem>
                                <ListGroupItem><b>Opportunity (open?):</b> {this.state.github.hireable ? "yes" : "no"}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href={this.state.github.html_url} target="_blank">
                                    Github
                                </Card.Link>
                            </Card.Body>
                        </Card>
                        
                        : this.state.status === 'fetching' ? <Spinner animation="grow" variant="dark"/> : 'Nothing to show.'
                        }
                    </Col>

                    <Col>
                        <DivCode>
                            <pre>
                                { this.state.github ? JSON.stringify(this.state.github, null, 2) : this.state.status === 'fetching' ? <Spinner animation="border" variant="light"/> : '' }
                            </pre>
                        </DivCode>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}
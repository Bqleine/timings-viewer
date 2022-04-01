import './App.css';
import {Container, Form, Navbar} from "react-bootstrap";
import {Component} from "react";
import TimingsViewer from "./TimingsViewer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rawTiming: "",
        };
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand>Baleine's Timings Viewer</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container>
                    <Form.Group className={"pt-3"}>
                        <h3>Raw Timing</h3>
                        <Form.Control as={"textarea"} size={"sm"} rows={10} onChange={(event) => this.updateState(event)}/>
                    </Form.Group>

                    <h3 className={"pt-3"}>Formatted Timing</h3>
                    <TimingsViewer timings={this.state.rawTiming}/>
                </Container>
            </div>
        );
    }

    updateState(event) {
        this.setState({
            rawTiming: event.target.value
        });
    }
}

export default App;

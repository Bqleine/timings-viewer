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
            <Container>
	    <br />
            <h1>Baleine's Timing viewer</h1>
	    <p>This is a website to display raw pocketmine generated timings as a table.</p>
	    <p>Paste your timings into the text field to start or use <a href="https://timings.pmmp.io/?id=302455&raw=1" target="_blank">an example timing</a>.</p>
	    <p>You can click on table headers to sort and on table rows to view details if available.</p>
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

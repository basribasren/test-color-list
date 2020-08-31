import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ColorBox from './component/color-box'
import './App.css'
import COLOR from './_DATA/color.json'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ListColor: [],
            ListGroup: [],
            OldList: [],
            validated: false,
            SelectedGroup: '',
            saturate: false,
        }
        this.filterColor = this.filterColor.bind(this)
        this.generateColor = this.generateColor.bind(this)
        this.handleSaturate = this.handleSaturate.bind(this)
    }

    // this will filter the list color by group that user choose
    async filterColor(event) {
        const newList = await this.state.OldList.filter(
            (color) => color.group === event.target.value
        )
        this.setState({ ListColor: newList })
    }

    // this will generate list color for the content
    async generateColor() {
        let ListColor = []
        let ListGroup = []
        let i = 0
        await COLOR.colorGroups.map((group) => {
            ListGroup.push(group.groupName)
            group.colors.map((color) => {
                if (i < 40) {
                    i++
                    ListColor.push({
                        group: group.groupName,
                        name: color.name,
                        color: color.color,
                    })
                }
                return null
            })
            return null
        })
        return this.setState({
            ListColor: ListColor,
            OldList: ListColor,
            ListGroup: ListGroup,
        })
    }

    //this will set the saturate effect apply or not
    handleSaturate(event) {
        this.setState({ saturate: event.target.checked })
    }

    // for the first mount of component will cal the generateColor Function
    componentDidMount() {
        this.generateColor()
    }

    render() {
        // this will display the list of color
        const listBox = this.state.ListColor.map((color, i) => {
            return (
                <Col key={i}>
                    <ColorBox
                        color={color.color}
                        handleSaturate={this.handleSaturate}
                        saturate={this.state.saturate}
                    />
                </Col>
            )
        })
        //this will display the form filter

        return (
            <Container>
                <Row lg={12}>
                    <Col>
                        <Form.Row>
                            <Form.Group controlId="formSelectGroup" as={Col}>
                                <Form.Label>Group Color</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.filterColor}
                                    value={this.state.SelectedGroup}
                                >
                                    {this.state.ListGroup.map((group, i) => {
                                        return (
                                            <option key={i} value={group}>
                                                {group}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGridCheckbox" as={Col}>
                                <Form.Label>Saturate</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="saturate"
                                    onChange={this.handleSaturate}
                                    defaultChecked={false}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={this.generateColor}
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
                <Row lg={5} md={4}>
                    {listBox}
                </Row>
            </Container>
        )
    }
}

export default App

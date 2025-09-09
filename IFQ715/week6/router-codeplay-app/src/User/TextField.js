import { Col, Form } from 'react-bootstrap';

export default function TextField({
    text,
    placeholder,
    type,
    size,
    Component = Form.Control,
}) {
    let id = `input${text}`;
    return (
        <Col md={size}>
        <Form.Label htmlFor={id} column="sm-2">
            {text}
        </Form.Label>
        <Component type = {type} id={id} placeholder={placeholder} />
        </Col>
    )
}

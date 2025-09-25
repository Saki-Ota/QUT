import { Col, Form } from "react-bootstrap";

export default function SelectField({
  text,
  options,
  size,
  Component = Form.Select,
  value,
  onChange,
}) {
  let id = `select${text}`;
  return (
    <Col md={size}>
      <Form.Label htmlFor={id} column="sm-2">
        {text}
      </Form.Label>
      <Component
        id={id}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        <option value="">Open this select menu</option>

        {options &&
          options.map((option) => <option key={option} value={option}>{option}</option>)}
      </Component>
    </Col>
  );
}

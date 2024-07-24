import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Card, Button } from 'react-bootstrap';

const AlternativeCountSchema = Yup.object().shape({
    count: Yup.number().required('Required').min(1, 'Must be at least 1')
});

const AlternativeCountInput = ({ onSubmit }) => {
    return (
        <Card>
            <Card.Body>
                <h2>Enter Number of Alternatives</h2>
                <Formik
                    initialValues={{ count: 1 }}
                    validationSchema={AlternativeCountSchema}
                    onSubmit={(values) => onSubmit(values.count)}
                >
                    {() => (
                        <Form>
                            <div className="form-group">
                                <Field name="count" type="number" placeholder="Number of Alternatives" className="form-control" />
                            </div>
                            <Button type="submit" className="mt-3">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default AlternativeCountInput;

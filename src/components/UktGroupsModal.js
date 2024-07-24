import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UktGroupsSchema = Yup.object().shape({
    uktGroups: Yup.array().of(Yup.number().required('Required')).min(1)
});

const UktGroupsModal = ({ show, onHide, onSubmit, numberOfGroups }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Jumlah Kelompok UKT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ uktGroups: Array(numberOfGroups).fill('') }}
                    validationSchema={UktGroupsSchema}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values.uktGroups);
                        resetForm();
                    }}
                >
                    {() => (
                        <Form>
                            {Array.from({ length: numberOfGroups }).map((_, i) => (
                                <div className="form-group mb-2" key={i}>
                                    <Field
                                        name={`uktGroups.${i}`}
                                        placeholder={`Kelompok ${i + 1}`}
                                        type="number"
                                        className="form-control"
                                    />
                                </div>
                            ))}
                            <Button type="submit" className="mt-3">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default UktGroupsModal;

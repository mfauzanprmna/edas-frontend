import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UktGroupsModal from './UktGroupsModal'; // Ensure the correct import path

const AlternativeSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    scores: Yup.array().of(Yup.number().required('Required'))
});

const AlternativeModal = ({ show, onHide, criteria, onSubmit, index }) => {
    const [showUktModal, setShowUktModal] = useState(false);
    const [numberOfUktGroups, setNumberOfUktGroups] = useState(0);

    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values);
        resetForm();

        // Extract number of UKT groups from scores.1 field
        const uktGroupsCount = values.scores[1] || 0;
        setNumberOfUktGroups(uktGroupsCount);

        // Hide the Alternative modal and show the UKT modal
        setShowUktModal(true);
    };

    const handleUktGroupsSubmit = (groups) => {
        // Handle the UKT groups submission
        console.log("UKT Groups:", groups);
        setShowUktModal(false); // Hide the UKT modal
        // Optionally, you can re-show the Alternative modal if needed
        // onHide(); // Optionally hide AlternativeModal
        // onShow(); // Optionally show AlternativeModal again
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Alternative {index + 1}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            scores: Array(criteria.length).fill('')
                        }}
                        validationSchema={AlternativeSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="form-group">
                                    <Field
                                        name="name"
                                        placeholder="Nama"
                                        className="form-control mb-2"
                                    />
                                </div>
                                {criteria.map((c, i) => (
                                    <div className="form-group mb-2" key={i}>
                                        <Field
                                            name={`scores.${i}`}
                                            placeholder={c.name}
                                            type={c.type}
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

            <UktGroupsModal
                show={showUktModal}
                onHide={() => setShowUktModal(false)}
                onSubmit={handleUktGroupsSubmit}
                numberOfGroups={numberOfUktGroups}
            />
        </>
    );
};

export default AlternativeModal;

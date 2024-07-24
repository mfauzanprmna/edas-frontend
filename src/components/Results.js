import React from 'react';
import { Table } from 'react-bootstrap';

const Results = ({ results }) => {
    return (
        <div>
            <h2>Results</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Alternative</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.name}</td>
                            <td>{result.score}</td>
                            <td>{result.ranking}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Results;

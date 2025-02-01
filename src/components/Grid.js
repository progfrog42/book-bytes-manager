import React from 'react';
import {Container, Row} from "react-bootstrap";

const Grid = ({ children }) => {
    return (
        <Container>
            <Row>
                {children}
            </Row>
        </Container>
    );
};

export default Grid;
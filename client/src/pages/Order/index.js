import React, { useState } from 'react';
import withStore from '~/hocs/withStore';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import orderModel from '~s/order';
import cartModel from '~s/cart';

function Order(props) {

    let [showModal, setStatus] = useState(false);

    let show = () => {
        setStatus(true)
    }

    let hide = () => {
        setStatus(false)
    }

    let confirm = () => {
        orderModel.send().then(() => {
            hide();
            props.history.push(routesMap.main);
        });
    }


    let formFields = [];
    let products = cartModel.products;
    let infoDetailed = products.map((item, i) => {
        return (
            <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
            </tr>
        );

    });
    for (let name in orderModel.formData) {
        let field = orderModel.formData[name];

        formFields.push(
            <Form.Group key={name} controlId={'order-form-' + name}>
                <Form.Label>{props.t(field.label)}</Form.Label>
                <Form.Control
                    type="text"
                    value={field.value}
                    onChange={(e) => orderModel.change(name, e.target.value)}
                />
                {field.valid === null || field.valid ? '' :
                    <Form.Text className="text-muted">
                        {props.t(field.errorText)}
                    </Form.Text>
                }
            </Form.Group>
        );
    }
    return (
        <div>
            <h3>{props.t('order')}</h3>
            <hr />
            <Form>
                {formFields}
            </Form>
            <Link className="btn btn-warning" to={routesMap.home}>
                {props.t('back')}
            </Link>
            &nbsp;
                <Button variant="primary"
                onClick={show}
                disabled={!orderModel.formValid && cartModel.total >= 0}>
                {props.t('apply')}
            </Button>
            <Modal show={showModal} backdrop="static" onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.t('check')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>{props.t('title')}</td>
                                <td>{props.t('price')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {infoDetailed}
                        </tbody>
                    </Table>
                    <strong>{props.t('total')}: {cartModel.total}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hide}>
                        {props.t('back')}
                    </Button>
                    <Button variant="primary" onClick={confirm}>
                        {props.t('allRight')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )


}

export default withStore(Order);
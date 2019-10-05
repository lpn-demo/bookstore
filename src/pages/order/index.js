import React from 'react';
import withStore from '~/hocs/withStore';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';


class Order extends React.Component {


    state = {
        showModal: false
    }

    show = () => {
        this.setState({ showModal: true });
    }

    hide = () => {
        this.setState({ showModal: false });
    }

    confirm = () => {
        this.props.stores.order.send().then(() => {
            this.hide();
            this.props.history.push(routesMap.main);
        });
    }


    render() {
        let orderModel = this.props.stores.order;
        let cartModel = this.props.stores.cart;
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
                    <Form.Label>{this.props.t(field.label)}</Form.Label>
                    <Form.Control
                        type="text"
                        value={field.value}
                        onChange={(e) => orderModel.change(name, e.target.value)}
                    />
                    {field.valid === null || field.valid ? '' :
                        <Form.Text className="text-muted">
                            {this.props.t(field.errorText)}
                        </Form.Text>
                    }
                </Form.Group>
            );
        }

        return (
            <div>
                <h3>{this.props.t('order')}</h3>
                <hr />
                <Form>
                    {formFields}
                </Form>
                <Link className="btn btn-warning" to={routesMap.home}>
                    {this.props.t('back')}
                </Link>
                &nbsp;
                <Button variant="primary"
                    onClick={this.show}
                    disabled={!orderModel.formValid && cartModel.total >= 0}>
                    {this.props.t('apply')}
                </Button>
                <Modal show={this.state.showModal} backdrop="static" onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.t('check')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>{this.props.t('title')}</td>
                                    <td>{this.props.t('price')}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {infoDetailed}
                            </tbody>
                         </Table>
                            <strong>{this.props.t('total')}: {cartModel.total}</strong>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.hide}>
                                {this.props.t('back')}
                            </Button>
                            <Button variant="primary" onClick={this.confirm}>
                                {this.props.t('allRight')}
                            </Button>
                        </Modal.Footer>
                </Modal>
            </div>
                )
        
            }
        }
        
export default withStore(Order);
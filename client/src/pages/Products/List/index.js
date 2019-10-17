import React from 'react';
import { Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import { urlBuilder } from '~/routes';
import { Link } from 'react-router-dom';

import withStore from '~/hocs/withStore';
import styles from './styles.module.sass';
import Pagination from '~c/products/pagination';
import DatePicker from "react-datepicker";

import productModel from '~s/products';
import cartModel from '~s/cart';
import autorizationModel from '~s/autorization';
import adminModel from '~s/admin';


import "react-datepicker/dist/react-datepicker.css";

import {ThemeContext} from '~/theme';

class Products extends React.Component {
    static contextType = ThemeContext;

    goUpdate = (id) => {
        let url = urlBuilder('update', { id: id });
        this.props.history.push(url);
    }

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }

    loadPage() {
        const page = parseInt(this.props.match.params.id) || 1;
        if (page !== productModel.page) {
            productModel.setNewPage(page);
        }
    }

    render() {
        let theme = this.context;
        
        let pag = productModel.pager.pages;
        let option = productModel.pageSizeVarian.map((item) => {
            return <option key={item}>{item}</option>
        });

        let panelNav = <>
            <div className='col-12'>
                <Form inline>
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder={this.props.t('search')}
                        onChange={(e) => productModel.doSearch(e.target.value)}
                        defaultValue={productModel.search}
                    />
                    <span className={styles.span}>{this.props.t('number')}:</span>
                    <Form.Control as="select" size="sm" onChange={(e) => productModel.setPageSize(e.target.value)}>
                        {option}
                    </Form.Control>
                </Form>
            </div>
            <div className='col-md-12'>
                <div className={styles.datePickerWraper}>
                    <span className={styles.span}>{this.props.t('from')}: </span>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={productModel.startDate}
                        onChange={date => productModel.setStartDate(date)}
                        selectsStart
                        startDate={productModel.startDate}
                        endDate={productModel.endDate}
                        className={styles.dataPiker}
                    />
                </div>
                <div className={styles.datePickerWraper}>
                    <span className={styles.span}>{this.props.t('to')}: </span>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={productModel.endDate}
                        onChange={date => productModel.setEndDate(date)}
                        selectsEnd
                        endDate={productModel.endDate}
                        minDate={productModel.startDate}
                        className={styles.dataPiker}
                    />
                </div>
                <Button variant="outline-dark"
                    size='sm'
                    onClick={() => productModel.clearFilter()}
                >
                    {this.props.t('clean')}
                </Button>

            </div>

        </>



        let productsCards = productModel.products.map((product) => {
            let btn, adminControl;

            if (autorizationModel.role == 'admin') {
                adminControl =
                    <Card.Footer className={styles.center}>
                        <ButtonGroup aria-label="Basic example" size="sm">
                            <Button variant={theme.danger}
                                onClick={() => adminModel.remove(product._id)}

                            >
                                {this.props.t('delete')}
                            </Button>

                            <Button variant={theme.success}
                                onClick={() => this.goUpdate(product._id)}

                            >
                                {this.props.t('update')}
                            </Button>
                        </ButtonGroup>
                    </Card.Footer>
                    ;
            }



            if (cartModel.inCart(product._id)) {
                btn = <Button variant={theme.danger}
                    onClick={() => cartModel.remove(product._id)}
                    disabled={product._id in cartModel.processId}
                >
                    {this.props.t('remove')}
                </Button>
            }
            else {
                btn = <Button variant={theme.success}
                    onClick={() => cartModel.add(product._id)}
                    disabled={product._id in cartModel.processId}
                >
                    {this.props.t('add')}
                </Button>
            }


            return <div className={'col-md-4 ' + styles.col}
                    key={product._id}
                >
                    <Card>
                        <Card.Header>{product.title}</Card.Header>
                        <Card.Body className={styles.center}>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                {this.props.t('genre')}: {product.genre}
                            </Card.Text>
                            <Card.Text>
                                {this.props.t('author')}: {product.author}
                            </Card.Text>
                            <Card.Text>
                                <strong>{this.props.t('price')}: {product.price}</strong>
                            </Card.Text>
                            <Link to={urlBuilder('product', { id: product._id })}>
                                {this.props.t('more')}
                            </Link>
                            <hr />
                            {btn}
                        </Card.Body>
                        {adminControl}
                    </Card>
                </div>
        });


        return (
            <div className={styles.wrapper}>
                <div className="row">
                    {panelNav}
                </div>
                <div className="row">
                    {productsCards}
                </div>
                <hr />

                <Pagination pages={pag}
                    currentPage={productModel.pager.currentPage}
                    totalPages={productModel.pager.totalPages}
                    linkComponent={Link}
                />

            </div>



        )

    }
}



export default withStore(Products);
import React from 'react';
import withStore from '~/hocs/withStore';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import cartModel from '~s/cart';
class Cart extends React.Component {
    render() {

        let productsRows = cartModel.products.map((product, i) => {
            return (
                <tr key={product._id}>
                    <td>{i + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button variant="danger"
                            onClick={() => cartModel.remove(product._id)}
                            disabled={product._id in cartModel.processId}
                        >
                            {this.props.t('remove')}
                        </Button>

                    </td>
                </tr>
            );
        });


        return (
            <div>
                <h2>{this.props.t('cart')}</h2>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{this.props.t('title')}</td>
                            <td>{this.props.t('price')}</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsRows}
                    </tbody>
                </table>
                <h3>{this.props.t('total')}: {cartModel.total}</h3>
                <hr />
                <Link to={routesMap.order} className="btn btn-primary">
                    {this.props.t('order')}
                </Link>

            </div>
        )
    }
}

export default withStore(Cart);
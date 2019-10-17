import React from 'react';
import withStore from '~/hocs/withStore';
import { Link } from 'react-router-dom';
import E404 from '~c/errors/404';
import { routesMap } from '~/routes';
import ProductItem from '~c/products/item';
import productModel from '~s/products';
import cartModel from '~s/cart';

class Product extends React.Component {
    render(){
        let id = this.props.match.params.id;
        let product = productModel.getById(id);
        let cart = cartModel;
        if(product === null){
            return <E404/>
        }
        else{
            return <ProductItem 
                        title={product.title} 
                        price={product.price} 
                        genre={product.genre} 
                        author={product.author}
                        backUrl={routesMap.home} 
                        linkComponent={Link}
                        inCart={cart.inCart(product._id)}
                        onAdd={() => cart.add(product._id)}
                        onRemove={() => cart.remove(product._id)}
                    />
        }
    }
}

export default withStore(Product);
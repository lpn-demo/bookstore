import React from 'react';
import withStore from '~/hocs/withStore';
import { Form, Button } from 'react-bootstrap';
import E404 from '~c/errors/404';

class Action extends React.Component {

    componentDidMount(){
        let productModel = this.props.stores.admin;
        let id = this.props.match.params.id;
        productModel.getOneProduct(id);
    }

    update = () => {
        let productModel = this.props.stores.admin;
        let id = this.props.match.params.id;
        productModel.update(id);
    }
    render() {
        
        let productModel = this.props.stores.admin;
        let formFields = [];

        if(productModel.flag){
            return <E404/>
        }
        else{
            for(let name in productModel.formData){
                let field = productModel.formData[name];
                
                formFields.push(
                    <Form.Group key={name} controlId={'order-form-' + name}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={field.value}
                            onChange={(e) => productModel.change(name, e.target.value)}
                        />
                        {field.valid === null || field.valid ? '' : 
                            <Form.Text className="text-muted">
                                {field.errorText}
                            </Form.Text>
                        }
                    </Form.Group>
                );
            }
        }
        
        return (
            <div>
                <hr/>
                <h4>{this.props.t('updPost')}</h4>
                <hr/>
               {formFields}

               <Button variant="primary" 
                        onClick={this.update}
                        disabled={!productModel.formValid}
                        >
                        {this.props.t('update')}
                </Button>

            </div>
        )
    }
}

export default withStore(Action);
import React from 'react';
import withStore from '~/hocs/withStore';
import { Form, Button } from 'react-bootstrap';

import productModel from '~s/admin';

class Action extends React.Component {
    
    componentDidMount(){
        productModel.clear();
    }
    

    render() {
        let formFields = [];

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
        return (
            <div>
                <hr/>
                <h4>{this.props.t('addNewPost')}</h4>
                <hr/>
               {formFields}
               
               <Button variant="primary" 
                        onClick={productModel.add} 
                        disabled={!productModel.formValid}
                        >
                        {this.props.t('add')}
                </Button>

            </div>
        )
    }
}

export default withStore(Action);
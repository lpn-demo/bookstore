import React from 'react';
import withStore from '~/hocs/withStore';
import { routesMap } from '~/routes';
import { Form, Button } from 'react-bootstrap';
import styles from "~p/Autorization/styles.module.sass";
import autorModel from '~s/autorization';
class Registration extends React.Component {
    
    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }
    loadPage = () => {
        if (autorModel.access) {
            this.props.history.push(routesMap.main);
        }
    }

    render() {
        let formFields = [];
        for (let name in autorModel.formDataReset) {
            let field = autorModel.formDataReset[name];
            
            formFields.push(
                <Form.Group key={name} controlId={'order-form-' + name}>
                    <Form.Label>{this.props.t(field.label)}</Form.Label>
                    <Form.Control
                        type={field.type}
                        value={field.value}
                        onChange={(e) => autorModel.change(name, e.target.value, "reset")}
                    />
                </Form.Group>
            );
        }


        return (
            <div>
                <div className={styles.login}>
                    <form onSubmit={(e)=> autorModel.updatePassword(e)}>
                    <h3 className={styles.title}>{this.props.t('reset')}</h3>
                        {formFields}
                        <Button
                           block
                           disabled={!autorModel.formValidReset}
                           type="submit"
                        >
                            {this.props.t('reset')}
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withStore(Registration);
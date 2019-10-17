import React from 'react';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import withStore from '~/hocs/withStore';
import { Form, Button } from 'react-bootstrap';
import styles from "~p/Autorization/styles.module.sass";
import autorModel from '~s/autorization';
class Login extends React.Component {

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
        for (let name in autorModel.formDataLogin) {
            let field = autorModel.formDataLogin[name];
            
            formFields.push(
                <Form.Group key={name} controlId={'order-form-' + name}>
                    <Form.Label>{this.props.t(field.label)}</Form.Label>
                    <Form.Control
                        type={field.type}
                        value={field.value}
                        onChange={(e) => autorModel.change(name, e.target.value, "login")}
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
                <div className={styles.login}>
                    <form onSubmit={autorModel.login}>
                        <h3 className={styles.title}>{this.props.t('login')}</h3>
                        {formFields}
                        <Button
                            block
                            disabled={!autorModel.formValid}
                            type="submit"
                        >
                            {this.props.t('login')}
                        </Button>
                        <Link to={routesMap.reset}>{this.props.t('updatePassword')}</Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default withStore(Login);
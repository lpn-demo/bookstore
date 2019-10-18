import React from 'react';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import withStore from '~/hocs/withStore';
import { Form, Button } from 'react-bootstrap';
import styles from "~p/Autorization/styles.module.sass";
import autorModel from '~s/autorization';

import { Formik } from 'formik';


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
        let formFields;
        formFields = <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'required';
                } else if (
                    !/^.+@.+$/.test(values.email)
                ) {
                    errors.email = 'wrong email';
                }

                if (!values.password) {
                    errors.password = 'required';
                } else if (

                    !(values.password.length > 6)
                ) {
                    errors.password = 'password length';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                autorModel.login(values);
                setSubmitting(false);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>{this.props.t('email')}</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.email && touched.email && errors.email)}
                            </Form.Text>

                            <Form.Label>{this.props.t('password')}</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.password && touched.password && errors.password)}
                            </Form.Text>

                        </Form.Group>

                        <Button type="submit" disabled={isSubmitting}>
                            {this.props.t('login')}
                        </Button><br />
                        <Link to={routesMap.reset}>{this.props.t('updatePassword')}</Link>
                    </form>
                )}
        </Formik>

        return (
            <div className={styles.login}>
                <h3 className={styles.title}>{this.props.t('login')}</h3>
                {formFields}
            </div>
        )
    }
}

export default withStore(Login);
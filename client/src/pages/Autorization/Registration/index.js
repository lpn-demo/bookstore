import React from 'react';
import withStore from '~/hocs/withStore';
import { routesMap } from '~/routes';
import { Form, Button } from 'react-bootstrap';
import styles from "~p/Autorization/styles.module.sass";
import autorModel from '~s/autorization';
import { Formik } from 'formik';
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
        let formFields;
        formFields = <Formik
            initialValues={{ email: '', password: '', name: '', surname: '' }}
            validate={values => {
                let errors = {};
                if (!values.name) {
                    errors.name = 'required';
                } else if (
                    !/^[aA-zZ аА-яЯ]{2,}$/.test(values.name)
                ) {
                    errors.name = 'only characters';
                }
                if (!values.surname) {
                    errors.surname = 'required';
                } else if (
                    !/^[aA-zZ аА-яЯ]{2,}$/.test(values.surname)
                ) {
                    errors.surname = 'only characters';
                }

                if (!values.email) {
                    errors.email = 'required';
                } else if (
                    !/^.+@.+$/.test(values.email)
                ) {
                    errors.email = '@';
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
                autorModel.registration(values);
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
                        <Form.Label>{this.props.t('name')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.name && touched.name && errors.name)}
                            </Form.Text>

                            <Form.Label>{this.props.t('surname')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.surname && touched.surname && errors.surname)}
                            </Form.Text>

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
                            {this.props.t('registration')}
                        </Button>
                    </form>
                )}
        </Formik>

        return (
            <div className={styles.login}>
                <h3 className={styles.title}>{this.props.t('registration')}</h3>
                {formFields}
            </div>
        )
    }
}

export default withStore(Registration);
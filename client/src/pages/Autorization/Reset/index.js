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
            initialValues={{ email: '', oldpassword: '', newpassword: '' }}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'required';
                } else if (
                    !/^.+@.+$/.test(values.email)
                ) {
                    errors.email = 'wrong email';
                }

                if (!values.oldpassword) {
                    errors.oldpassword = 'required';
                } else if (
                    !(values.oldpassword.length > 6)
                ) {
                    errors.oldpassword = 'password length';
                }


                if (!values.newpassword) {
                    errors.newpassword = 'required';
                } else if (
                    !(values.newpassword.length > 6)
                ) {
                    errors.newpassword = 'password length';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                autorModel.updatePassword(values);
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

                            <Form.Label>{this.props.t('oldpassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.oldpassword}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.oldpassword && touched.oldpassword && errors.oldpassword)}
                            </Form.Text>

                            <Form.Label>{this.props.t('newpassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                name="newpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newpassword}
                            />
                            <Form.Text className="text-muted">
                                {this.props.t(errors.newpassword && touched.newpassword && errors.newpassword)}
                            </Form.Text>

                        </Form.Group>

                        <Button type="submit" disabled={isSubmitting}>
                            {this.props.t('reset')}
                        </Button>
                    </form>
                )}
        </Formik>

        return (
            <div className={styles.login}>
                <h3 className={styles.title}>{this.props.t('reset')}</h3>
                {formFields}
            </div>
        )
    }



   
}

export default withStore(Registration);
import React from 'react';
import withStore from '~/hocs/withStore';
import { Alert } from 'react-bootstrap';
import styles from './styles.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Notifications extends React.Component {
    render() {
        let model = this.props.stores.notification;

        let messages = model.list.map((note) => {
            return (
                <CSSTransition key={note.id}
                    classNames={{
                        enter: styles.itemEnter,
                        enterActive: styles.itemEnterActive,
                        exitActive: styles.itemLeaveActive
                    }}
                    timeout={500}
                >
                    <Alert variant={note.type}  >
                        {this.props.t(note.message)}
                    </Alert>
                </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={styles.box}>
                {messages}
            </TransitionGroup>
        );
    }
}

export default withStore(Notifications);
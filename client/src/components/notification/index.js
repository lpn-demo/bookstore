import React from 'react';
import withStore from '~/hocs/withStore';
import { Alert } from 'react-bootstrap';
import styles from './styles.module.sass';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import notificationModel from '~s/notification';

class Notifications extends React.Component {
    render() {
        let model = notificationModel;

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
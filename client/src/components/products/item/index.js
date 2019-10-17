import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import styles from './styles.module.sass';
import Description from '~c/description'
import { ThemeContext } from '~/theme';


function Item(props) {
    let btn;

    let [descriptionVisible, setVisible] = useState(false);


    let toggleDescription = (visibility) => {

        setVisible(visibility);
        const desc = document.querySelector('#itemDescription');
        if (visibility) {
            desc.classList.add('visible')
        } else {
            desc.classList.remove('visible')
        }
    }


    if (props.inCart) {
        btn =
            <ThemeContext.Consumer>
                {({ danger }) => (
                    <Button variant={danger} onClick={props.onRemove}>
                        {props.t('remove')}
                    </Button>
                )}
            </ThemeContext.Consumer>

    }
    else {
        btn =
            <ThemeContext.Consumer>
                {({ success }) => (
                    <Button variant={success} onClick={props.onRemove}>
                        {props.t('add')}
                    </Button>
                )}
            </ThemeContext.Consumer>
    }

    
    return (
        <div>
            <h1
                onMouseEnter={(e) => toggleDescription(true)}
                onMouseLeave={(e) => toggleDescription(false)}>
                {props.title}
            </h1>
            <hr />
            <div className={styles.block}>
                <div>
                    <strong>{props.t('price')}: {props.price}</strong>
                </div>
                <props.linkComponent to={props.backUrl}>{props.t('back')}</props.linkComponent>
                <p>{props.t('genre')}: {props.genre} </p>
                <p>{props.t('author')}: {props.author}</p>
                {btn}
            </div>


            {
                descriptionVisible
                    ? <Description price={props.price} /> : null
            }
        </div>
    );
}

export default withTranslation()(Item);
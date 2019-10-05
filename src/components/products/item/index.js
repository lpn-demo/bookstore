import React from 'react';
import { Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

function Item (props){
    let btn;

    if(props.inCart){
        btn = <Button variant="danger" onClick={props.onRemove}>
            {props.t('remove')}
        </Button>
    }
    else{
        btn = <Button variant="success" onClick={props.onAdd}>
            {props.t('add')}
        </Button>
    }
    
    return (
        <div>
            <h1>{props.title}</h1>
            <hr/>
            <div>
                <strong>{props.t('price')}: {props.price}</strong> 
            </div>
            <props.linkComponent to={props.backUrl}>{props.t('back')}</props.linkComponent>
            <p>{props.t('genre')}: {props.genre} </p>
            <p>{props.t('author')}: {props.author}</p>
            {btn}
        </div>
    );
}

export default withTranslation()(Item);
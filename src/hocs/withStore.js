import {observer, inject} from 'mobx-react';

import { withTranslation } from 'react-i18next';

export default function(Component){
    return withTranslation()(inject('stores')(observer(Component)));
}
import {observer} from 'mobx-react';

import { withTranslation } from 'react-i18next';

export default function(Component){
    return withTranslation()(observer(Component));
}
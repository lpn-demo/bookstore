import React from 'react';
import withStore from '~/hocs/withStore';
import {withState} from 'recompose';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import routes, { routesMap, urlBuilder } from '~/routes';
import Header from '~c/header';
import styles from './styles.module.sass';
import productModel from '~s/products';
import cartModel from '~s/cart';
import autorizationModel from '~s/autorization';

import Notifications from '~c/notification';

import { ThemeContext, themes } from '~/theme';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faShoppingCart, faGlobe, faShoppingBag, faCog, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faShoppingCart, faGlobe, faShoppingBag, faCog, faChevronRight, faChevronLeft);


class App extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.dark
        };
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
    }


    render() {
        let iconHome = <FontAwesomeIcon icon="home" />;
        let shoppingBag = <FontAwesomeIcon icon="shopping-bag" />;
        let shoppingcartIcon = <FontAwesomeIcon icon="shopping-cart" />;
        let cogIcon = <FontAwesomeIcon icon="cog" />;
        let iconArrow;
        let toggle = " ";
        if (this.props.open) {
            iconArrow = <FontAwesomeIcon icon="chevron-right" />;
            toggle += styles.toggled;

        } else {
            iconArrow = <FontAwesomeIcon icon="chevron-left" />;
            toggle += ' ';
        }

        let routesComponents = routes.map((route) => {
            return <Route path={route.url}
                component={route.component}
                exact={route.exact}
                key={route.url}
            />
        });
        let adminControl;
        if (autorizationModel.role == 'admin') {
            adminControl = <>
                <li className={`list-group-item ` + styles.listItem}>
                    <NavLink to={routesMap.add} activeClassName={styles.active}>
                        {this.props.t('addnewpost')} {cogIcon}
                    </NavLink>
                </li>

            </>
        }

        return (
            <Router>
                <Notifications />

                <div className="navSide">
                    <ThemeContext.Provider value={this.state.theme}>
                        <Header
                            cartCnt={cartModel.cartCnt}
                            access={autorizationModel.access}
                            userName={autorizationModel.userName}
                            changeLang={(lang) => productModel.changeLang(lang)}
                            logout={() => autorizationModel.logout()}
                            changeTheme={this.toggleTheme}
                        />
                    </ThemeContext.Provider>

                </div>


                <div className={styles.wrapper}>

                    {/* side bar */}
                    <div className={styles.sidebarWrapper + toggle}>
                        <ul className="list-group list-group-flush">
                            <li className={`list-group-item ` + styles.listItem}>
                                <NavLink to={urlBuilder('home', { id: 1 })} exact activeClassName={styles.active}>
                                    {this.props.t('home')} {iconHome}
                                </NavLink>
                            </li>
                            <li className={`list-group-item ` + styles.listItem}>
                                <NavLink to={routesMap.cart} activeClassName={styles.active}>
                                    {this.props.t('cart')} {shoppingcartIcon}
                                </NavLink>
                            </li>
                            <li className={`list-group-item ` + styles.listItem}>
                                <NavLink to={routesMap.order} activeClassName={styles.active}>
                                    {this.props.t('order')} {shoppingBag}
                                </NavLink>
                            </li>
                            {adminControl}
                            <li className={`list-group-item ` + styles.listItem} onClick={() => this.props.setOpen(!this.props.open)}>
                                {iconArrow}
                            </li>
                        </ul>


                    </div>
                    {/* side bar end*/}

                    {/* Content  */}
                    <ThemeContext.Provider value={this.state.theme}>
                        <div className={styles.contentWrapper}>
                            <div className='container-fluid'>
                                <Switch>
                                    <Route exact path="/" render={() => (<Redirect to="/page/1" />)} />
                                    {routesComponents}
                                </Switch>
                            </div>
                        </div>
                    </ThemeContext.Provider>

                </div>
            </Router>
        )
    }
}

export default withState('open', 'setOpen', false)(withStore(App));
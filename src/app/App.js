import React from 'react';
import withStore from '~/hocs/withStore';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import routes, { routesMap, urlBuilder } from '~/routes';
import Header from '~c/header';
import { withTranslation } from 'react-i18next';
import styles from './styles.module.css';


import Notifications from '~c/notification';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faShoppingCart, faGlobe, faShoppingBag, faCog, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faShoppingCart, faGlobe, faShoppingBag, faCog, faChevronRight, faChevronLeft);


class App extends React.Component {

    state = {
        toggle: false
    }

    toggleSideBar = () => {
        let flag = this.state.toggle ? false : true;
        this.setState({ toggle: flag });
    }

    render() {
        
        let iconHome = <FontAwesomeIcon icon="home" />;
        let shoppingBag = <FontAwesomeIcon icon="shopping-bag" />;
        let shoppingcartIcon = <FontAwesomeIcon icon="shopping-cart" />;
        let cogIcon = <FontAwesomeIcon icon="cog" />;
        let iconArrow;
        let toggle = " ";
        if (this.state.toggle) {
            iconArrow = <FontAwesomeIcon icon="chevron-right" />;
            toggle += styles.toggled;

        } else {
            iconArrow = <FontAwesomeIcon icon="chevron-left" />;
            toggle += ' ';
        }


        let cartModel = this.props.stores.cart;
        let productModel = this.props.stores.products;
        let autorizationModel = this.props.stores.autorization;
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

                    <Header
                        cartCnt={cartModel.cartCnt}
                        access={this.props.stores.autorization.access}
                        userName={this.props.stores.autorization.userName}
                        changeLang={(lang) => productModel.changeLang(lang)}
                        logout={() => this.props.stores.autorization.logout()}
                    />
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
                            <li className={`list-group-item ` + styles.listItem} onClick={() => this.toggleSideBar()}>
                                {iconArrow}
                            </li>
                        </ul>


                    </div>
                    {/* side bar end*/}

                    {/* Content  */}
                    <div className={styles.contentWrapper}>
                        <div className='container-fluid'>
                            <Switch>
                                <Route exact path="/" render={() => (<Redirect to="/page/1" />)} />
                                {routesComponents}
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default withTranslation()(withStore(App));
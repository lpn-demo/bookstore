import React from 'react';
import { routesMap } from '~/routes';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withTranslation } from 'react-i18next';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faShoppingCart, faGlobe } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faShoppingCart, faGlobe);



function Header(props) {
    const globeIcon = <FontAwesomeIcon icon="globe" />;
    const shoppingcartIcon = <FontAwesomeIcon className={styles.shoppingcartIcon} icon="shopping-cart" />;

    function setRu() {
        props.i18n.changeLanguage('ru');
        props.changeLang('ru');
    }
    function setEn() {
        props.i18n.changeLanguage('en');
        props.changeLang('en');
    }
    let navLink;
    if (!props.access) {
        navLink = <>
            <LinkContainer to={routesMap.login}>
                <Nav.Link>{props.t('login')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={routesMap.registration}>
                <Nav.Link>{props.t('registration')}</Nav.Link>
            </LinkContainer>

        </>
    } else {
        navLink = <>
            <Navbar.Text>
                {props.t('signed')}: <span className={styles.user}>{props.userName}</span>
            </Navbar.Text>
            <Nav.Link onClick={props.logout}>{props.t('logout')}</Nav.Link>
        </>
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><Link to={routesMap.main} className={styles.logo}><span></span>BookStore</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className={styles.link}>
                        {navLink}

                        <NavDropdown className={styles.dropdown} title={globeIcon} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={setRu}>RU</NavDropdown.Item>
                            <NavDropdown.Item onClick={setEn}>EN</NavDropdown.Item>
                        </NavDropdown>

                        <Navbar.Text>
                            {shoppingcartIcon} : {props.cartCnt}
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>

    );
}




export default withTranslation()(Header);
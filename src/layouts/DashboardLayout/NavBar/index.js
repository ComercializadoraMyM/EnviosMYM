import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../../utils';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Edit,
  BookOpen,
  Users,
  Package,
  LogOut,
  Archive,
  FilePlus
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/logo.png',
};

const items = [
  {
    href: '/app/guides-view',
    icon: BookOpen,
    title: 'Ver Guias'
  },
  {
    href: '/app/add-guia',
    icon: Edit,
    title: 'Adicion Guia'
  },
  {
    href: '/app/clients-view',
    icon: Users,
    title: 'Clientes'
  },
  {
    href: '/app/tracking-view',
    icon: Package,
    title: 'Entradas'
  },
  {
    href: '/app/envios-view',
    icon: Archive,
    title: 'Envios nacional'
  }, 
  {
    href: '/app/add-envios',
    icon: FilePlus,
    title: 'Agregar Envios'
  },
  
  {
    href: '/',
    onclick: logout,
    icon: LogOut,
    title: 'Cerrar Sesion'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={item.onclick}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          MYM EXPRESS GLOBAL
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          7774 NW 64th St, MIAMI-FLORIDA 33166
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;

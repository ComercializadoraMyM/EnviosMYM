import React, {useEffect} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CollapsibleGuides from './CollapsibleGuides';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  tit: {
    color: 'black',
    margin: '20px'
  },
}));

const CustomerListView = () => {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("type") !== "admin") {
      window.location.replace("/app/user-view")
    }
  }, []);

  return (
    <Page
      className={classes.root}
      title="Guides lista"
    >
      <Container maxWidth={false}>
        <Toolbar /> 
        <Box mt={3}>
          <CollapsibleGuides />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

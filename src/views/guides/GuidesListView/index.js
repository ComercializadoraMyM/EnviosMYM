import React from 'react';
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

  return (
    <Page
      className={classes.root}
      title="Guides lista"
    >
      <Container maxWidth={false}>
        <h2 className={classes.tit}>Lista de las Guias</h2>
        <Toolbar />
        <Box mt={3}>
          <CollapsibleGuides />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

import React from 'react';
import Page from 'src/components/Page';
import FormSeccion from 'src/components/FormSeccion';
import {
  Container,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  letter: {
    fontFamily: 'arial',
    fontSize: '10',
    margin: '20px'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Crear Guia"
    >
      <Container maxWidth={false}>
        <FormSeccion />
      </Container>
    </Page>
  );
};

export default ProductList;

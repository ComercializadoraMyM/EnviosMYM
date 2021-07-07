import React, {useEffect} from 'react';
import Page from 'src/components/Page';
import FormSeccion from 'src/components/EnviosForm';
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

  useEffect(() => {
    if (localStorage.getItem("type") !== "admin") {
      window.location.replace("/app/user-view")
    }
  }, []);
  
  return (
    <Page
      className={classes.root}
      title="Crear Envio Nacional"
    >
      <Container maxWidth={false}>
        <FormSeccion />
      </Container>
    </Page>
  );
};

export default ProductList;

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  butStyle: {
    marginTop: '10px',
    background: '#eaecf9'
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var [guiaBus, setGuiaBus] = React.useState("");

  const handleChangeGuiaBus = (event) => {
    guiaBus = event.target.value;
    setGuiaBus(guiaBus);
    console.log(guiaBus);
  };

  const [guias, setGuias] = React.useState();

  const handleChangeListaGuia = async() => {
    await fetch('http://localhost:3001/api/guia')
    .then(function(response) {
        return response.json();
    }).then(data=>{
      setGuias(data);
      console.log(JSON.stringify(guias));
    })
    .catch(function(err) {
        console.error(err);
    });
  };
  const [clientes, setCliente] = React.useState();

  const handleChangeListaCliente = async() => {
    await fetch('http://localhost:3001/api/cliente')
    .then(function(response) {
        return response.json();
    }).then(data=>{
      setCliente(data);
    })
    .catch(function(err) {
        console.error(err);
    });
  };

  const handleChangeGuia = (event) => {
    guias[event.target.id] = event.target.value;
    setGuias(guias);
    console.log(guias);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Card>
          <CardContent>
            <Box maxWidth={400}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar guia"
                variant="outlined"
                onChange={handleChangeGuiaBus}
              />
              <Button 
                variant="outlined" 
                color="secondary" 
                className={classes.butStyle}
                onClick={() => {
                  handleChangeListaGuia();
                  handleChangeListaCliente();
                  handleClickOpen();
                }}
              >
                Agregar Entrada
              </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-track"
                aria-describedby="alert-track"
                width="200px"
            >
                <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Detalle de la guia"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-track" className={classes.form}>
                        <p>
                          <strong>Flete:</strong> {clientes.nombre}
                        </p>
                        <p>
                          <strong>Seguro:</strong> 
                        </p>
                        <p>
                          <strong>Impuestos:</strong> 0
                        </p>
                        <br />
                        <p>
                            <strong>Total:</strong> 
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => {
                      handleChangeGuia();
                      handleClose();
                    }}
                    type="submit"
                    variant="outlined" 
                    color="primary"
                  >
                    Modificar
                  </Button>
                  <Button 
                    onClick={handleClose} 
                    variant="outlined" 
                    color="primary" 
                  >
                    Cerrar
                  </Button>
                </DialogActions>
            </Dialog>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

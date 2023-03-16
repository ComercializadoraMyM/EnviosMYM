import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  root: {
    width: '100%'
  },
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

  const [idIn, setIdIn] = React.useState(
    {
      id: {
        in: '',
      }
    }
  );

  const handleInput = (event) => {
    idIn[event.target.name][event.target.id] = event.target.value;
    setIdIn(idIn);
  };

  const URL = 'https://envios-api-service.onrenderappapp.com/api/envios';

  const [guias, setGuias] = React.useState({
    infGuia: {},
    datosEnvio: {}
  });

  const getDataSpecific = async (id) => {
    const response = await axios.get(`${URL}/${id}`)
    if (response.data.length > 0) {
      setGuias(response.data[0]);
    } else {
      setGuias({infGuia: {},
        datosEnvio: {}});
    }
  }

  const [openAdd, setOpenAdd] = React.useState(false);

  const handleCloseAdd = () => {
    setOpenAdd(false);
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
                id="in"
                name="id"
                onChange={handleInput}
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
                placeholder="Buscar envio"
                variant="outlined"
              />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.butStyle}
                onClick={() => {
                  handleClickOpen()
                  getDataSpecific(idIn.id.in)
                }}
              >
                Buscar Envio
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-track"
                aria-describedby="alert-track"
                width="200px"
              >
                <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Detalle del envio"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-track" className={classes.form}>
                    Numero de guia: {guias.datosEnvio.numGuia}
                    <br />
                      Fecha creacion: {guias.infGuia.fecha}
                    <br />
                      Valor: {guias.datosEnvio.valor}
                    <br />
                      Link de seguimiento: {guias.datosEnvio.link}
                    <br />
                      Nombre de transportadora: {guias.datosEnvio.transportadora}
                    <br />
                      Tipo de envio: {guias.datosEnvio.tipo}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Dialog
                  open={openAdd}
                  onClose={handleCloseAdd}
                  aria-labelledby="alert-track"
                  aria-describedby="alert-track"
                  width="200px"
                >
                  </Dialog>
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
  )
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

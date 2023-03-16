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
  MenuItem
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

  const nombreGuia = [
    {
      value: 'Bodega Miami',
      label: 'Bodega Miami',
    },
    {
      value: 'Transito',
      label: 'Transito',
    },
    {
      value: 'Bodega Bogota',
      label: 'Bodega Bogota',
    },
    {
      value: 'Espera Despacho',
      label: 'Espera Despacho',
    },
    {
      value: 'Entrega Cliente',
      label: 'Entrega Cliente',
    },
  ];

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

  const URL = 'https://envios-api-service.onrender.com/api/guias';

  const [guias, setGuias] = React.useState({
    "calculos": {},
    "destinatario": {},
    "infGuia": {},
    "vlrLiquidacion": {},
    "datosEnvio": {}
  });

  const getDataSpecific = async (id) => {
    const response = await axios.get(`${URL}/${id}`)
    if (response.data.length > 0) {
      setGuias(response.data[0])
    } else {
      setGuias({ "calculos": {}, "destinatario": {} });
    }
  }

  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openAddWHR, setOpenAddWHR] = React.useState(false);

  const handleClickOpenAddWHR = () => {
    setOpenAddWHR(true);
  };

  const handleCloseAddWHR = () => {
    setOpenAddWHR(false);
  };

  const [statusUpdate, setStatus] = React.useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  }

  const [whrUpdate, setwhr] = React.useState('');

  const handleChangewhr = (event) => {
    setwhr(event.target.value);
  }

  const handleChangeStatusBD = async () => {
    await fetch("https://envios-api-service.onrender.com/api/guias/" + statusUpdate + '/' + idUpdate, {
      method: 'POST',
    }).then(data => {
      console.log();
    });
  }

  const handleChangewhrBD = async () => {
    await fetch("https://envios-api-service.onrender.com/api/guias/whr/" + whrUpdate + '/' + idUpdate, {
      method: 'POST',
    }).then(data => {
    });
  }

  const [idUpdate, setId] = React.useState('');

  const handleEdit = async (id) => {
    setId(id);
  }

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
                placeholder="Buscar guia"
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
                Buscar Guia
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
                    Id: {guias._id}
                    <br />
                      Fecha Creacion: {guias.infGuia.fecha}
                    <br />
                      Nombre Destinatario: {guias.destinatario.nombre}
                    <br />
                      Peso: {guias.vlrLiquidacion.peso} {guias.vlrLiquidacion.undPeso}
                    <br />
                      Contenido: {guias.datosEnvio.descripcion}
                    <br />
                      Estado: {guias.status}
                    <br />
                      Valor declarado: {guias.vlrLiquidacion.vlrDeclarado}
                    <br />
                      Flete: {guias.calculos.flete}
                    <br />
                      Seguro: {guias.destinatario.vlrSeguro}
                    <br />
                      Impuestos: {guias.calculos.impuesto}
                    <br />
                      Total: {guias.calculos.total}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      handleEdit(guias._id);
                      handleClickOpenAddWHR();
                    }}
                  >
                    WHR
              </Button>
                  <Dialog
                    open={openAddWHR}
                    onClose={handleCloseAddWHR}
                    aria-labelledby="alert-track"
                    aria-describedby="alert-track"
                    width="200px"
                  >
                    <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Agregue WHR:"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-track" className={classes.form}>
                        <form>
                          <TextField
                            id="nomb"
                            name="infGuia"
                            className={classes.margin}
                            onChange={handleChangewhr}
                          >
                          </TextField>
                        </form>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          handleChangewhrBD();
                          handleCloseAddWHR();
                        }}
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        Cambiar
                      </Button>
                      <Button
                        onClick={handleCloseAddWHR}
                        variant="outlined"
                        color="primary"
                      >
                        Cerrar
                  </Button>
                    </DialogActions>
                  </Dialog>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      handleEdit(guias._id);
                      handleClickOpenAdd();
                    }}
                  >
                    Estado
                  </Button>
                  <Dialog
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="alert-track"
                    aria-describedby="alert-track"
                    width="200px"
                  >
                    <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Modifique el Estado:"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-track" className={classes.form}>
                        <TextField
                          id="nomb"
                          name="infGuia"
                          select
                          className={classes.margin}
                          onChange={handleChangeStatus}
                        >
                          {nombreGuia.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          handleChangeStatusBD();
                          handleCloseAdd();
                        }}
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        Cambiar
                        </Button>
                      <Button
                        onClick={handleCloseAdd}
                        variant="outlined"
                        color="primary"
                      >
                        Cerrar
                        </Button>
                    </DialogActions>
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

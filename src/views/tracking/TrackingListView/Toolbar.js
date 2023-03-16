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

  const URL = 'https://envios-api-service.onrenderapp.com/api/trackings';

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

  const [whrUpdate, setWhr] = React.useState('');

  const handleChangeWHR = (event) => {
    setWhr ('BOG '+event.target.value);
  }
  
  const handleChangeWHRBD = async() => {
    await fetch("https://envios-api-service.onrenderapp.com/api/trackings/"+whrUpdate+'/'+idUpdate, {
      method: 'POST', 
    }).then(data=>{
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
                Buscar Entrada
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
                    Id: {guias.track_id}
                    <br />
                      Fecha Creacion: {guias.fecha}
                    <br />
                      Nombre Cliente: {guias.nombreCliente}
                    <br />
                      Estado: {guias.whr}
                    <br />
                      Peso: {guias.peso}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
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
                  <DialogTitle id="alert-track" className={classes.dialogstyle}>
                    {"Agregue o Modifique el Estado:"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-track" className={classes.form}>
                      <TextField 
                        id="whr"
                        label="WHR"
                        type="datetime-local"
                        defaultValue={Date.now}
                        onChange={handleChangeWHR}
                        className={classes.margin}
                        InputLabelProps={{
                          shrink: true,
                        }}/>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      onClick={() => {
                        handleChangeWHRBD();
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

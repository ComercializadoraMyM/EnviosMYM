import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import {
    makeStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem,
    Snackbar,
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tiposID = [
    {
        value: 'CC',
        label: 'CC',
    },
    {
        value: 'NIT',
        label: 'NIT',
    },
    {
        value: 'CE',
        label: 'CE',
    },
    {
        value: 'NIP',
        label: 'NIP',
    },
    {
        value: 'TI',
        label: 'TI',
    },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
    dialogstyle: {
        alignSelf: 'center',
    },
    form: {
        textAlign: 'center'
    },
    butPrint: {
        marginTop: '10px',
        width: '200px',
        alignContent: 'right',
        marginLeft: '10px'
    },
    margin: {
        width: '300px'
    },
});

const URL = 'https://envios-api-service.onrenderappapp.com/api/clientes';

export default function BasicTable() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const [tipoID, setID] = React.useState('');

    const handleChangeID = (event) => {
        cliente.tipoid = event.target.value;
        setCliente(cliente);
        setID(event.target.value);
        console.log(cliente);
    };

    const handleChangeCliente = (event) => {
        cliente[event.target.id] = event.target.value;
        setCliente(cliente);
      };

    const handleChangeBD = async() => {
        var prueba = { "cliente": JSON.stringify(cliente) };
        await fetch("https://envios-api-service.onrenderappapp.com/api/clientes", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prueba)
        }).then(data=>{
        });
    }

    const [cliente, setCliente] = React.useState(
        {
            tipoid: '',
            numid: '',
            nombre: '',
            email: '',
            telefono: '',
            pais: '',
            ciudad: '',
            direccion: '',
            unidad: '',
            vlrUnidad: '',
            vlrSeguro: ''
        }
    );

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openT, setOpenT] = React.useState(false);

    const handleClickOpenT = () => {
        setOpenT(true);
    };

    const handleCloseT = () => {
        setOpenT(false);
    };

    const [openS, setOpenS] = React.useState(false);

    const handleClickOpenS = () => {
        setOpenS(true);
    };

    const handleCloseS = () => {
        setOpenS(false);
    };

    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    const [idUpdate, setId] = React.useState('');

    const handleEdit = async (id) => {
        setId(id);
    }

    const [tarNueva, setTar] = React.useState('');

    const handleTar = async (event) => {
        setTar(event.target.value);
    }

    const [segNueva, setSeg] = React.useState('');

    const handleSeg = async (event) => {
        setSeg(event.target.value);
    }

    const [dirNueva, setDir] = React.useState('');

    const handleDir = async (event) => {
        setDir(event.target.value);
    }

    const handleChangeTarBD = async() => {
        await fetch("https://envios-api-service.onrenderappapp.com/api/clientes/tarifa/"+tarNueva+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }

    const handleChangeSegBD = async() => {
        await fetch("https://envios-api-service.onrenderappapp.com/api/clientes/seguro/"+segNueva+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }

    const handleChangeDirBD = async() => {
        await fetch("https://envios-api-service.onrenderappapp.com/api/clientes/direccion/"+dirNueva+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }

    const [openCarga, setOpenCarga] = React.useState(false);
    
    const handleClickCarga = async () => {
    setOpenCarga(true);
    };

    const handleCloseCarga = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenCarga(false);
    };

  return (
    <TableContainer component={Paper}>
        <Button 
            variant="outlined" 
            color="primary"  
            onClick={handleClickOpen} 
            className={classes.butPrint}
          >
              Agregar Cliente
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="200px"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogstyle}>{"Datos del cliente nuevo:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.form}>
                      <TextField
                        id="tipoid"
                        name="destinatario"
                        className={clsx(classes.margin)}
                        select
                        label="Tipo identificacion"
                        value={tipoID}
                        onChange={handleChangeID}
                      >
                        {tiposID.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField id="numid" name="destinatario" label="Numero identificacion" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="nombre" name="destinatario" label="Nombre" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="email" name="destinatario" label="Email" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="telefono" name="destinatario" label="Telefono" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="pais" name="destinatario" label="Pais" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="ciudad" name="destinatario" label="Ciudad" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="direccion" name="destinatario" label="Direccion" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="unidad" name="destinatario" label="Unidad" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="vlrUnidad" name="destinatario" label="Valor Unidad" className={classes.margin} onChange={handleChangeCliente} />
                      <TextField id="vlrSeguro" name="destinatario" label="Valor Seguro" className={classes.margin} onChange={handleChangeCliente} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => {
                      handleChangeBD();
                      handleClose();
                    }}
                    type="submit"
                    variant="outlined" 
                    color="primary"
                  >
                    Agregar
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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Pais - Ciudad</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Tarifa</TableCell>
            <TableCell>Edicion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.pais} {row.ciudad}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.vlrUnidad}</TableCell>
              <TableCell>
                <Button 
                    color='primary' 
                    className='button' 
                    onClick={() => 
                    {
                        handleEdit(row._id);
                        handleClickOpenT()
                    }}
                >
                    Tarifa
                </Button>
                <br />
                <Button 
                    color='primary' 
                    className='button' 
                    onClick={() => 
                    {
                        handleEdit(row._id);
                        handleClickOpenS()
                    }}
                >
                    Seguro
                </Button>
                <br />
                <Button 
                    color='primary' 
                    className='button' 
                    onClick={() => 
                    {
                        handleEdit(row._id);
                        handleClickOpenD()
                    }}
                >
                    Direccion
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
                open={openT}
                onClose={handleCloseT}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="200px"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogstyle}>{"Edicion Tarifa:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.form}>
                    <TextField id='tarifa' label="Valor tarifa nueva" className={classes.margin} onChange={handleTar} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={() => {
                    handleChangeTarBD();
                    handleCloseT();
                    handleClickCarga();
                    }}
                    type="submit"
                    variant="outlined" 
                    color="primary"
                >
                    Cambiar
                </Button>
                <Button 
                    onClick={handleCloseT} 
                    variant="outlined" 
                    color="primary" 
                >
                    Cerrar
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openS}
                onClose={handleCloseS}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="200px"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogstyle}>{"Edicion seguro:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.form}>
                    <TextField id="seguro" label="Valor seguro nuevo" className={classes.margin} onChange={handleSeg} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={() => {
                    handleChangeSegBD();
                    handleCloseS();
                    handleClickCarga();
                    }}
                    type="submit"
                    variant="outlined" 
                    color="primary"
                >
                    Cambiar
                </Button>
                <Button 
                    onClick={handleCloseS} 
                    variant="outlined" 
                    color="primary" 
                >
                    Cerrar
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openD}
                onClose={handleCloseD}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="200px"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogstyle}>{"Edicion direccion:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.form}>
                    <TextField id="seguro" label="Direccion nueva" className={classes.margin} onChange={handleDir} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={() => {
                    handleChangeDirBD();
                    handleCloseS();
                    handleClickCarga();
                    }}
                    type="submit"
                    variant="outlined" 
                    color="primary"
                >
                    Cambiar
                </Button>
                <Button 
                    onClick={handleCloseD} 
                    variant="outlined" 
                    color="primary" 
                >
                    Cerrar
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openCarga} autoHideDuration={6000} onClose={handleCloseCarga}>
              <Alert onClose={handleCloseCarga} severity="success">
                Cliente Editado!
              </Alert>
            </Snackbar>
    </TableContainer>
  );
}
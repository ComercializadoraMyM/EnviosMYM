import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {
    makeStyles,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem
} from '@material-ui/core';

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '10px',
        textAlign: 'left'
    },
    table: {
        width: '100%',
        marginTop: '50px'
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
}));

const URL = 'https://envios-api-service.herokuapp.com/api/clientes';

const TableClients = (className, ...rest) => {
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

    const handleChangeCliente = (event) => {
        cliente[event.target.id] = event.target.value;
        setCliente(cliente);
      };

    const handleChangeBD = async() => {
        var prueba = { "cliente": JSON.stringify(cliente) };
        await fetch("https://envios-api-service.herokuapp.com/api/clientes", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prueba)
        }).then(data=>{
        console.log (cliente);
        });
    }

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

    const [idUpdate, setId] = React.useState('');

    const handleEdit = async (id) => {
        setId(id);
        console.log(idUpdate);
    }

    const [tarNueva, setTar] = React.useState('');

    const handleTar = async (event) => {
        setTar(event.target.value);
        console.log(tarNueva);
    }

    const [segNueva, setSeg] = React.useState('');

    const handleSeg = async (event) => {
        setSeg(event.target.value);
        console.log(segNueva);
    }

    const handleChangeTarBD = async() => {
        await fetch("https://envios-api-service.herokuapp.com/api/clientes/tarifa/"+tarNueva+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }

    const handleChangeSegBD = async() => {
        await fetch("https://envios-api-service.herokuapp.com/api/clientes/seguro/"+segNueva+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }
    
    const renderHeader = () => {
        let headerElement = ['Identificacion', 'Nombre', 'Pais-Ciudad', 'Telefono', 'Direccion', 'Edicion']
        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ 
            _id,
            numid, 
            nombre, 
            telefono, 
            pais,
            ciudad,
            direccion
        }) => {
            return (
                <tr key={_id}>
                    <td>{numid}</td>
                    <td>{nombre}</td>
                    <td>{`${pais} ${ciudad}`}</td>
                    <td>{telefono}</td>
                    <td>{direccion}</td>
                    <td>
                        <Button 
                            color='primary' 
                            className='button' 
                            onClick={() => 
                            {
                                handleEdit(_id);
                                handleClickOpenT()
                            }}
                        >
                            Tarifa
                        </Button>
                        <Button 
                            color='primary' 
                            className='button' 
                            onClick={() => 
                            {
                                handleEdit(_id);
                                handleClickOpenS()
                            }}
                        >
                            Seguro
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Card 
            className={clsx(classes.root, className)}
            {...rest}
        >
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
            <br />
            <table id='employee' className={classes.table}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
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
        </Card>
    )
};

export default TableClients;

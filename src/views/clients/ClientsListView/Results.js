import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
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
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  but: {
    marginLeft: '5px',
    width: '200px',
    backgroundColor: '#fceadd'
  },
  butPrint: {
    marginTop: '10px',
    width: '200px',
    alignSelf: 'center',
    marginLeft: '10px'
  },
  margin: {
    width: '300px'
  },
  dialogstyle: {
    alignSelf: 'center',
  },
  form: {
    textAlign: 'center'
  }
}));

const Results = ({ className, customers, ...rest }) => {
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

  const classes = useStyles();
  
  const [clientes, setNombCliente] = React.useState([]);

  const handleChangeListaClientes = async() => {
    await fetch('http://localhost:3001/api/cliente')
    .then(function(response) {
        return response.json();
    }).then(data=>{
      setNombCliente(data);
      customers = data;
      console.log(customers);
    })
    .catch(function(err) {
        console.error(err);
    });
  };

  const handleChangeBD = async() => {
    var prueba = { "cliente": JSON.stringify(cliente) };
    await fetch("http://localhost:3001/api/cliente", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prueba)
    }).then(data=>{
      console.log (cliente);
    });
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Button variant="outlined" color="primary" onClick={handleChangeListaClientes} className={classes.butPrint}>
            Mostrar clientes
          </Button>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Identificacion
                </TableCell>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Pais-ciudad
                </TableCell>
                <TableCell>
                  Telefono
                </TableCell>
                <TableCell>
                  Direccion
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.slice(0).map((clientes) => (
                <TableRow
                  hover
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {clientes.numid}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {clientes.nombre}
                  </TableCell>
                  <TableCell>
                    {clientes.email}
                  </TableCell>
                  <TableCell>
                    {`${clientes.pais} ${clientes.ciudad}`}
                  </TableCell>
                  <TableCell>
                    {clientes.telefono}
                  </TableCell>
                  <TableCell>
                    {clientes.direccion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;

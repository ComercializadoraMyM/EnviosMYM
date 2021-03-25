import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import jsPDF from 'jspdf';
import MuiAlert from '@material-ui/lab/Alert';
import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Snackbar
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    margin: {
      width: '300px'
    },
    dialogstyle: {
      width: '400px',
      alignSelf: 'center',
    },
    form: {
      width: '500px',
      textAlign: 'center'
    },
    imgShow: {
      display: 'none',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

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

  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [statusUpdate, setStatus] = React.useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  }

  const [idUpdate, setId] = React.useState('');

  const handleEdit = async (id) => {
    setId(id);
  }

  const generatePdf = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code128", idUpdate, { format: "code128" });
    const img = document.querySelector('img#code128');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia.png';
    const doc = new jsPDF('p', 'pt');
    doc.addImage(logo, 'PNG', 20, 30, 550, 196);
    doc.addImage(img.src, 'JPEG', 50, 81, 220, 46);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('10');
    doc.text(350, 118, row.infGuia.fecha);
    doc.text(350, 95, idUpdate.toString());
    doc.text(70, 221, row.vlrLiquidacion.peso + ' ' + row.vlrLiquidacion.undPeso);
    doc.text(370, 221, row.datosEnvio.descripcion);
    doc.text(360, 158, row.destinatario.nombre);
    doc.text(360, 169, row.destinatario.telefono);
    doc.text(360, 179, row.destinatario.pais);
    doc.text(360, 189, row.destinatario.ciudad);
    doc.text(360, 200, row.destinatario.direccion);
    img.style.display = 'none';
    doc.save('guia.pdf');
  };

  const generateZebra = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code128", idUpdate, { format: "code128" });
    const img = document.querySelector('img#code128');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia-zebra.png';
    const doc = new jsPDF('l', 'cm', [7, 10]);
    doc.addImage(logo, 'PNG', 0.5, 0.5, 9, 6);
    doc.addImage(img.src, 'JPEG', 2.2, 0.58, 6, 1);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('5');
    doc.text(5.9, 1.89, row.infGuia.fecha);
    doc.text(1.2, 1.87, idUpdate.toString());
    doc.text(1.2, 6.04, row.vlrLiquidacion.peso + ' ' + row.vlrLiquidacion.undPeso);
    doc.text(1.8, 5.84, row.datosEnvio.descripcion);
    doc.text(2.2, 4.25, row.destinatario.nombre);
    doc.text(2.2, 4.45, row.destinatario.pais);
    doc.text(2.2, 4.65, row.destinatario.ciudad);
    doc.text(2.2, 4.85, row.destinatario.direccion);
    doc.text(2.2, 5.05, row.destinatario.telefono);
    img.style.display = 'none';
    doc.save('guia.pdf');
  };

  const handleChangeStatusBD = async () => {
    await fetch("https://envios-api-service.herokuapp.com/api/guias/" + statusUpdate + '/' + idUpdate, {
      method: 'POST',
    }).then(data => {
      console.log();
    });
  }

  const handleDelete = async (idUp) => {
    await fetch("http://localhost:3001/api/guias/" + idUp, {
      method: 'DELETE',
    }).then(data => {
      console.log();
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
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell >{moment(row.infGuia.fecha).format('DD/MM/YYYY')}</TableCell>
        <TableCell >{row.destinatario.nombre}</TableCell>
        <TableCell >{row.vlrLiquidacion.peso}</TableCell>
        <TableCell >{row.status}</TableCell>
        <TableCell >
          <Button 
            color='primary' 
            className='button' 
            onClick={() => 
              {handleEdit(row._id);
              handleDelete(row._id);
              handleClickCarga();
            }}
          >
            Eliminar
          </Button>
          <Snackbar open={openCarga} autoHideDuration={6000} onClose={handleCloseCarga}>
            <Alert onClose={handleCloseCarga} severity="success">
              Guia Eliminada!
            </Alert>
          </Snackbar>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div className={classes.typography}>
                <p>Tipo de pago: {row.vlrLiquidacion.tipoPago}</p>
                <p>Medio de pago: {row.vlrLiquidacion.medioPago} </p>
                <p>Tipo de envio: {row.vlrLiquidacion.tipoEnvio} </p>
                <p>Pais de pago: {row.vlrLiquidacion.paisPago} </p>
                <p>Flete: {row.calculos.flete} </p>
                <p>impuesto: {row.calculos.impuesto} </p>
                <p>Total: {row.calculos.total} </p>
              </div>
              <br />
              <Button
                color="secondary"
                onClick={() => {
                  handleEdit(row._id);
                  handleClickOpenAdd();
                }}
              >
                Editar
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
                    <form>
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
                    </form>
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
              <Button color="primary" onClick={()=>{handleEdit(row._id);generatePdf()}} className={classes.butPrint}>
                Impresora Papel
              </Button>
              <Button color="primary" onClick={()=>{handleEdit(row._id);generateZebra()}} className={classes.butPrint}>
                Impresora Zebra
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleGuides(props) {
  const [employees, setEmployees] = useState([]);
  const URL = 'https://envios-api-service.herokuapp.com/api/guias';

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(URL)
    setEmployees(response.data)
  }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Peso</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.reverse().map((guia) => (
            <Row key={guia._id} row={guia} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <img id='code128' alt='  ' style={{display:'none'}}/>
    </div>
  );
}

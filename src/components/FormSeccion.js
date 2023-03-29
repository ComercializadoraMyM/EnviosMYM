import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import jsPDF from 'jspdf';
import MuiAlert from '@material-ui/lab/Alert';
import {
  makeStyles,
  TextField,
  MenuItem,
  Paper,
  Grid,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var total = 0;
var impuesto = 0;

const pesos = [
  {
    value: 'Libra(s)',
    label: 'Libras',
  },
  {
    value: 'Kilogramo(s)',
    label: 'Kilogramos',
  },
];

const longitudes = [
  {
    value: 'Centimetros',
    label: 'Centimetros',
  },
  {
    value: 'Pulgadas',
    label: 'Pulgadas',
  },
];

const paises = [
  {
    value: 'Colombia',
    label: 'Colombia',
  },
  {
    value: 'Estados Unidos',
    label: 'Estados Unidos',
  },
];

const envNacionales = [
  {
    value: 'Contado',
    label: 'Contado',
  },
  {
    value: 'Cobro',
    label: 'Cobro',
  },
  {
    value: 'Recoge',
    label: 'Recoge',
  },
];

const pagos = [
  {
    value: 'Prepago',
    label: 'Prepago',
  },
  {
    value: 'Por Cobrar',
    label: 'Por Cobrar',
  },
];

const mediosPagos = [
  {
    value: 'Efectivo',
    label: 'Efectivo',
  },
  {
    value: 'Tarjeta',
    label: 'Tarjeta de Credito',
  },
  {
    value: 'Cheque',
    label: 'Cheque',
  },
  {
    value: 'Deposito agencia',
    label: 'Deposito Agencia',
  },
];

const nombreGuia = [
  {
    value: 'David Mejia',
    label: 'David Mejia',
  },
  {
    value: 'Fernando Mejia',
    label: 'Fernando Mejia',
  },
  {
    value: 'Eddy Vera',
    label: 'Eddy Vera',
  },
  {
    value: 'Alejandra Mejia',
    label: 'Alejandra Mejia',
  },
];

const envios = [
  {
    value: 'Personal',
    label: 'Personal',
  },
  {
    value: 'Corporativo',
    label: 'Corporativo',
  },
];

const empaques = [
  {
    value: 'Documentos Express',
    label: 'Documentos Express',
  },
  {
    value: 'Caja extragrande mas de: (26in x 26in x 26in)',
    label: 'Caja extragrande mas de: (26in x 26in x 26in)',
  },
  {
    value: 'Caja estandar',
    label: 'Caja estandar'
  }
];

const remitente = [
  {
    nombre: '  MYM Express',
    direccion: '  7774 NW 64th St, MIAMI-FLORIDA 33166',
    origen: '  Estados Unidos, Miami, Florida',
    zipcode: '  33166',
    telefono: '  786 3020294',
    email: '  mymexpressglobal@gmail.com'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '400px'
  },
  margin: {
    marginLeft: '20px',
    marginTop: '15px',
    width: '300px',
  },
  marginXS: {
    marginLeft: '20px',
    marginTop: '15px',
    width: '130px',
  },
  textField: {
    width: '25ch',
  },
  butt: {
    backgroundColor: '#d8e6ff',
    width: '200px'
  },
  but: {
    marginLeft: '5px',
    width: '200px',
    backgroundColor: '#fceadd'
  },
  butPrint: {
    marginTop: '10px',
    width: '200px',
    alignSelf: 'center'
  },
  paragr: {
    color: '#444444',
    textAlign: 'left',
    marginTop: '20px',
    marginLeft: '20px'
  },
  tit: {
    color: 'black',
    margin: '20px'
  },
  dialogstyle: {
    width: '400px',
    height: '50px',
    textAlign: 'center'
  },
  imgShow: {
    display: 'none',
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormSeccion() {
  useEffect(() => {
    getData();
    handleChangeListaClientes();
  }, [])

  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
  }); 

  const [guia, setGuia] = React.useState(
    {
      infGuia: {
        nomb: '',
        fecha: ''
      },
      destinatario: {
        nombre: '',
        tipoDocumento: '',
        documento: '',
        pais: '',
        ciudad: '',
        direccion: '',
        vlrUnidad: '',
        vlrSeguro: ''
      },
      datosEnvio: {
        tipoEmpaque: '',
        largo: '',
        alto: '',
        ancho: '',
        unidad: '',
        descripcion: '',
        tracks: ''
      },
      vlrLiquidacion: {
        undPeso: '',
        peso: '',
        vlrDeclarado: '',
        tipoPago: '',
        medioPago: '',
        tipoEnvio: '',
        paisPago: ''
      },
      costoEnvio: {
        tipEnvioNal: ''
      },
      status: 'Guia Creada',
      whr: '0',
      calculos: {
        flete: '',
        impuesto: '',
        total: ''
      }
    }
  );

  const handleChangeGuia = (event) => {
    guia[event.target.name][event.target.id] = event.target.value;
    setGuia(guia);
    console.log(guia);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    guia[event.target.name][event.target.id] = event.target.value;
    setGuia(guia);
  };
  const [pago, setTipoPago] = React.useState('');

  const handleChangePago = (event) => {
    guia[event.target.name].tipoPago = event.target.value;
    setGuia(guia);
    setTipoPago(event.target.value);
  };

  const [medioPago, setMedioPago] = React.useState('');

  const handleChangeMedioPago = (event) => {
    guia[event.target.name].medioPago = event.target.value;
    setGuia(guia);
    setMedioPago(event.target.value);
  };

  const [longitud, setLongitud] = React.useState('');

  const handleChangeLongitud = (event) => {
    guia[event.target.name].unidad = event.target.value;
    setGuia(guia);
    setLongitud(event.target.value);
  };

  const [peso, setPeso] = React.useState('');

  const handleChangePeso = (event) => {
    guia[event.target.name].undPeso = event.target.value;
    setGuia(guia);
    setPeso(event.target.value);
  };

  const [nomGuia, setNombGuia] = React.useState('');

  const handleChangeNomGuia = (event) => {
    guia[event.target.name].nomb = event.target.value;
    setGuia(guia);
    setNombGuia(event.target.value);
  };

  const [envNal, setEnvNal] = React.useState('');

  const handleChangeEnvNal = (event) => {
    guia[event.target.name].tipEnvioNal = event.target.value;
    setGuia(guia);
    setEnvNal(event.target.value);
  };

  const [empaque, setEmpaque] = React.useState('');

  const handleChangeEmpaque = (event) => {
    guia[event.target.name].tipoEmpaque = event.target.value;
    setGuia(guia);
    setEmpaque(event.target.value);
  };

  const [pais, setPais] = React.useState('');

  const handleChangePais = (event) => {
    guia[event.target.name].paisPago = event.target.value;
    setGuia(guia);
    setPais(event.target.value);
  };

  const [envio, setTipoEnvio] = React.useState('');

  const handleChangeEnvio = (event) => {
    guia[event.target.name].tipoEnvio = event.target.value;
    setGuia(guia);
    setTipoEnvio(event.target.value);
  };

  const [clientes, setNombCliente] = React.useState([]);

  const handleChangeListaClientes = async () => {
    await fetch('https://envios-api-service.onrender.com/api/clientes')
      .then(function (response) {
        return response.json();
      }).then(data => {
        setNombCliente(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  const [cliente, setCliente] = React.useState('');

  const handleChangeCliente = async (event) => {
    guia[event.target.name] = event.target.value;
    setGuia(guia);
    setCliente(event.target.value);
  };

  const [employees, setEmployees] = useState([]);

  const URL = 'https://envios-api-service.onrender.com/api/guias';

  const getData = async () => {
    const response = await axios.get(URL);
    setEmployees(response.data);
  }

  const handleChangeBD = async () => {
    guia.codBar = 'MYM-2021-'+(employees.length+1);
    handleCodID(guia.codBar);
    var prueba = { "guia": JSON.stringify(guia) };
    await fetch("https://envios-api-service.onrender.com/api/guias", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prueba)
    }).then(data => {
    });
  }

  const [codID, setCodId] = React.useState('');

  const handleCodID = async (id) => {
    setCodId(id);
  }

  const generatePdf = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code128", codID, { format: "code128" });
    const img = document.querySelector('img#code128');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia.png';
    const doc = new jsPDF('p', 'pt');
    doc.addImage(logo, 'PNG', 20, 30, 550, 196);
    doc.addImage(img.src, 'JPEG', 50, 81, 220, 46);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('10');
    doc.text(350, 118, guia.infGuia.fecha);
    doc.text(350, 95, codID.toString());
    doc.text(70, 221, guia.vlrLiquidacion.peso + ' ' + guia.vlrLiquidacion.undPeso);
    doc.text(370, 221, guia.datosEnvio.descripcion);
    doc.text(360, 158, cliente.nombre);
    doc.text(360, 169, cliente.telefono);
    doc.text(360, 179, cliente.pais);
    doc.text(360, 189, cliente.ciudad);
    doc.text(360, 200, cliente.direccion);
    img.style.display = 'none';
    doc.save('guia.pdf');
  };

  const generateZebra = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code128", codID, { format: "code128" });
    const img = document.querySelector('img#code128');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia-zebra.png';
    const doc = new jsPDF('l', 'cm', [7, 10]);
    doc.addImage(logo, 'PNG', 0.5, 0.5, 9, 6);
    doc.addImage(img.src, 'JPEG', 2.2, 0.58, 6, 1);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('5');
    doc.text(5.9, 1.89, guia.infGuia.fecha);
    doc.text(1.2, 1.87, codID.toString());
    doc.text(1.2, 6.04, guia.vlrLiquidacion.peso + ' ' + guia.vlrLiquidacion.undPeso);
    doc.text(1.8, 5.84, guia.datosEnvio.descripcion);
    doc.text(2.2, 4.25, cliente.nombre);
    doc.text(2.2, 4.45, cliente.pais);
    doc.text(2.2, 4.65, cliente.ciudad);
    doc.text(2.2, 4.85, cliente.direccion);
    doc.text(2.2, 5.05, cliente.telefono);
    img.style.display = 'none';
    doc.save('guia.pdf');
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openEnvio, setOpenEnvio] = React.useState(false);

  const handleClickOpenEnvio = async () => {
    setOpenEnvio(true);
  };

  const handleCloseEnvio = () => {
    setOpenEnvio(false);
  };

  const calculoTotal = () => {
    const vlrFlete = parseFloat(guia.vlrLiquidacion.peso) * parseFloat(cliente.vlrUnidad);
    total = vlrFlete + parseFloat(cliente.vlrSeguro);
    guia.calculos.flete = parseFloat(vlrFlete.toFixed(2));
    if (guia.vlrLiquidacion.vlrDeclarado > 200) {
      impuesto += guia.vlrLiquidacion.vlrDeclarado * 0.29;
      total += impuesto;
      guia.calculos.impuesto = parseFloat(impuesto.toFixed(2));
      guia.calculos.total = parseFloat(total.toFixed(2));
      return true;
    } else {
      impuesto += 0;
      guia.calculos.impuesto = parseFloat(impuesto.toFixed(2));
      guia.calculos.total = parseFloat(total.toFixed(2));
      return false;
    }
  }

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = async () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const [openCarga, setOpenCarga] = React.useState(false);

  const handleClickCarga = async () => {
    getData();
    setOpenCarga(true);
    console.log(codID);
  };

  const handleCloseCarga = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCarga(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Informacion de la Guia</h2>
            <form>
              <TextField
                id="nomb"
                name="infGuia"
                className={clsx(classes.margin)}
                select
                label="Nombre"
                value={nomGuia}
                onChange={handleChangeNomGuia}
              >
                {nombreGuia.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="fecha"
                name="infGuia"
                label="Fecha y Hora"
                type="datetime-local"
                defaultValue={Date.now}
                onChange={handleChangeGuia}
                className={classes.margin}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper1}>
            <h2 className={classes.tit}>Remitente</h2>
            {remitente.map((rem) => (
              <div>
                <p className={classes.paragr}>
                  <strong>Nombre:</strong>
                  {rem.nombre}
                </p>
                <p className={classes.paragr}>
                  <strong>Direccion:</strong>
                  {rem.direccion}
                </p>
                <p className={classes.paragr}>
                  <strong>Origen:</strong>
                  {rem.origen}
                </p>
                <p className={classes.paragr}>
                  <strong>Codigo ZIP:</strong>
                  {rem.zipcode}
                </p>
                <p className={classes.paragr}>
                  <strong>Telefono:</strong>
                  {rem.telefono}
                </p>
                <p className={classes.paragr}>
                  <strong>Email:</strong>
                  {rem.email}
                </p>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper1}>
          <h2 className={classes.tit}>Destinatario</h2>
            <form noValidate>
              <TextField
                id="nombre"
                name="destinatario"
                className={clsx(classes.margin)}
                select
                label="Seleccione el Cliente"
                value={cliente}
                onChange={handleChangeCliente}
              >
                {clientes.sort().map((option) => (
                  <MenuItem key={option.nombre} value={option}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <p className={classes.paragr}>
                <strong>Direccion:</strong>
                {cliente.direccion}
              </p>
              <p className={classes.paragr}>
                <strong>Pais:</strong>
                {cliente.pais}
              </p>
              <p className={classes.paragr}>
                <strong>Ciudad:</strong>
                {cliente.ciudad}
              </p>
              <p className={classes.paragr}>
                <strong>Email:</strong>
                {cliente.email}
              </p>
              <p className={classes.paragr}>
                <strong>Telefono:</strong>
                {cliente.telefono}
              </p>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Datos del Envio</h2>
            <form>
              <TextField
                id="unidad"
                name="datosEnvio"
                className={clsx(classes.marginXS)}
                select
                label="Unidad"
                value={longitud}
                onChange={handleChangeLongitud}
              >
                {longitudes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="largo" name="datosEnvio" label="Largo" className={classes.marginXS} onChange={handleChangeGuia} />
              <TextField id="alto" name="datosEnvio" label="Alto" className={classes.marginXS} onChange={handleChangeGuia} />
              <TextField id="ancho" name="datosEnvio" label="Ancho" className={classes.marginXS} onChange={handleChangeGuia} />
              <TextField
                id="tipoEmpaque"
                name="datosEnvio"
                className={clsx(classes.margin)}
                select
                label="Tipo de Empaque"
                value={empaque}
                onChange={handleChangeEmpaque}
              >
                {empaques.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="descripcion" name="datosEnvio" label="Descripcion corta del contenido" className={classes.margin} onChange={handleChangeGuia} />
              <TextField id="tracks" name="datosEnvio" label="Trackings que se envian" className={classes.margin} onChange={handleChangeGuia} />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Valores de Liquidacion</h2>
            <form>
              <TextField
                id="undPeso"
                name="vlrLiquidacion"
                className={clsx(classes.margin)}
                select
                label="Unidades de Peso"
                value={peso}
                onChange={handleChangePeso}
              >
                {pesos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Peso" id="peso" name="vlrLiquidacion" className={clsx(classes.margin)} onChange={handleChangeGuia} />
              <FormControl fullWidth className={clsx(classes.margin)}>
                <InputLabel htmlFor="val-declarado">Valor Declarado</InputLabel>
                <Input
                  id="vlrDeclarado"
                  name="vlrLiquidacion"
                  value={values.amount}
                  onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
              <TextField
                id="tipoPago"
                name="vlrLiquidacion"
                className={clsx(classes.margin)}
                select
                label="Tipo de Pago"
                value={pago}
                onChange={handleChangePago}
              >
                {pagos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="medioPago"
                name="vlrLiquidacion"
                className={clsx(classes.margin)}
                select
                label="Medio de Pago"
                value={medioPago}
                onChange={handleChangeMedioPago}
              >
                {mediosPagos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="tipoEnvio"
                name="vlrLiquidacion"
                className={clsx(classes.margin)}
                select
                label="Tipo de Envio"
                value={envio}
                onChange={handleChangeEnvio}
              >
                {envios.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="paisPago"
                name="vlrLiquidacion"
                className={clsx(classes.margin)}
                select
                label="Pais pago"
                value={pais}
                onChange={handleChangePais}
              >
                {paises.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </form>
            <br />
            <br />
            <p>
              Todos los valores y cálculos están dados en dólares Americanos.
            </p>
            <br />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Costo del Envio</h2>
            <form>
              <TextField
                id="tipEnvioNal"
                name="costoEnvio"
                className={clsx(classes.margin)}
                select
                label="Tipo de Envio Nacional"
                value={envNal}
                onChange={handleChangeEnvNal}
              >
                {envNacionales.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </form>
            <br />
            <br />
            <p className={classes.paragr}>** Primero calcular, enviar y luego cargar para despues descargar</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                calculoTotal();
                handleClickOpen();
              }}
              className={clsx(classes.margin, classes.butt)}
            >
              Calcular
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" className={classes.dialogstyle}>{"El valor del envio es:"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <p>
                    <strong>Flete:</strong> {guia.vlrLiquidacion.peso * cliente.vlrUnidad}
                  </p>
                  <p>
                    <strong>Seguro:</strong> {cliente.vlrSeguro}
                  </p>
                  <p>
                    <strong>Impuestos:</strong> {parseFloat(impuesto.toFixed(2))}
                  </p>
                  <br />
                  <p>
                    <strong>Total:</strong> {parseFloat(total.toFixed(2))}
                  </p>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Cerrar
                    </Button>
              </DialogActions>
            </Dialog>
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleChangeBD();
                handleClickSnack();
              }}
              className={clsx(classes.margin, classes.butt)}
              type="submit"
            >
              Enviar
            </Button>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
              <Alert onClose={handleCloseSnack} severity="success">
                Guia Enviada!
              </Alert>
            </Snackbar>
            <br />
            <Button variant="outlined" color="primary" onClick={() => {
              handleClickCarga();
            }} className={clsx(classes.margin, classes.butt)}>
              Cargar PDF
            </Button>
            <Snackbar open={openCarga} autoHideDuration={6000} onClose={handleCloseCarga}>
              <Alert onClose={handleCloseCarga} severity="success">
                PDF listo para descargar!
              </Alert>
            </Snackbar>
            <br />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleClickOpenEnvio();
              }}
              className={clsx(classes.margin, classes.butPrint)}
              type="submit"
            >
              Descargar
            </Button>
            <Dialog
              open={openEnvio}
              onClose={handleCloseEnvio}
              aria-labelledby="alert-dialog-envio"
            >
              <DialogTitle id="alert-dialog-envio" className={classes.dialogstyle}>{"Descargue la informacion"}</DialogTitle>
              <img id='code128' alt='codigo de barras' className={classes.imgShow} />
              <Button variant="outlined" color="primary" onClick={generatePdf} className={classes.butPrint}>
                Impresora Papel
                  </Button>
              <Button variant="outlined" color="primary" onClick={generateZebra} className={classes.butPrint}>
                Impresora Zebra
                  </Button>
              <DialogActions>
                <Button onClick={handleCloseEnvio} color="primary" autoFocus>
                  Cerrar
                    </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

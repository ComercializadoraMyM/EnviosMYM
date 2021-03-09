import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import jsPDF from 'jspdf';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const clientes = [
  {
    value: 'Cliente 1',
    label: 'Cliente 1',
  },
  {
    value: 'Cliente 2',
    label: 'Cliente 2',
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
      value: 'Eddyt Vera',
      label: 'Eddyt Vera',
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
    direccion: '  9406 N.W 13th ST Suite 2',
    origen: '  Estados Unidos, Miami, Florida',
    zipcode: '  33172',
    telefono: '  786 3020294',
    email: '  davidfmejia2018@gmail.com'
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
  root1: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  contBar: {
    alignItems: 'center',
  },
  margin: {
    marginLeft: '20px',
    marginTop: '15px',
    width: '300px',
  },
  marginO: {
    marginLeft: '20px',
    marginTop: '15px',
  },
  marginXS: {
    marginLeft: '20px',
    marginTop: '15px',
    width: '130px',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  butt: {
    backgroundColor: '#d8e6ff',
    width: '250px'
  },
  but: {
    marginLeft: '5px',
    width: '100px',
    backgroundColor: '#fceadd'
  },
  butPrint: {
    marginLeft: '5px',
    marginTop: '10px',
    width: '200px'
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
  textPDF: {
      color: 'grey',
      textSizeAdjust: '8px',
  },
  dialogstyle: {
    width: '400px',
    height: '50px',
    textAlign: 'center',
  },
    imgShow: {
      display: 'none',
  }, 
}));

export default function FormSeccion() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
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
        vlrUnidad: {
          $numberDouble: ''
        },
        vlrSeguro: {
          $numberDouble: ''
        }
      },
      datosEnvio: {
        tipoEmpaque: '',
        largo: '',
        alto: '',
        ancho: '',
        unidad: '',
        descripcion: ''
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
      }
    }
  );

  const handleChangeGuia = (event) => {
    guia[event.target.name][event.target.id] = event.target.value;
    setGuia(guia);
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

  const [cliente, setCliente] = React.useState('');

  const handleChangeCliente = (event) => {
    guia[event.target.name].nombre = event.target.value;
    setGuia(guia);
    setCliente(event.target.value);
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

  const generatePdf = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code39", "14A5B3V45612309", {format: "code39"});
    const img = document.querySelector('img#code39');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia.png';
    const doc = new jsPDF('p', 'pt');
    doc.addImage(logo, 'PNG', 20, 30, 550, 196);
    doc.addImage(img.src, 'JPEG', 50, 81, 220, 46);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('10');
    doc.text(350, 118, guia.infGuia.fecha);
    doc.text(70, 221, guia.vlrLiquidacion.peso+' '+guia.vlrLiquidacion.undPeso);
    doc.text(370, 221, guia.datosEnvio.descripcion);
    img.style.display = 'none';
    doc.save('guia.pdf');
  };

  const generateZebra = () => {
    var JsBarcode = require('jsbarcode');
    JsBarcode("#code39", "14A5B3V45612309", {format: "code39"});
    const img = document.querySelector('img#code39');
    const logo = new Image();
    logo.src = '/static/images/avatars/guia-zebra.png';
    const doc = new jsPDF('l', 'cm', [7, 10]);
    doc.addImage(logo, 'PNG', 0.5, 0.5, 9, 6);
    doc.addImage(img.src, 'JPEG', 2.2, 0.58, 6, 1);
    doc.setFontSize(15);
    doc.setFont('verdana', 'normal');
    doc.setFontSize('5');
    doc.text(5.9, 1.9, guia.infGuia.fecha);
    doc.text(1.2, 6.04, guia.vlrLiquidacion.peso+' '+guia.vlrLiquidacion.undPeso);
    doc.text(1.8, 5.84, guia.datosEnvio.descripcion);
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
                  Nombre:
                  {rem.nombre}
                </p>
                <p className={classes.paragr}>
                  Direccion:
                  {rem.direccion}
                </p>
                <p className={classes.paragr}>
                  Origen:
                  {rem.origen}
                </p>
                <p className={classes.paragr}>
                  Codigo ZIP:
                  {rem.zipcode}
                </p>
                <p className={classes.paragr}>
                  Telefono:
                  {rem.telefono}
                </p>
                <p className={classes.paragr}>
                  Email:
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
                {clientes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.but}>
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
                            Flete: {guia.vlrLiquidacion.peso*2}
                        </p>
                        <p>
                            Seguro: {2}
                        </p>
                        <p>
                            Impuestos: 0
                        </p>
                        <br />
                        <p>
                            <strong>Total:</strong> {(guia.vlrLiquidacion.peso*2)+2+0}
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
            <img id='code39' alt='codigo de barras' className={classes.imgShow} />
            <Button variant="outlined" color="primary" onClick={generatePdf} className={classes.butPrint}>
              Impresora Papel
            </Button>
            <Button variant="outlined" color="primary" onClick={generateZebra} className={classes.butPrint}>
              Impresora Zebra
            </Button>
            <br />
            <Button
              variant="outlined"
              color="primary"
              className={clsx(classes.margin, classes.butt)}
              type="submit"
            >
              Enviar
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

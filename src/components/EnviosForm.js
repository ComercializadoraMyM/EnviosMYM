import React, { useEffect } from 'react';
import clsx from 'clsx';
import MuiAlert from '@material-ui/lab/Alert';
import {
  makeStyles,
  TextField,
  MenuItem,
  Paper,
  Grid,
  Button,
  Snackbar,
} from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const nombreGuia = [
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

const empaques = [
  {
    value: 'Al cobro',
    label: 'Al cobro',
  },
  {
    value: 'Contado',
    label: 'Contado',
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
  margin: {
    marginLeft: '20px',
    marginTop: '15px',
    width: '300px',
  },
  butt: {
    backgroundColor: '#d8e6ff',
    width: '200px'
  },
  tit: {
    color: 'black',
    margin: '20px'
  },
  paragr: {
    color: '#444444',
    textAlign: 'left',
    marginTop: '20px',
    marginLeft: '20px'
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
}));

export default function FormSeccion() {
  useEffect(() => {
    handleChangeListaClientes()
  }, [])

  const classes = useStyles();

  const [guia, setGuia] = React.useState(
    {
      infGuia: {
        nomb: '',
        fecha: ''
      },
      datosEnvio: {
        numGuia: '',
        valor: '',
        link: '',
        transportadora: '',
        tipo: '', 
        descripcion: ''
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
      }
    }
  );

  const handleChangeGuia = (event) => {
    guia[event.target.name][event.target.id] = event.target.value;
    setGuia(guia);
  };

  const [nomGuia, setNombGuia] = React.useState('');

  const handleChangeNomGuia = (event) => {
    guia[event.target.name].nomb = event.target.value;
    setGuia(guia);
    setNombGuia(event.target.value);
  };

  const [empaque, setEmpaque] = React.useState('');

  const handleChangeEmpaque = (event) => {
    guia[event.target.name].tipo = event.target.value;
    setGuia(guia);
    setEmpaque(event.target.value);
    console.log(guia);
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
    console.log(guia);
  };

  const handleChangeBD = async () => {
    var prueba = { "guia": JSON.stringify(guia) };
    await fetch("https://envios-api-service.onrender.com/api/envios", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prueba)
    }).then(data => {
    });
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Informacion del Envío</h2>
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
          <Paper className={classes.paper}>
            <h2 className={classes.tit}>Datos del Envio</h2>
            <form>
              <TextField id="numGuia" name="datosEnvio" label="Numero de Guia" className={classes.margin} onChange={handleChangeGuia} />
              <TextField id="valor" name="datosEnvio" label="Valor" className={classes.margin} onChange={handleChangeGuia} />
              <TextField id="link" name="datosEnvio" label="Link de Seguimiento" className={classes.margin} onChange={handleChangeGuia} />
              <TextField id="transportadora" name="datosEnvio" label="Nombre Transportadora" className={classes.margin} onChange={handleChangeGuia} />
              <TextField id="descripcion" name="datosEnvio" label="Descripcion" className={classes.margin} onChange={handleChangeGuia} />
              <TextField
                id="tipo"
                name="datosEnvio"
                className={clsx(classes.margin)}
                select
                label="Tipo de guia"
                value={empaque}
                onChange={handleChangeEmpaque}
              >
                {empaques.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br/>
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
            </form>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
              <Alert onClose={handleCloseSnack} severity="success">
                Guia Enviada!
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
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
                  <MenuItem key={option.nombre} value={option}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <p className={classes.paragr}>
                <strong>Direccion: </strong>
                {cliente.direccion}
              </p>
              <p className={classes.paragr}>
                <strong>Pais: </strong>
                {cliente.pais}
              </p>
              <p className={classes.paragr}>
                <strong>Ciudad: </strong>
                {cliente.ciudad}
              </p>
              <p className={classes.paragr}>
                <strong>Email: </strong>
                {cliente.email}
              </p>
              <p className={classes.paragr}>
                <strong>Telefono: </strong>
                {cliente.telefono}
              </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

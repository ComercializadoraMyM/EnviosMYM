import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  but: {    
    marginTop: '10px',
    marginLeft: '5px',
    width: '200px',
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
  const classes = useStyles();

  const [trackings, setTrackings] = React.useState(
    {
        fecha: '',
        track_id: '',
        nombreCliente: '',
        whr: '0',
        peso: '',
        numCaja: ''
    }
  );

  const [tracking, setTracking] = React.useState([]);

  const handleChangeListaTrack = async() => {
    await fetch('http://localhost:3001/api/tracking')
    .then(function(response) {
        return response.json();
    }).then(data=>{
      setTracking(data);
      customers = data;
      console.log(customers);
    })
    .catch(function(err) {
        console.error(err);
    });
  };

  const handleChangeBDTracking = async() => {
    var prueba = { "tracking": JSON.stringify(trackings) };
    await fetch("http://localhost:3001/api/tracking", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prueba)
    }).then(data=>{
      console.log (trackings);
    });
  }
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTrack = (event) => {
    trackings[event.target.id] = event.target.value;
    setTrackings(trackings);
    console.log(trackings);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Button 
            variant="outlined" 
            color="primary" 
            className={classes.but}
            onClick={handleChangeListaTrack}
          >
            Mostrar Entradas
          </Button>
          <Button 
            variant="outlined" 
            color="primary"  
            onClick={handleClickOpen} 
            className={classes.butPrint}
          >
              Agregar Entrada
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-track"
                aria-describedby="alert-track"
                width="200px"
            >
                <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Datos de la entrada nueva:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-track" className={classes.form}>
                      <TextField
                        id="fecha"
                        label="Fecha - Hora"
                        type="datetime-local"
                        defaultValue={Date.now}
                        onChange={handleChangeTrack}
                        className={classes.margin}
                        InputLabelProps={{
                        shrink: true,
                        }}
                      />
                      <TextField id="track_id" label="Tracking ID" className={classes.margin} onChange={handleChangeTrack} />
                      <TextField id="nombreCliente" label="Nombre Cliente" className={classes.margin} onChange={handleChangeTrack} />
                      <TextField id="peso" label="Peso (Lb)" className={classes.margin} onChange={handleChangeTrack} />
                      <TextField id="numCaja" label="Numero Caja" className={classes.margin} onChange={handleChangeTrack} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => {
                      handleChangeBDTracking();
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
                  Fecha
                </TableCell>
                <TableCell>
                  Tracking ID
                </TableCell>
                <TableCell>
                  Nombre cliente
                </TableCell>
                <TableCell>
                  Peso
                </TableCell>
                <TableCell>
                  # Caja
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracking.slice(0).map((tracking) => (
                <TableRow
                  hover
                >
                  <TableCell>
                    {moment(tracking.fecha).format('DD/MM/YYYY')}                    
                  </TableCell>
                  <TableCell>
                    {tracking.track_id}
                  </TableCell>
                  <TableCell>
                    {tracking.nombreCliente}
                  </TableCell>
                  <TableCell>
                    {tracking.peso}
                  </TableCell>
                  <TableCell>
                    {tracking.numCaja}
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

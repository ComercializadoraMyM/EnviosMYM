import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import {
    makeStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    width: '100%',
    padding: '10px',
    textAlign: 'left'
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
});

const URL = 'https://envios-api-service.herokuapp.com/api/trackings';

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

    const handleChangeBDTracking = async() => {
        var prueba = { "tracking": JSON.stringify(trackings) };
        await fetch("https://envios-api-service.herokuapp.com/api/trackings", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prueba)
        }).then(data=>{
        });
      }

    const handleChangeWHRBD = async() => {
        await fetch("https://envios-api-service.herokuapp.com/api/trackings/"+whrUpdate+'/'+idUpdate, {
          method: 'POST', 
        }).then(data=>{
        }); 
      }
      
      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const [openAdd, setOpenAdd] = React.useState(false);
    
      const handleClickOpenAdd = () => {
        setOpenAdd(true);
      };
    
      const handleCloseAdd = () => {
        setOpenAdd(false);
      };
    
      const [trackings, setTrackings] = React.useState(
        {
            fecha: '',
            track_id: '',
            nombreCliente: '',
            whr: '0',
            peso: '',
            numCaja: '',
            comentario: ''
        }
      );
    
      const handleChangeTrack = (event) => {
        trackings[event.target.id] = event.target.value;
        setTrackings(trackings);
      };

      const [whrUpdate, setWhr] = React.useState('');

      const handleChangeWHR = (event) => {
        setWhr ('BOG '+event.target.value);
      }

      const [idUpdate, setId] = React.useState('');

      const handleChangeId = (id) => {
        setId (id);
      }

      const handleDelete = async (idUp) => {
        await fetch("https://envios-api-service.herokuapp.com/api/trackings/" + idUp, {
          method: 'DELETE',
        }).then(data => {
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
                Agregar Entrada
        </Button>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tracking ID</TableCell>
            <TableCell>Nombre Cliente</TableCell>
            <TableCell>Peso</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Comentario</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {moment(row.fecha).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>{row.track_id}</TableCell>
              <TableCell>{row.nombreCliente}</TableCell>
              <TableCell>{row.peso}</TableCell>
              <TableCell>{row.whr}</TableCell>
              <TableCell>{row.comentario}</TableCell>
              <TableCell>
                <Button
                    color='primary' 
                    className='button' 
                    onClick={() => 
                    {handleChangeId(row._id);
                      handleClickOpenAdd()
                    }}
                >
                    Estado
                </Button>
                <br />
                <Button
                    color='primary'
                    className='button'
                    onClick={() =>
                    {handleChangeId(row._id);
                    handleDelete(row._id);
                    handleClickCarga();
                    }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            <TextField id="comentario" label="Observaciones" className={classes.margin} onChange={handleChangeTrack} />
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
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="alert-track"
          aria-describedby="alert-track"
          width="200px"
        >
          <DialogTitle id="alert-track" className={classes.dialogstyle}>
            {"Agregue o Modifique el WHR:"}
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
          <Snackbar open={openCarga} autoHideDuration={6000} onClose={handleCloseCarga}>
            <Alert onClose={handleCloseCarga} severity="success">
              Entrada Eliminada!
            </Alert>
          </Snackbar>
    </TableContainer>
  );
}
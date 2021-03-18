import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
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
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '10px',
        textAlign: 'left'
    },
    table: {
        width: '100%',
        marginTop: '50px',
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

const URL = 'http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/tracking';

const TableGuide = (className, ...rest) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const renderHeader = () => {
        let headerElement = ['Fecha', 'Tracking ID', 'Nombre Cliente', 'Peso', 'Num. Caja', 'WHR', 'Editar']
        return headerElement.map((key, index) => {
            return <th key={index} margin="30px">{key}</th>
        })
    }

    const handleChangeBDTracking = async() => {
        var prueba = { "tracking": JSON.stringify(trackings) };
        await fetch("http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/tracking", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prueba)
        }).then(data=>{
          console.log (trackings);
        });
      }

    const handleChangeWHRBD = async() => {
        await fetch("http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/tracking/"+whrUpdate+'/'+idUpdate, {
          method: 'POST', 
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
            numCaja: ''
        }
      );
    
      const handleChangeTrack = (event) => {
        trackings[event.target.id] = event.target.value;
        setTrackings(trackings);
      };

      const [whrUpdate, setWhr] = React.useState('');

      const handleChangeWHR = (event) => {
        setWhr (event.target.value);
      }

      const [idUpdate, setId] = React.useState('');

      const handleChangeId = (id) => {
        setId (id);
      }

    const renderBody = () => {
        return employees && employees.map(({ 
            _id, 
            fechaT, 
            track_id, 
            nombreCliente, 
            peso,
            numCaja,
            whr
        }) => {
            return (
                <tr key={_id}>
                    <td>{moment(fechaT).format('DD/MM/YYYY')}</td>
                    <td>{track_id}</td>
                    <td>{nombreCliente}</td>
                    <td>{peso}</td>
                    <td>{numCaja}</td>
                    <td>{whr}</td>
                    <td className='opration'>
                        <Button 
                          color='primary' 
                          className='button' 
                          onClick={() => 
                            {handleChangeId(_id);
                            handleClickOpenAdd()
                          }}
                        >
                          WHR
                        </Button>
                        <Dialog
                            open={openAdd}
                            onClose={handleCloseAdd}
                            aria-labelledby="alert-track"
                            aria-describedby="alert-track"
                            width="200px"
                        >
                            <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Agregue o Modifique el WHR:"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-track" className={classes.form}>
                                  <TextField id="whr" label="WHR" className={classes.margin} onChange={handleChangeWHR} />
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
            <table id='employee' className={classes.table}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </Card>
    )
};

export default TableGuide;

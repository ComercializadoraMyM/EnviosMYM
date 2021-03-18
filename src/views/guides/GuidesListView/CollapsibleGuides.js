import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
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
    MenuItem
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';

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
    }
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
    setStatus (event.target.value);
  }

  const [idUpdate, setId] = React.useState('');

  const handleEdit = async(id) => {
    setId(id);
  }

  const handleChangeStatusBD = async() => {
    await fetch("http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/guia/"+statusUpdate+'/'+idUpdate, {
      method: 'POST', 
    }).then(data=>{
      console.log ();
    }); 
  }

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
        <TableCell >{moment(row.fecha).format('DD/MM/YYYY')}</TableCell>
        <TableCell >{row.destinatario.nombre}</TableCell>
        <TableCell >{row.vlrLiquidacion.peso}</TableCell>
        <TableCell >{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <div className={classes.typography}>
                    <p>Valor declarado: {row.vlrLiquidacion.vlrDeclarado}</p>
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
                  variant="outlined" 
                  onClick={()=>{
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleGuides(props) {
    const [employees, setEmployees] = useState([]);
    const URL = 'http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/guia';

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(URL)
        setEmployees(response.data)
    }

  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((guia) => (
            <Row key={guia._id} row={guia} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
    TableRow
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleGuides(props) {
    const [employees, setEmployees] = useState([]);
    const URL = 'http://localhost:3001/api/guia';

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

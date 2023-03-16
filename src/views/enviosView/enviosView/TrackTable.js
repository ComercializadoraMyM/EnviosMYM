import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import {
    makeStyles,
    Button,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Link
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

const URL = 'https://envios-api-service.onrenderappapp.com/api/envios';

export default function BasicTable() {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getData();
  }, [])

    const getData = async () => {
        const response = await axios.get(URL)
        setEmployees(response.data)
    }

      const handleDelete = async (idUp) => {
        await fetch("https://envios-api-service.onrenderappapp.com/api/envios/" + idUp, {
          method: 'DELETE',
        }).then(
          getData()
        );
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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Numero de Guia</TableCell>
            <TableCell>Destinatario</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Link de seguimiento</TableCell>
            <TableCell>Transportadora</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {moment(row.fecha).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>{row.datosEnvio.numGuia}</TableCell>
              <TableCell>{row.destinatario.nombre}</TableCell>
              <TableCell>{row.datosEnvio.valor}</TableCell>
              <TableCell>
              <Link 
              rel="noopener noreferrer" target="_blank"
              href={row.datosEnvio.link} onClick={row.datosEnvio.link}>
                    {row.datosEnvio.link}
                  </Link>
              </TableCell>
              <TableCell>{row.datosEnvio.transportadora}</TableCell>
              <TableCell>{row.datosEnvio.tipo}</TableCell>
              <TableCell>{row.datosEnvio.descripcion}</TableCell>
              <TableCell>
                <Button
                    color='primary'
                    className='button'
                    onClick={() =>
                    {
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
          <Snackbar open={openCarga} autoHideDuration={6000} onClose={handleCloseCarga}>
            <Alert onClose={handleCloseCarga} severity="success">
              Entrada Eliminada!
            </Alert>
          </Snackbar>
    </TableContainer>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
    makeStyles,
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    textAlign: "center"
  },
    dialogstyle: {
        alignSelf: 'center',
    },
    form: {
        textAlign: 'center'
    },
    butPrint: {
        marginTop: '10px',
        width: '200px',
        alignContent: 'right',
        marginLeft: '10px'
    },
    margin: {
        width: '300px'
    },
    tittle: {
        margin: 20,
    },
    sutittle: {
        margin: 20,
    },
    paper: {
        margin: 10,
        maxWidth: 1200,
        alignSelf: "center"
    }
});

const URL = 'https://envios-api-service.herokuapp.com/api/guias/usuario/'+localStorage.getItem("user");
const URLT = 'https://envios-api-service.herokuapp.com/api/trackings/usuario/'+localStorage.getItem("user");
const URLE = 'https://envios-api-service.herokuapp.com/api/envios/usuario/'+localStorage.getItem("user");

export default function UserView() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [envios, setEnvios] = useState([]);

    useEffect(() => {
        getData();
        getDataT();
        getDataE();
    }, [])

    const getData = async () => {
        const response = await axios.get(URL)
        setEmployees(response.data)
    }
    const getDataT = async () => {
        const response = await axios.get(URLT)
        setTracks(response.data)
    }
    const getDataE = async () => {
        const response = await axios.get(URLE)
        setEnvios(response.data)
    }

  return (
    <div>
      <TableContainer component={Paper} className={classes.paper}>
          <h2 className={classes.tittle} >
              Bienvenido {localStorage.getItem("user")}
          </h2>
          <h3 className={classes.sutittle}>
              Guias: {employees.length}
          </h3>
          {employees.length !== 0 && 
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id Guia</TableCell>
                <TableCell>Fecha Creacion</TableCell>
                <TableCell>Peso</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.reverse().map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.codBar}</TableCell>
                  <TableCell>{moment(row.infGuia.fecha).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{row.vlrLiquidacion.peso}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          }
          {employees.length === 0 && 
            <div>
              <h4 className={classes.sutittle}>Aún no tiene guias</h4>
            </div> 
          }
            <h3 className={classes.sutittle}>
                Trackings: {tracks.length}
            </h3>
          {tracks.length !== 0 && 
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id Guia</TableCell>
                <TableCell>Fecha Creacion</TableCell>
                <TableCell>Peso</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {tracks.reverse().map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.track_id}</TableCell>
                    <TableCell>{moment(row.fecha).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{row.peso}</TableCell>
                    <TableCell>{row.whr}</TableCell>
                    </TableRow>
                ))}          
            </TableBody>
          </Table>
          }
          {tracks.length === 0 && 
            <div>
              <h4 className={classes.sutittle}>Aún no tienes trackings</h4>
            </div> 
          }

          <h3 className={classes.sutittle}>
              Envios nacionales: {envios.length}
          </h3>
          {envios.length !== 0 && 
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id Guia</TableCell>
                <TableCell>Fecha Creacion</TableCell>
                <TableCell>Descripcion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {envios.reverse().map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.datosEnvio.numGuia}</TableCell>
                  <TableCell>{moment(row.infGuia.fecha).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{row.datosEnvio.descripcion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          }
          {envios.length === 0 && 
            <div>
              <h4 className={classes.sutittle}>Aún no tiene envios</h4>
            </div> 
          }
        </TableContainer>
    </div>
    );
}

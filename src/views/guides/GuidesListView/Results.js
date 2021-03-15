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
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  but: {
    marginTop: '10px',
    marginLeft: '10px'
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const [guias, setGuias] = React.useState([]);

  const handleChangeListaGuias = async() => {
    await fetch('http://localhost:3001/api/guia')
    .then(function(response) {
        return response.json();
    }).then(data=>{
      setGuias(data);
      customers = data;
      console.log(customers);
    })
    .catch(function(err) {
        console.error(err);
    });
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
            onClick={handleChangeListaGuias}
          >
            Mostrar Guias
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Nombre destinatario
                </TableCell>
                <TableCell>
                  Peso
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Detalle
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guias.slice(0).map((guias) => (
                <TableRow
                  hover
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {moment(guias.fecha).format('DD/MM/YYYY')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {guias._id}
                  </TableCell>
                  <TableCell>
                    {guias.destinatario.nombre}
                  </TableCell>
                  <TableCell>
                    {`${guias.vlrLiquidacion.peso} ${guias.destinatario.unidad}`}
                  </TableCell>
                  <TableCell>
                    {guias.status}
                  </TableCell>
                  <TableCell>
                    Ver
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

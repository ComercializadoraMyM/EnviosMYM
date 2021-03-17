import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import clsx from 'clsx';
import {
    makeStyles,
    Button,
    Card,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '10px',
        textAlign: 'left'
    },
    table: {
        width: '100%',
    }
}));

const URL = 'http://localhost:3001/api/guia';

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

    const removeData = (id) => {
        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['Id', 'Fecha', 'Nombre', 'Peso', 'Estado', 'Detalle']
        return headerElement.map((key, index) => {
            return <th key={index} margin="30px">{key}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ 
            _id, 
            infGuia, 
            destinatario, 
            vlrLiquidacion, 
            status 
        }) => {
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{moment(infGuia.fecha).format('DD/MM/YYYY')}</td>
                    <td>{destinatario.nombre}</td>
                    <td>{vlrLiquidacion.peso}</td>
                    <td>{status}</td>
                    <td className='opration'>
                        <Button color='primary' className='button' onClick={() => removeData(_id)}>Ver</Button>
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
            <table id='employee' className={classes.root}>
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

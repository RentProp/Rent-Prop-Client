import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = {
    bold: {fontWeight: 'bold'}
}

const useStyles = makeStyles(styles);

export default function DetailsTable(props) {

    const classes = useStyles();

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {Object.keys(props.details).map((key) => (
                        <TableRow key={key}>
                            <TableCell className={classes.bold}>
                                {key}
                            </TableCell>
                            <TableCell>
                                {props.details[key]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
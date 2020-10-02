import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { green } from '@material-ui/core/colors';
import { getProperties } from '../api/API';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';
import { addressToString } from "./AddressToString";
import RestoreIcon from '@material-ui/icons/Restore';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function BasicTable() {
    const classes = useStyles();
    const [rows, setData] = React.useState([]);
    const getPropertyModel = {
        "userId": "cf60afed-dc27-41ff-867d-99254146a636",
        "showDeactivated": false
    }
    React.useEffect(() => {
        async function fetchData() {
            const ret = await getProperties(getPropertyModel);
            console.log(JSON.stringify(ret.data))
            const obj = JSON.parse(ret.data)
            await setData(obj);
        }
        fetchData()
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Property Name</TableCell>
                        <TableCell align="right">Unit Number</TableCell>
                        <TableCell align="right">Enabled</TableCell>
                        <TableCell align="right">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><div><EditIcon /> <RestoreIcon /></div></TableCell>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.unitNo}</TableCell>
                            <TableCell align="left">{row.isEnabled ? <AdjustOutlinedIcon style={{ color: green[500] }} /> : <AdjustOutlinedIcon color="primary" />}</TableCell>
                            <TableCell align="left">{addressToString(row.address)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
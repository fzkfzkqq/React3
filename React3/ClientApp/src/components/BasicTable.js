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
import IconButton from '@material-ui/core/IconButton';
import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';
import { addressToString } from "./AddressToString";
import RestoreIcon from '@material-ui/icons/Restore';
import { TableCollapse } from './TableCollapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Row from './Row';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 750,
    },
});

const columns = [
    { id: 'action', label: 'Action', minWidth: 170, align: 'left', },
    { id: 'id', label: 'Id', minWidth: 170, align: 'left', },
    { id: 'name', label: 'Property Name', minWidth: 250, align: 'left', },
    { id: 'unit', label: 'Unit Number', minWidth: 250, align: 'left', },
    { id: 'enabled', label: 'Enabled', minWidth: 170, align: 'left', },
    { id: 'address', label: 'Address', minWidth: 250, align: 'left', },
];


export default function BasicTable(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    /*
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
    *
    */
    return (
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((row) => (
                        <Row key={row.id} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
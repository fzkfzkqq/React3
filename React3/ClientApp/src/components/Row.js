import React from 'react';
import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RestoreIcon from '@material-ui/icons/Restore';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';
import { addressToString } from "./AddressToString";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ActionsMenu from './ActionsMenu';

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow >
                <TableCell>
                    <ActionsMenu />
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton> 
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.unitNo}</TableCell>
                <TableCell align="left">{row.isEnabled ? <AdjustOutlinedIcon style={{ color: green[500] }} /> : <AdjustOutlinedIcon color="primary" />}</TableCell>
                <TableCell align="left">{addressToString(row.address)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
              </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
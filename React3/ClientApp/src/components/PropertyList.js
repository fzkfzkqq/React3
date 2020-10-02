import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { getProperties } from '../api/API';
import { Column, Table } from 'react-virtualized';
import VirtualizedTable from './VirtualizedTable';
import ReactVirtualizedTable from './MuiVirtualizedTable';
import BasicTable from './BasicTable';
//import MuiVirtualizedTable from './VirtualizedTable';
/*
const columns = [{ field: 'id', headerName: 'ID', width: 70 },
{ filed: 'name', headerName: 'Property Name', width: 130 },
    { filed: 'isEnabled', headerName: 'Enabled', width: 70 },
    { filed: 'unitNo', headerName: 'Unit Number', width: 70 },];
 */

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            //paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

function PropertyList() {
    const [items, setData] = React.useState([]);
    const getPropertyModel = {
        "userId":"cf60afed-dc27-41ff-867d-99254146a636",
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
    },[]);
    /*
    return (
        <ul>
            {items.map((item) => {
            return (
                <li key={item.id}>
                    <a>{item.id}</a>
                    <a>{item.name}</a>
                    <a>{item.address.route}</a>
                </li>
                )
        })}
        </ul>    
    )
    */;
    const columns = [{ width: 200, label: 'ID', dataKey: 'id' }, { width: 200, label: 'Name', dataKey: 'id' }];
    return (
        /*
        <Paper style={{ height: 600, width: '100%' }}>
            <VirtualizedTable
                height={300}
                width={300}
                classes={styles}
                rowCount={items.length}
                columns={columns}>
            </VirtualizedTable>
                
        </Paper>
        */
        <BasicTable />
    );

}
    
export default PropertyList;
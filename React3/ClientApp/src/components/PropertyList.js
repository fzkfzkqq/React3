import * as React from 'react';
import { getProperties } from '../api/API';
import { Column, Table } from 'react-virtualized';
/*
const columns = [{ field: 'id', headerName: 'ID', width: 70 },
{ filed: 'name', headerName: 'Property Name', width: 130 },
    { filed: 'isEnabled', headerName: 'Enabled', width: 70 },
    { filed: 'unitNo', headerName: 'Unit Number', width: 70 },];
 */

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
}
    
export default PropertyList;
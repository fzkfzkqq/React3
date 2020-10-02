import React from "react";
import { PropTypes } from "prop-types";
import clsx from 'clsx';
import classNames from "classnames";
import { getProperties } from '../api/API';
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {
    AutoSizer,
    Column,
    SortDirection,
    Table,
    WindowScroller
} from "react-virtualized";

export const styles = theme => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box"
    },
    tableRow: {
        cursor: "pointer"
    },
    tableRowHover: {
        "&:hover": {
            //backgroundColor: theme.palette.grey[200]
        }
    },
    tableCell: {
        flex: 1
    },
    noClick: {
        cursor: "initial"
    }
});

class MuiVirtualizedTable extends React.PureComponent {

    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };
    constructor(props) {
        super(props)
        this.classes = styles()
    }
    /**
     * Return the row class names
     * tableRowHover is applied to non-header rows when onRowClick has been specified
     * @private
     */
    getRowClassName = ({ index }) => {
        const {
            classes: { tableRow, tableRowHover, flexContainer },
            rowClassName,
            onRowClick
        } = this.props;
        return classNames({
            [tableRow]: true,
            [flexContainer]: true,
            [rowClassName]: true,
            [tableRowHover]: index !== -1 && onRowClick != null
        });
    };

    /**
     * Render cell data within material-ui TableCell, optionally set cursor to initial if click handler was not supplied
     * @private
     */
    cellRenderer = ({ cellData, columnIndex = null }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, {
                    [classes.flexContainer]: true,
                    [classes.noClick]: onRowClick == null
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    /**
     * Render column header with TableSortLabel for sortable columns, using the current sortBy/sortDirection for rendering indicators
     * @private
     */

    headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
        const { headerHeight, columns, classes, sort } = this.props;
        const direction = {
            [SortDirection.ASC]: "asc",
            [SortDirection.DESC]: "desc"
        };
        const inner =
            !columns[columnIndex].disableSort && sort != null ? (
                <TableSortLabel
                    active={dataKey === sortBy}
                    direction={direction[sortDirection]}
                >
                    <span> {label}
                    </span>
                </TableSortLabel>
            ) : (
                    label
                );
        return (
            <TableCell
                component="div"
                className={classNames(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                {inner}
            </TableCell>
        );
    };
    /*
    headerRenderer = ({ label, columnIndex }) => {
       const { headerHeight, columns, classes } = this.props;
   
       return (
         <TableCell
           component="div"
           className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
           variant="head"
           style={{ height: headerHeight }}
           align={columns[columnIndex].numeric || false ? 'right' : 'left'}
         >
           <span>{label}</span>
         </TableCell>
       );
     };
   */
    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;

        return (
            <AutoSizer >
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        }
                        )}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.shape({
        flexContainer: PropTypes.string,
        noClick: PropTypes.string,
        tableCell: PropTypes.string,
        tableRow: PropTypes.string,
        tableRowHover: PropTypes.string
    }).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 56,
    onRowClick: undefined,
    rowClassName: null,
    rowHeight: 56,
    sort: undefined
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

/*
function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}
*/
const columns = [{ dataKey: 'id', label: 'ID', width: 70, sortDirection: 'asc',},
    { dataKey: 'name', label: 'Property Name', width: 300, sortDirection: 'asc' },
    { dataKey: 'address.locality', label: 'Address', width: 70, sortDirection: 'asc'},
    { dataKey: 'unitNo', label: 'Unit Number', width: 70, sortDirection: 'asc'},];

export default function ReactVirtualizedTable() {
    const [items, setData] = React.useState([]);
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
        <Paper style={{ height: 400, width: '100%' }}>
            <VirtualizedTable
                rowCount={items.length}
                rowGetter={({ index }) => items[index]}
                columns={columns}
            />
        </Paper>
    );
}
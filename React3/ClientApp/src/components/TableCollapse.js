import React from 'react';
import Collapse from '@material-ui/core/Collapse';

export const TableCollapse = props => (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <ul>
                <li>a</li>
                <li>b</li>
            </ul>
        </Collapse>
    );
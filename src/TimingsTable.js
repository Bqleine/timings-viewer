import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
    {
        dataField: "name",
        text: "Name",
        sort: true,
    },
    {
        dataField: "time",
        text: "Total time",
        sort: true,
        sortFunc: numberSort,
        formatter: timeCellFormatter
    },
    {
        dataField: "count",
        text: "Count",
        sort: true,
        sortFunc: numberSort,
    },
    {
        dataField: "avg",
        text: "Average",
        sort: true,
        sortFunc: numberSort,
        formatter: timeCellFormatter
    },
    {
        dataField: "violations",
        text: "Violations",
        sort: true,
        sortFunc: numberSort,
    },
];

function numberSort(a, b, order, dataField, rowA, rowB) {
    if (order === "asc") {
        return a - b;
    }
    return b - a;
}

function timeCellFormatter(cell, row) {
    return (
        <span>{Math.round(parseInt(cell) / 10000) / 100 + "ms"}</span>
    )
}

const expandRow = {
    renderer: row => {
        if (row.details === undefined || Object.entries(row.details).length === 0) {
            return (
                <p>No details</p>
            )
        }

        return (
            <TimingsTable timings={Object.values(row.details)}/>
        )
    }
}

class TimingsTable extends Component {
    render() {
        return (
            <BootstrapTable keyField={"name"} data={this.props.timings} columns={columns} expandRow={expandRow} hover defaultSorted={[{
                dataField: "time",
                order: "desc"
            }]}/>
        )
    }
}

export default TimingsTable;
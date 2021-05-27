import {Component} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {defLogs} from "../static/deflogs";
import axios from "axios";

const url = 'http://localhost:8080/api/v1/';

class LogsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: defLogs,
            processId: "",
        };
    }

    componentDidMount() {

    }

    getLogsByProcessId(processId) {
        let self = this
        axios.get(url + 'get-log', {
            params: {
                processId: this.state.processId,
            }
        })
            .then((response) => {
                if (response.data.length > 0) {
                    self.setState({
                        logs: response.data,
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <TextField
                    style={{width: 340, marginRight: 5}}
                    onChange={(event) => {
                        this.setState({
                            processId: event.target.value,
                        })
                    }
                    } id="processId" label="id процесса" value={this.state.processId}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.getLogsByProcessId()}
                >Показать логи
                </Button>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>operation</TableCell>
                                <TableCell align="right">status</TableCell>
                                <TableCell align="right">comment</TableCell>
                                <TableCell align="right">startTime</TableCell>
                                <TableCell align="right">finishTime</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.logs.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.operation}
                                        </TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">{row.comment}</TableCell>
                                        <TableCell align="right">{row.startTime}</TableCell>
                                        <TableCell align="right">{row.finishTime}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default LogsTable;
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {Component} from "react";
import axios from "axios";
import {Autocomplete} from "@material-ui/lab";
import {defRecipe} from "../static/defRecipe";
import {defParams} from "../static/defParams";

const url = 'http://localhost:8080/api/v1/';

class StartCookingProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            currentRecipe: defRecipe,
            params: null,
            currentParam: defParams,
            processId: "",
            processCount:0,
        };
    }

    componentDidMount() {
        this.getAllRecipe();
        this.getAllParams();
        // this.getProcessCount();
    }
    // //
    // getProcessCount() {
    //     let self = this
    //     axios.get(urlCamunda + 'process-instance/count', {})
    //         .then((response) => {
    //             self.setState({
    //                 processCount: response.data.count,
    //             })
    //         })
    // }
    getAllRecipe() {
        let self = this
        axios.get(url + 'get-all-recipe', {})
            .then((response) => {
                self.setState({
                    recipes: response.data,
                })
            })
    }

    getAllParams() {
        let self = this
        axios.get(url + 'get-all-params', {})
            .then((response) => {
                self.setState({
                    params: response.data,
                })
            })
    }

    getCamundaProcess() {
        let self = this
        axios.get(url + 'start-process', {
            params: {
                idRecipe: self.state.currentRecipe.id,
                idParams: self.state.currentParam.id
            }
        })
            .then((response) => {
                if (response.data.ProcessInstanceId != null) {
                    self.setState({
                        processId: response.data.ProcessInstanceId,
                    })
                } else if (response.data.ERROR != null) {
                    self.setState({
                        processId: response.data.ERROR,
                    })
                }

            })
    }


    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Autocomplete
                            size="small"
                            options={this.state.recipes}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    this.setState({
                                        currentRecipe: newValue,
                                    })
                                }
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Выберите рецепт" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField value={this.state.currentRecipe.id} id="id" label="Ид"
                                       defaultValue="id"/>
                            <TextField value={this.state.currentRecipe.name} id="name" label="Назвние"
                                       defaultValue="name"/>
                            <TextField value={this.state.currentRecipe.flour} id="flour" label="Мука/кг"
                                       defaultValue="flour"/>
                            <TextField value={this.state.currentRecipe.water} id="water" label="Вода/литр"
                                       defaultValue="water"/>
                            <TextField value={this.state.currentRecipe.bakingPowder} id="bakingPowder"
                                       label="Разрыхлитель/кг" defaultValue="bakingPowder"/>
                            <TextField value={this.state.currentRecipe.ferment} id="ferment" label="Дрожжи/кг"
                                       defaultValue="ferment"/>
                            <TextField value={this.state.currentRecipe.additive} id="additive" label="Добавки"
                                       defaultValue="additive"/>
                            <TextField value={this.state.currentRecipe.additiveCount} id="additiveCount"
                                       label="Добавки кол./кг" defaultValue="additiveCount"/>
                            <TextField value={this.state.currentRecipe.sugar} id="sugar" label="Сахар/кг"
                                       defaultValue="sugar"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            size="small"
                            options={this.state.params}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    this.setState({
                                        currentParam: newValue,
                                    })
                                }
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Выберите конфигурацию" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField value={this.state.currentParam.id} id="id" label="Ид"/>
                            <TextField value={this.state.currentParam.name} id="name" label="Название"/>
                            <TextField value={this.state.currentParam.mixerPower} id="mixerPower"
                                       label="Мощность миксера"/>
                            <TextField value={this.state.currentParam.mixerTime} id="mixerTime"
                                       label="Время работы миксера"/>
                            <TextField value={this.state.currentParam.furnaceTemperature} id="furnaceTemperature"
                                       label="Температура печи"/>
                            <TextField value={this.state.currentParam.furnaceTime} id="furnaceTime"
                                       label="Время работы печи"/>
                            <TextField value={this.state.currentParam.holdTime} id="holdTime" label="Время ожидпния"/>
                            <TextField value={this.state.currentParam.acceptableDeviation} id="acceptableDeviation"
                                       label="Допустимое отклонение"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.getCamundaProcess()}
                        >Старт процесса
                        </Button>
                        <TextField fullWidth={true} value={this.state.processId} id="processId" label="id процесса"/>
                        После запуска сверните этот акаридон и откройте следующий с отоброжением логов запущегоно процесса
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default StartCookingProcess;
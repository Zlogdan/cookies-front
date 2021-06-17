import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {Component} from "react";
import axios from "axios";
import {Autocomplete} from "@material-ui/lab";
import {defRecipe} from "../static/defRecipe";

const url = 'http://localhost:8080/api/v1/';

class StartCookingProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [defRecipe,],
            currentRecipe: defRecipe,
            params: null,
            currentParam: defRecipe.hardwareParameters,
            processId: "",
            processCount: 0,
        };
    }

    componentDidMount() {
        this.getAllRecipe();
    }

    getAllRecipe() {
        let self = this
        axios.get(url + 'get-all-recipe', {})
            .then((response) => {
                self.setState({
                    recipes: response.data,
                })
            })
            .catch(e => {
                console.log(e)
                console.log("Ошибка получения рецептов")
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
                                        currentParam: newValue.hardwareParameters,
                                    })
                                }
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Выберите рецепт" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.id} id="id"
                                       label="Номер рецепта"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.name} id="name"
                                       label="Название"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.flour} id="flour"
                                       label="Мука/кг"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.water} id="water"
                                       label="Вода/литр"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.bakingPowder}
                                       id="bakingPowder" label="Разрыхлитель/гр"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.ferment}
                                       id="ferment" label="Дрожжи/гр"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.additive}
                                       id="additive" label="Добавки"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.additiveCount}
                                       id="additiveCount" label="Добавки кол./гр"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.sugar} id="sugar"
                                       label="Сахар/кг"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.eggs} id="eggs"
                                       label="Яйца/штук"/>
                            <TextField InputProps={{readOnly: true,}} value={this.state.currentRecipe.butter}
                                       id="butter" label="Масло/маргарин/кг"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h5" component="h2">Конфигурация оборудования</Typography>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.id} id="id"
                                       label="Номер конфигурации"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.name} id="name"
                                       label="Название"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.mixerPower}
                                       id="mixerPower" label="Мощность миксера/ватт"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.mixerTime}
                                       id="mixerTime" label="Таймер миксера/мин"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.furnaceTemperature}
                                       id="furnaceTemperature" label="Температура печи/°C"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.furnaceTime}
                                       id="furnaceTime" label="Время работы печи/мин"/>
                            <TextField style={{width: "80%"}} InputProps={{readOnly: true,}}
                                       value={this.state.currentParam.holdTime}
                                       id="holdTime" label="Время ожидания/мин"/>
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
                        После запуска сверните этот аккаридон и откройте следующий, с отображением логов запущеного
                        процесса
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default StartCookingProcess;
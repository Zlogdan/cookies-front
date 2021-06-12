import {Component} from "react";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {defRecipe} from "../static/defRecipe";
import axios from "axios";
import {defParams} from "../static/defParams";

const url = 'http://localhost:8080/api/v1/';

class RecipeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [defRecipe,],
            params: [defParams,],
            id: "",
            name: "",
            flour: "",
            water: "",
            bakingPowder: "",
            ferment: "",
            additive: "",
            additiveCount: "",
            sugar: "",
            hardwareParameters: null,
            paramId: "",
            paramName: "",
            mixerPower: "",
            mixerTime: "",
            furnaceTemperature: "",
            furnaceTime: "",
            holdTime: "",
            delRecipeId: "",
            delParamId: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectRecipeFromDb = this.selectRecipeFromDb.bind(this);
        this.selectParamsFromDb = this.selectParamsFromDb.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        this.setState({
            [id]: value
        });
    }

    componentDidMount() {
        this.getAllRecipe();
        this.getAllParams();
    }

    getAllParams() {
        let self = this
        axios.get(url + 'get-all-params', {})
            .then((response) => {
                self.setState({
                    params: response.data,
                })
            })
            .catch(e => {
                console.log(e)
                console.log("Ошибка получения конфигурации")
            })
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

    selectRecipeFromDb(event, newValue) {
        if (newValue != null) {
            this.setState({
                id: newValue.id,
                name: newValue.name,
                flour: newValue.flour,
                water: newValue.water,
                bakingPowder: newValue.bakingPowder,
                ferment: newValue.ferment,
                additive: newValue.additive,
                additiveCount: newValue.additiveCount,
                sugar: newValue.sugar,
                hardwareParameters: newValue.hardwareParameters,
            })
        }
    }

    selectParamsFromDb(event, newValue) {
        if (newValue != null) {
            this.setState({
                paramId: newValue.id,
                paramName: newValue.name,
                mixerPower: newValue.mixerPower,
                mixerTime: newValue.mixerTime,
                furnaceTemperature: newValue.furnaceTemperature,
                furnaceTime: newValue.furnaceTime,
                holdTime: newValue.holdTime,
            })
        }
    }

    addRecipe() {
        //todo
    }

    updateRecipe() {
        //todo
    }

    deleteRecipe() {
        //todo
    }

    addParam() {
        //todo
    }

    updateParam() {
        //todo
    }

    deletePAram() {
        //todo
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
                            onChange={this.selectRecipeFromDb}
                            renderInput={(params) =>
                                <TextField {...params} label="Выберите рецепт" variant="outlined"/>}
                        />
                        <Button
                            className="mt-2"
                            variant="contained"
                            color="default"
                            onClick={() => this.updateRecipe()}
                        >Сохранить изменения рецепта
                        </Button>
                        <Button
                            className="mt-2"
                            variant="contained"
                            color="primary"
                            onClick={() => this.addRecipe()}
                        >Добавить как новый рецепт
                        </Button>
                        <Button
                            className="mt-5"
                            variant="outlined"
                            color="secondary"
                            onClick={() => this.deleteRecipe()}
                        >Удалить рецепт
                        </Button>
                        <TextField fullWidth={true} value={this.state.delRecipeId} id="delRecipeId"
                                   label="id удаляемого рецепта"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.id} id="id" label="Номер рецепта"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.name} id="name" label="Название"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.flour} id="flour" label="Мука/кг"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.water} id="water" label="Вода/литр"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.bakingPowder} id="bakingPowder"
                                       label="Разрыхлитель/гр"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.ferment} id="ferment" label="Дрожжи/гр"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.additive} id="additive" label="Добавки"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.additiveCount} id="additiveCount"
                                       label="Добавки кол./гр"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.sugar} id="sugar" label="Сахар/кг"/>
                            <TextField value={this.state.eggs} id="eggs" label="Яйца/штук"/>
                            <TextField value={this.state.butter} id="butter" label="Масло/маргарин/кг"/>
                            <TextField onChange={this.handleInputChange}
                                       value={this.state.hardwareParameters} id="hardwareParameters"
                                       label="Номер конфигурации"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            size=""
                            options={this.state.params}
                            getOptionLabel={(option) => option.name}
                            onChange={this.selectParamsFromDb}
                            renderInput={(params) =>
                                <TextField {...params} label="Кнфигурации оборудования" variant="outlined"/>}
                        />
                        <Button
                            className="mt-2"
                            variant="contained"
                            color="secondary"
                            onClick={() => this.updateParam()}
                        >Сохранить изменения конфигурации
                        </Button>
                        <Button
                            className="mt-2"
                            variant="contained"
                            color="primary"
                            onClick={() => this.addParam()}
                        >Добавить как новую конфигурацию
                        </Button>
                        <Button
                            className="mt-5"
                            variant="outlined"
                            color="secondary"
                            onClick={() => this.deleteRecipe()}
                        >Удалить рецепт
                        </Button>
                        <TextField fullWidth={true} value={this.state.delParamId} id="delParamId"
                                   label="id удаляемой конфигурации"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className="bg-light pb-2 pt-2">
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.paramId} id="paramId"
                                       label="Номер конфигурации"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.paramName} id="paramName"
                                       label="Название"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.mixerPower} id="mixerPower"
                                       label="Мощность миксера/ватт"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.mixerTime} id="mixerTime"
                                       label="Таймер миксера/мин"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.furnaceTemperature}
                                       id="furnaceTemperature" label="Температура печи/°C"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.furnaceTime}
                                       id="furnaceTime"
                                       label="Время работы печи/мин"/>
                            <TextField style={{width: "80%"}} onChange={this.handleInputChange} value={this.state.holdTime} id="holdTime"
                                       label="Время ожидания/мин"/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default RecipeEditor;
import {Grid, Paper} from "@material-ui/core";
import FakeTimeController from "./FakeTimeController";
import FakeStatusController from "./FakeStatusController";

const FakeControllers = () => (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FakeTimeController/>
            </Grid>
            <Grid item xs={6}>
                <FakeStatusController/>
            </Grid>
        </Grid>
    </div>
)
export default FakeControllers
import {Grid} from "@material-ui/core";
import FakeStatusController from "./FakeStatusController";
import FakeWorkController from "./FakeWorkController";

const FakeControllers = () => (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FakeStatusController/>
            </Grid>
            <Grid item xs={6}>
                <FakeWorkController/>
            </Grid>
        </Grid>
    </div>
)
export default FakeControllers
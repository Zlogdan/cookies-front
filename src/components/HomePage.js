import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import StartCookingProcess from "./StartCookingProcess";
import LogsTable from "./LogsTable";
import RecipeEditor from "./RecipeEditor";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
export default function HomePage() {
    const classes = useStyles();

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Запуск процесса</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Paper className="bg-light ml-5 pl-2 pb-2 pt-2 mr-5 pr-2">
                            <StartCookingProcess/>
                        </Paper>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Лог процесса</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LogsTable/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Добавление и удаление</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Paper className="bg-light ml-5 pl-2 pb-2 pt-2 mr-5 pr-2">
                            <RecipeEditor/>
                        </Paper>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
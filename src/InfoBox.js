import React from 'react';
import "./Infobox.css";
import {Card,CardContent,Typography} from "@material-ui/core";

function InfoBox({title, cases, total, ...props}) {
    return (
        <Card onClick={props.onClick} className="infoBox">
        <CardContent>
        {/* Title i.e Coronavirus cases*/}
        <Typography className="infoBox"  color="textSecondary">{title}</Typography>

        {/* +120k number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* 1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
        {total} Total
        </Typography>
    </CardContent>
</Card>
    )
}

export default  InfoBox
import React from 'react';
import $ from 'jquery';

import styles from './Row.module.css';

class Sea extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            color: '#FEF8FF',
            data: []
        }

        this.createRow.bind(this);
        this.createHeader.bind(this);
    }

    componentDidMount()
    {
        $.getJSON("https://acnhapi.com/v1/sea")
            .then(result => this.setState({
                color: this.state.color,
                data: result
        }));
    }

    createRow(image, name, price, time, speed, shadow)
    {
        return(
            <div className={`${styles.row}`}>
                <div src={styles.image}>
                    <img src={image} alt={name} style={{'--color': this.state.color}} />
                </div>
                <h1>{name}</h1>
                <h1>{price}</h1>
                <h1>{time}</h1>
                <h1>{speed}</h1>
                <h1>{shadow}</h1>
            </div>
        )
    }

    createHeader()
    {
        return(
            <div className={`${styles.row}`} id={styles.names}>
                <h1>Image</h1>
                <h1>Name</h1>
                <h1>Price</h1>
                <h1>Time</h1>
                <h1>Speed</h1>
                <h1>Shadow Size</h1>
            </div>
        );
    }

    render()
    {
        if(this.state.data.length === 0)
        {
            return(
                <div className={styles.container}>
                    Loading
                </div>
            );
        }
        else
        {
            // Manipulate data
            var rows = [];

            for(var i = 0; i < Object.keys(this.state.data).length; i++)
            {
                var index = Object.keys(this.state.data)[i];

                var image = this.state.data[index]['icon_uri'];

                // Format name
                var name = this.state.data[index]['file-name'].replaceAll('_', ' ').split(" ");

                for(let i = 0; i < name.length; i++)
                {
                    name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
                }

                var price = this.state.data[index]['price'];
                
                // Format time
                var time = this.state.data[index]['availability']['time'];
                if(time === "")
                    time = "All Day";

                var speed = this.state.data[index]['speed'];
                var shadow = this.state.data[index]['shadow']

                rows.push(this.createRow(image, name, price, time, speed, shadow));
            }
            
            var header = this.createHeader();

            return(
                <div className={`${styles.container}`}>
                    {header}
                    {rows}
                </div>
            );
        }
    }
}

export default Sea;
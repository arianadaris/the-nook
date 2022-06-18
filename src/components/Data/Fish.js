import React from 'react';
import $ from 'jquery';

import styles from './Row.module.css';

class Fish extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            color: '#F6FEFF',
            data: []
        }

        this.createRow.bind(this);
        this.createHeader.bind(this);
    }

    componentDidMount()
    {
        $.getJSON("https://acnhapi.com/v1/fish")
            .then(result => this.setState({
                color: this.state.color,
                data: result
        }));
    }

    createRow(image, name, price, location, time, shadow)
    {
        return(
            <div className={styles.row}>
                <div src={styles.image}>
                    <img src={image} alt={name} style={{'--color': this.state.color}} />
                </div>
                <h1>{name}</h1>
                <h1>{price}</h1>
                <h1>{location}</h1>
                <h1>{time}</h1>
                <h1>{shadow}</h1>
            </div>
        )
    }

    createHeader()
    {
        return(
            <div className={`${styles.row} ${styles.hide}`} id={styles.names}>
                <h1>Image</h1>
                <h1>Name</h1>
                <h1>Price</h1>
                <h1>Location</h1>
                <h1>Time</h1>
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
                var location = this.state.data[index]['availability']['location'];
                
                // Format time
                var time = this.state.data[index]['availability']['time'];
                if(time === "")
                    time = "All Day";

                // Format Shadow Size
                var shadow = parseInt(this.state.data[index]['shadow'].replace(/[^0-9\.]/g, ''), 10);

                rows.push(this.createRow(image, name, price, location, time, shadow));
            }
            
            var header = this.createHeader();

            return(
                <div className={`${styles.container} ${styles.hide}`}>
                    {header}
                    {rows}
                </div>
            );
        }
    }
}

export default Fish;
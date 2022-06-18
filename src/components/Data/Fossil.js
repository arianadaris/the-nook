import React from 'react';
import $ from 'jquery';

import styles from './Row.module.css';

class Fossil extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            color: '#F3F5FF',
            data: []
        }

        this.createRow.bind(this);
        this.createHeader.bind(this);
    }

    componentDidMount()
    {
        $.getJSON("https://acnhapi.com/v1/fossils")
            .then(result => this.setState({
                color: this.state.color,
                data: result
        }));
    }

    createRow(image, name, price, partOf)
    {
        return(
            <div className={`${styles.row} ${styles.fossil}`}>
                <div src={styles.image}>
                    <img src={image} alt={name} style={{'--color': this.state.color}} />
                </div>
                <h1>{name}</h1>
                <h1>{price}</h1>
                <h1>{partOf}</h1>
            </div>
        )
    }

    createHeader()
    {
        return(
            <div className={`${styles.row} ${styles.hide} ${styles.fossil}`} id={styles.names}>
                <h1>Image</h1>
                <h1>Name</h1>
                <h1>Price</h1>
                <h1>Part Of</h1>
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

                var image = this.state.data[index]['image_uri'];

                // Format name
                var name = this.state.data[index]['file-name'].replaceAll('_', ' ');
                name = name.split(" ");

                for(let i = 0; i < name.length; i++)
                {
                    name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
                }

                var price = this.state.data[index]['price'];

                // Format part of
                var partOf = this.state.data[index]['part-of'];
                partOf = partOf.split(" ");
                
                for(let i = 0; i < partOf.length; i++)
                {
                    partOf[i] = partOf[i][0].toUpperCase() + partOf[i].substring(1) + " ";
                }


                rows.push(this.createRow(image, name, price, partOf));
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

export default Fossil;
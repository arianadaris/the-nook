import React from 'react';
import $ from 'jquery';

import styles from './Row.module.css';

class Villagers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            color: '#FFF9E6',
            data: []
        }

        this.createRow.bind(this);
        this.createHeader.bind(this);
    }

    componentDidMount()
    {
        $.getJSON("https://acnhapi.com/v1/villagers")
            .then(result => this.setState({
                color: this.state.color,
                data: result
        }));
    }

    createRow(image, name, species, personality, birthday, catchPhrase)
    {
        return(
            <div className={`${styles.row}`}>
                <div src={styles.image}>
                    <img src={image} alt={name} style={{'--color': this.state.color}} />
                </div>
                <h1>{name}</h1>
                <h1>{species}</h1>
                <h1>{personality}</h1>
                <h1>{birthday}</h1>
                <h1>{catchPhrase}</h1>
            </div>
        )
    }

    createHeader()
    {
        return(
            <div className={`${styles.row}`} id={styles.names}>
                <h1>Image</h1>
                <h1>Name</h1>
                <h1>Species</h1>
                <h1>Personality</h1>
                <h1>Birthday</h1>
                <h1>Catch Phrase</h1>
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
                var name = this.state.data[index]['name']['name-USen'].replace('_', ' ').split(" ");

                for(let i = 0; i < name.length; i++)
                {
                    name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
                }

                var species = this.state.data[index]['species'];
                var personality = this.state.data[index]['personality'];
                var birthday = this.state.data[index]['birthday-string'];
                var catchPhrase = this.state.data[index]['catch-phrase'];

                rows.push(this.createRow(image, name, species, personality, birthday, catchPhrase));
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

export default Villagers;
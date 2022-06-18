import React from 'react';
import $ from 'jquery';

import styles from './List.module.css';


class Row
{
    constructor(name, species, html)
    {
        this.name = name;
        this.species = species;
        this.html = html;
    }
}


class List extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            color: '#FFF9E6',
            data: [],
            rows: [],
            found: []
        }

        this.manipulateData.bind(this);
        this.createRow.bind(this);
        this.search.bind(this);
        this.sortByName.bind(this);
        this.sortBySpecies.bind(this);
    }

    componentDidMount()
    { 
        // Get data from the ACNH API
        $.getJSON("https://acnhapi.com/v1/villagers")
            .then(result => {
                this.setState({
                    color: this.state.color,
                    data: result,
                    rows: this.state.rows,
                    found: this.state.rows
            });
        })
            .then(result => this.manipulateData());
    }

    manipulateData()
    {
        // Store the data in appropriate variables 
        console.log("here " +  Object.keys(this.state.data).length);
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

            // Create and format a row HTML element
            var rowHtml = this.createRow(image, name, species, personality, birthday, catchPhrase);

            // Create a Row object to store name (for searching) and row HTML
            var row = new Row(name, species, rowHtml);

            // Save row to this.state.rows, and update this.state.found
            var allRows = this.state.rows;
            allRows.push(row);
            this.setState({
                color: this.state.color,
                data: this.state.data,
                rows: allRows,
                found: allRows
            });
        }
        this.sortByName();
    }

    createRow(image, name, species, personality, birthday, catchPhrase)
    {
        // Creat an HTML row element with proper formating
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

    search = (e) =>
    {
        // Search for a villager based on name keyword
        const keyword = e.target.value;
        if(keyword != '')
        {
            var allRows = this.state.rows;
            const results = allRows.filter((row) => {
                return row.name[0].toLowerCase().startsWith(keyword.toLowerCase());
            });
            this.setState({
                found: results
            })
        }
        else
        {
            this.setState({
                found: this.state.rows
            })
        }
    }

    sortByName()
    {
        // Sort this.state.found by name
        var sorted = this.state.found.sort(function(a, b) {
            var nameA = a.name[0].toUpperCase();
            var nameB = b.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        this.setState({
            color: this.state.color,
            data: this.state.data,
            rows: this.state.rows,
            found: sorted
        });
    }

    sortBySpecies()
    {
        // Sort this.state.found by species
        var sorted = this.state.found.sort(function(a, b) {
            var nameA = a.species[0].toUpperCase();
            var nameB = b.species[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        this.setState({
            color: this.state.color,
            data: this.state.data,
            rows: this.state.rows,
            found: sorted
        });
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
            var rows = [];
            for(let row of this.state.found)
                rows.push(row.html);

            if(rows.length === 0)
                rows.push(
                    <h3>Could not find a match.</h3>
                );

            return(
                <div className={styles.container}>
                    <div className={styles.section}>
                        {/* Header with Search Bar */}
                        <div className={styles.header}>
                            <h1>Villagers</h1>
                            <div className={styles.searchWrapper}>
                                <input className={styles.searchBar} type="text" placeholder="Search a name..." onChange={this.search}/>
                                <div className={styles.image}>
                                    <span className={`${'iconify'} ${styles.iconify}`} data-icon="bx:search" data-width="32"></span>
                                </div>
                            </div>
                        </div>
                        {/* Column Names Row */}
                        <div className={`${styles.row}`} id={styles.names}>
                            <h1>Image</h1>
                            <h1>Name</h1>
                            <h1 onClick={this.sortBySpecies}>Species</h1>
                            <h1>Personality</h1>
                            <h1>Birthday</h1>
                            <h1>Catch Phrase</h1>
                        </div>
                        {/* Data Rows */}
                        {rows}
                    </div>
                </div>
            );
        }
    }
}

export default List;
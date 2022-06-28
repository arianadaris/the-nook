import React from 'react';
import Select from 'react-select';

import styles from './Row.module.css';

import Loader from '../../assets/Loader.gif';

import timeOptions from '../../data/FishTime.json';
import priceOptions from '../../data/Price.json';

class SeaCreature
{
    constructor(image, name, price, time, shadow, speed)
    {
        this.color = "#FEF8FF";
        this.image = image;
        this.name = name;
        this.price = price;
        this.time = time;
        this.shadow = shadow;
        this.speed = speed;
    }
}

class Row
{
    constructor(seaCreature)
    {
        this.seaCreature = seaCreature;
        this.html = this.createHTML();

        this.createHTML.bind(this);
    }

    createHTML()
    {
        return(
            <div className={styles.row}>
                <div src={styles.image}>
                    <img src={this.seaCreature.image} alt={this.seaCreature.name} style={{'--color': this.seaCreature.color}} />
                </div>
                <h1>{this.seaCreature.name}</h1>
                <h1>{this.seaCreature.price}</h1>
                <h1>{this.seaCreature.time}</h1>
                <h1>{this.seaCreature.shadow}</h1>
                <h1>{this.seaCreature.speed}</h1>
            </div>
        )
    }
}

class SeaList extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            APIData: [],
            results: [],
            filteredResults: [],
            timeValue: "Time",
            priceValue: "Price"
        };

        // Select component styling
        this.customStyle = {
            control: () => ({
                backgroundColor: '#F3D7F6',
                borderRadius: '50px',
                padding: '0.25rem, 0.5rem',
                display: 'flex',
                color: '#393223',
                fontFamily: 'FOT-Seurat Pro B',
                fontSize: '0.85rem'
            }),
            indicatorSeparator: () => ({
                display: 'none'
            }),
            multiValue: () => ({
                backgroundColor: '#fcf7e8',
                borderRadius: '25px',
                padding: '0.25rem 0.5rem',
                color: '#393223',
                fontFamily: 'FOT-Seurat Pro B',
                fontSize: '0.85rem',
                display: 'flex'
            }),
        };

        // Manipulate API data function
        this.manipulateData.bind(this);

        // Search and Filter functions
        this.toggleFilter.bind(this);
        this.search = this.search.bind(this);
        this.filter = this.filter.bind(this);
        this.clearAll = this.clearAll.bind(this);

        // Sort functions
        this.sortByName = this.sortByName.bind(this);
    }

    componentDidMount()
    {
        // Get API data about villagers
        fetch("https://acnhapi.com/v1/sea")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    APIData: result
                })
            });
    }

    manipulateData()
    {
        var seaCreatureRows = [];
        for(var i = 0; i < Object.keys(this.state.APIData).length; i++)
        {
            var index = Object.keys(this.state.APIData)[i];

            var image = this.state.APIData[index]['icon_uri'];
            var price = this.state.APIData[index]['price'];
            var shadow = this.state.APIData[index]['shadow'];
            var speed = this.state.APIData[index]['speed'];

            // Format name
            var name = this.state.APIData[index]['name']['name-USen'].replace('_', ' ').split(" ");

            for(let i = 0; i < name.length; i++)
            {
                name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
            }

            // Format time
            var time = this.state.APIData[index]['availability']['time'];
            if (time === "")
                time = "All Day";

            var seaCreature = new SeaCreature(image, name, price, time, shadow, speed);
            var row = new Row(seaCreature);

            seaCreatureRows.push(row);
        }

        // Sort seaCreature by name
        // (We don't use this.sortByName() here because that function updates this.state.filteredResults and not also this.state.results)
        seaCreatureRows = seaCreatureRows.sort(function(a, b) {
            var nameA = a.seaCreature.name[0].toUpperCase();
            var nameB = b.seaCreature.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        // Update component state
        this.setState({
            results: seaCreatureRows,
            filteredResults: seaCreatureRows
        });
    }

    search(e)
    {
        const keyword = e.target.value;
        console.log(e.target.value);

        if(keyword !== '')
        {
            const searchResults = this.state.results.filter((result) => {
                return result.seaCreature.name[0].toLowerCase().startsWith(keyword.toLowerCase());
            });
            this.setState({
                filteredResults: searchResults
            });
        }
        else
        {
            this.setState({
                filteredResults: this.state.results
            });
        }
    }

    toggleFilter()
    {
        var filter = document.getElementById('filter');
        if(filter.classList.contains(`${styles.hide}`))
            filter.classList.remove(`${styles.hide}`);
        else
            filter.classList.add(`${styles.hide}`);
    }

    filter(e)
    {
        // Update state based on entry type
        var selectTime = "Time";
        var selectPrice = "Price";

        if(timeOptions.includes(e))
            selectTime = e.label;
        if(priceOptions.includes(e))
            selectPrice = e.label;

        var filtered = []
        this.state.results.map((result) => {
            // If a duplicate doesn't exist in the filtered rows list, AND the row we're added includes a filtered keyword, add that row to the filtered rows list
            if(!filtered.includes(result) && selectTime === result.seaCreature.time)
                filtered.push(result);
            else if(!filtered.includes(result) && selectPrice !== "Price")
            {
                if(selectPrice === "Lowest to Highest")
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.seaCreature.price
                        var nameB = b.seaCreature.price
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    });
                }
                else
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.seaCreature.price
                        var nameB = b.seaCreature.price
                        return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
                    });
                }
            }
        });

        // Edge case
        if(filtered.length === 0)
        {
            this.setState({
                filteredRows: this.state.result,
                timeValue: selectTime,
                priceValue: selectPrice
            });
            return;
        }
        else
            this.setState({
                filteredResults: filtered,
                timeValue: selectTime,
                priceValue: selectPrice
            });
    }

    clearAll()
    {
        this.setState({
            timeValue: "Time",
            priceValue: "Price"
        });
        this.sortByName();
    }

    sortByName()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.seaCreature.name[0].toUpperCase();
            var nameB = b.seaCreature.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        this.setState({
            filteredResults: sorted
        });
    }

    render()
    {
        if(this.state.isLoaded)
        {
            // Manipulate data if this is the first time loading
            if(this.state.results.length === 0)
                this.manipulateData();

            return(
                <a id="sea-list"><div className={styles.section} id={styles.sea}>
                    {/* Header with Search Bar and Filter */}
                    <div className={styles.header}>
                        <h1>Sea Creatures</h1>
                        <div className={styles.searchWrapper}>
                            <input className={styles.searchBar} type="text" placeholder="Search name, price..." onChange={this.search}/>
                            <div className={styles.image}>
                                <span className={`${'iconify'} ${styles.iconify}`} data-icon="bx:search" data-width="32"></span>
                            </div>
                            <h2 onClick={this.toggleFilter}>Filter</h2>
                        </div>
                    </div>
                    <div className={`${styles.filterWrapper} ${styles.hide}`} id='filter'>
                        <div className={styles.filter}>
                            <div className={styles.filterItem}>
                                <Select isSearchable value={this.state.priceValue} styles={this.customStyle} placeholder={this.state.priceValue} options={priceOptions} onChange={this.filter} />
                            </div>
                            <div className={styles.filterItem}>
                                <Select isSearchable value={this.state.timeValue} styles={this.customStyle} placeholder={this.state.timeValue} options={timeOptions} onChange={this.filter} />
                            </div>
                        </div>
                        <div className={styles.clear}>
                            <h2 onClick={this.clearAll}>Clear All</h2>
                        </div>
                    </div>
                    {/* Column Names Row */}
                    <div className={`${styles.row}`} id={styles.names}>
                        <h1>Image</h1>
                        <h1>Name</h1>
                        <h1>Price</h1>
                        <h1>Time</h1>
                        <h1>Shadow</h1>
                        <h1>Speed</h1>
                    </div>
                    {/* Data Rows */}
                    <div className={styles.resultsWrapper}>
                        {this.state.filteredResults.map((result) => (result.html))}
                    </div>
                </div></a>
            )
        }
        else
        {
            return(
                <div className={styles.container} id={styles.loader}>
                    <img src={Loader} alt="Animal Crossing Island loader" />
                </div>
            );
        }
    }
}

export default SeaList;
import React from 'react';
import Select from 'react-select';

import styles from './Row.module.css';

import Loader from '../../assets/Loader.gif';

import timeOptions from '../../data/FishTime.json';
import priceOptions from '../../data/Price.json';
import locationOptions from '../../data/FishLocation.json';

class Fish
{
    constructor(image, name, price, location, time, shadow)
    {
        this.color = "#F6FEFF";
        this.image = image;
        this.name = name;
        this.price = price;
        this.location = location;
        this.time = time;
        this.shadow = shadow;
    }
}

class Row
{
    constructor(fish)
    {
        this.fish = fish;
        this.html = this.createHTML();

        this.createHTML.bind(this);
    }

    createHTML()
    {
        return(
            <div className={styles.row}>
                <div src={styles.image}>
                    <img src={this.fish.image} alt={this.fish.name} style={{'--color': this.fish.color}} />
                </div>
                <h1>{this.fish.name}</h1>
                <h1>{this.fish.price}</h1>
                <h1>{this.fish.location}</h1>
                <h1>{this.fish.time}</h1>
                <h1>{this.fish.shadow}</h1>
            </div>
        )
    }
}

class FishList extends React.Component
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
            locationValue: "Location",
            priceValue: "Price"
        };

        // Select component styling
        this.customStyle = {
            control: () => ({
                backgroundColor: '#BDE9F2',
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
        fetch("https://acnhapi.com/v1/fish")
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
        var fishRows = [];
        for(var i = 0; i < Object.keys(this.state.APIData).length; i++)
        {
            var index = Object.keys(this.state.APIData)[i];

            var image = this.state.APIData[index]['icon_uri'];
            var price = this.state.APIData[index]['price'];
            var location = this.state.APIData[index]['availability']['location'];

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

            // Format shadow size
            var shadow = parseInt(this.state.APIData[index]['shadow'].replace(/[^0-9\.]/g, ''), 10);

            var fish = new Fish(image, name, price, location, time, shadow);
            var row = new Row(fish);

            fishRows.push(row);
        }

        // Sort seaCreature by name
        // (We don't use this.sortByName() here because that function updates this.state.filteredResults and not also this.state.results)
        fishRows = fishRows.sort(function(a, b) {
            var nameA = a.fish.name[0].toUpperCase();
            var nameB = b.fish.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        // Update component state
        this.setState({
            results: fishRows,
            filteredResults: fishRows
        });
    }

    search(e)
    {
        const keyword = e.target.value;
        console.log(e.target.value);

        if(locationOptions.some(e => e.label.toLowerCase() === keyword.toLowerCase()))
        {
            const searchResults = this.state.results.filter((result) => result.fish.location.toLowerCase() === keyword.toLowerCase());
            this.setState({
                filteredResults: searchResults
            });
            return;
        }
        if(keyword !== '')
        {
            const searchResults = this.state.results.filter((result) => {
                return result.fish.name[0].toLowerCase().startsWith(keyword.toLowerCase());
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
        console.log(filter);
    }

    filter(e)
    {
        // Update state based on entry type
        var selectTime = "Time";
        var selectPrice = "Price";
        var selectLocation = "Location";

        if(timeOptions.includes(e))
            selectTime = e.label;
        if(priceOptions.includes(e))
            selectPrice = e.label;
        if (locationOptions.includes(e))
            selectLocation = e.label;

        var filtered = []
        this.state.results.map((result) => {
            // If a duplicate doesn't exist in the filtered rows list, AND the row we're added includes a filtered keyword, add that row to the filtered rows list
            if(!filtered.includes(result) && selectTime === result.fish.time)
                filtered.push(result);
            else if(!filtered.includes(result) && selectLocation === result.fish.location)
                filtered.push(result);
            else if(!filtered.includes(result) && selectPrice !== "Price")
            {
                if(selectPrice === "Lowest to Highest")
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.fish.price
                        var nameB = b.fish.price
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    });
                }
                else
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.fish.price
                        var nameB = b.fish.price
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
                priceValue: selectPrice,
                locationValue: selectLocation
            });
            return;
        }
        else
            this.setState({
                filteredResults: filtered,
                timeValue: selectTime,
                priceValue: selectPrice,
                locationValue: selectLocation
            });
    }

    clearAll()
    {
        this.setState({
            timeValue: "Time",
            priceValue: "Price",
            locationValue: "Location"
        });
        this.sortByName();
    }

    sortByName()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.fish.name[0].toUpperCase();
            var nameB = b.fish.name[0].toUpperCase();
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
                <a id="fish-list"><div className={styles.section} id={styles.fish}>
                    {/* Header with Search Bar and Filter */}
                    <div className={styles.header}>
                        <h1>Fish</h1>
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
                                <Select isSearchable value={this.state.priceValue} styles={this.customStyle} options={priceOptions} placeholder={this.state.priceValue} onChange={this.filter} />
                            </div>
                            <div className={styles.filterItem}>
                                <Select isSearchable value={this.state.locationValue} styles={this.customStyle} options={locationOptions} placeholder={this.state.locationValue} onChange={this.filter} />
                            </div>
                            <div className={styles.filterItem}>
                                <Select isSearchable value={this.state.timeValue} styles={this.customStyle} options={timeOptions} placeholder={this.state.timeValue} onChange={this.filter} />
                            </div>
                        </div>
                        <div className={styles.clear}>
                            <h2 onClick={this.clearAll}>Clear All</h2>
                        </div>
                    </div>
                    {/* Column Names Row */}
                    <div className={`${styles.row}`} id={styles.names}>
                        <h1>Image</h1>
                        <h1 id={styles.sort}>Name</h1>
                        <h1 id={styles.sort}>Price</h1>
                        <h1>Location</h1>
                        <h1>Time</h1>
                        <h1>Shadow</h1>
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

export default FishList;
import React from 'react';
import Select from 'react-select';

import styles from './Row.module.css';

import Loader from '../../assets/Loader.gif';

import timeOptions from '../../data/BugTime.json';
import priceOptions from '../../data/Price.json';
import locationOptions from '../../data/BugLocation.json';

class Bug
{
    constructor(image, name, price, location, time, rarity)
    {
        this.color = "#F6FEFF";
        this.image = image;
        this.name = name;
        this.price = price;
        this.location = location;
        this.time = time;
        this.rarity = rarity;
    }
}

class Row
{
    constructor(bug)
    {
        this.bug = bug;
        this.html = this.createHTML();

        this.createHTML.bind(this);
    }

    createHTML()
    {
        return(
            <div className={styles.row}>
                <div src={styles.image}>
                    <img src={this.bug.image} alt={this.bug.name} style={{'--color': this.bug.color}} />
                </div>
                <h1>{this.bug.name}</h1>
                <h1>{this.bug.price}</h1>
                <h1>{this.bug.location}</h1>
                <h1>{this.bug.time}</h1>
                <h1>{this.bug.rarity}</h1>
            </div>
        )
    }
}

class BugList extends React.Component
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
            priceValue: "Price",
            locationValue: "Location"
        };

        // Select component styling
        this.customStyle = {
            control: () => ({
                backgroundColor: '#CCF4DB',
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
        fetch("https://acnhapi.com/v1/bugs")
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
        var bugRows = [];
        for(var i = 0; i < Object.keys(this.state.APIData).length; i++)
        {
            var index = Object.keys(this.state.APIData)[i];

            var image = this.state.APIData[index]['icon_uri'];
            var price = this.state.APIData[index]['price'];
            var location = this.state.APIData[index]['availability']['location'];
            var rarity = this.state.APIData[index]['availability']['rarity'];

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

            var bug = new Bug(image, name, price, location, time, rarity);
            var row = new Row(bug);

            bugRows.push(row);
        }

        // Sort seaCreature by name
        // (We don't use this.sortByName() here because that function updates this.state.filteredResults and not also this.state.results)
        bugRows = bugRows.sort(function(a, b) {
            var nameA = a.bug.name[0].toUpperCase();
            var nameB = b.bug.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        // Update component state
        this.setState({
            results: bugRows,
            filteredResults: bugRows
        });
    }

    search(e)
    {
        const keyword = e.target.value;
        console.log(e.target.value);

        if(keyword !== '')
        {
            const searchResults = this.state.results.filter((result) => {
                return result.bug.name[0].toLowerCase().startsWith(keyword.toLowerCase());
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
            if(!filtered.includes(result) && selectTime === result.bug.time)
                filtered.push(result);
            else if(!filtered.includes(result) && selectLocation === result.bug.location)
                filtered.push(result);
            else if(!filtered.includes(result) && selectPrice !== "Price")
            {
                if(selectPrice === "Lowest to Highest")
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.bug.price
                        var nameB = b.bug.price
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    });
                }
                else
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.bug.price
                        var nameB = b.bug.price
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
            var nameA = a.bug.name[0].toUpperCase();
            var nameB = b.bug.name[0].toUpperCase();
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
                <a id="bug-list"><div className={styles.section} id={styles.bug}>
                    {/* Header with Search Bar and Filter */}
                    <div className={styles.header}>
                        <h1>Bugs</h1>
                        <div className={styles.searchWrapper}>
                            <input className={styles.searchBar} type="text" placeholder="Search name, price..." onChange={this.search} />
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
                        <h1>Rarity</h1>
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

export default BugList;
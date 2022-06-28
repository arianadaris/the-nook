import React from 'react';
import Select from 'react-select';

import styles from './Row.module.css';

import Loader from '../../assets/Loader.gif';

import priceOptions from '../../data/Price.json';
import partOfOptions from '../../data/PartOf.json';

class Fossil
{
    constructor(image, name, price, partOf)
    {
        this.color = "#F3F5FF";
        this.image = image;
        this.name = name;
        this.price = price;
        this.partOf = partOf;
    }
}

class Row
{
    constructor(fossil)
    {
        this.fossil = fossil;
        this.html = this.createHTML();

        this.createHTML.bind(this);
    }

    createHTML()
    {
        return(
            <div className={styles.row}>
                <div src={styles.image}>
                    <img src={this.fossil.image} alt={this.fossil.name} style={{'--color': this.fossil.color}} />
                </div>
                <h1>{this.fossil.name}</h1>
                <h1>{this.fossil.price}</h1>
                <h1>{this.fossil.partOf}</h1>
            </div>
        )
    }
}

class FossilList extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            APIData: [],
            results: [],
            filteredResults: [],
            priceValue: "Price",
            partOfValue: "Part Of"
        };

        // Select component styling
        this.customStyle = {
            control: () => ({
                backgroundColor: '#D0D9F9',
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
        fetch("https://acnhapi.com/v1/fossils")
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
        var fossilRows = [];
        for(var i = 0; i < Object.keys(this.state.APIData).length; i++)
        {
            var index = Object.keys(this.state.APIData)[i];

            var image = this.state.APIData[index]['image_uri'];
            var price = this.state.APIData[index]['price'];

            // Format name
            var name = this.state.APIData[index]['name']['name-USen'].replace('_', ' ').split(" ");

            for(let i = 0; i < name.length; i++)
            {
                name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
            }

            // Format part of
            var partOf = this.state.APIData[index]['part-of'];
            partOf = partOf[0].toUpperCase() + partOf.substring(1);

            var fossil = new Fossil(image, name, price, partOf);
            var row = new Row(fossil);

            fossilRows.push(row);
        }

        // Sort seaCreature by name
        // (We don't use this.sortByName() here because that function updates this.state.filteredResults and not also this.state.results)
        fossilRows = fossilRows.sort(function(a, b) {
            var nameA = a.fossil.name[0].toUpperCase();
            var nameB = b.fossil.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        // Update component state
        this.setState({
            results: fossilRows,
            filteredResults: fossilRows
        });
    }

    search(e)
    {
        const keyword = e.target.value;
        console.log(e.target.value);

        if(keyword !== '')
        {
            const searchResults = this.state.results.filter((result) => {
                return result.fossil.name[0].toLowerCase().startsWith(keyword.toLowerCase());
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
        var selectPrice = "Price";
        var selectPartOf = "Part Of";

        if(priceOptions.includes(e))
            selectPrice = e.label;
        if(partOfOptions.includes(e))
            selectPartOf = e.label;

        var filtered = []
        this.state.results.map((result) => {
            // If a duplicate doesn't exist in the filtered rows list, AND the row we're added includes a filtered keyword, add that row to the filtered rows list
            if(!filtered.includes(result) && selectPartOf === result.fossil.partOf)
                filtered.push(result);
            else if(!filtered.includes(result) && selectPrice !== "Price")
            {
                if(selectPrice === "Lowest to Highest")
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.fossil.price
                        var nameB = b.fossil.price
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    });
                }
                else
                {
                    filtered = this.state.results.sort(function(a, b) {
                        var nameA = a.fossil.price
                        var nameB = b.fossil.price
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
                priceValue: selectPrice,
                partOfValue: selectPartOf
            });
            return;
        }
        else
            this.setState({
                filteredResults: filtered,
                priceValue: selectPrice,
                partOfValue: selectPartOf
            });
    }

    clearAll()
    {
        this.setState({
            priceValue: "Price",
            partOfValue: "Part Of"
        });
        this.sortByName();
    }

    sortByName()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.fossil.name[0].toUpperCase();
            var nameB = b.fossil.name[0].toUpperCase();
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
                <a id="fossil-list"><div className={styles.section} id={styles.fossil}>
                    {/* Header with Search Bar and Filter */}
                    <div className={styles.header} id={styles.fossil}>
                        <h1>Fossils</h1>
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
                                <Select isSearchable value={this.state.priceValue} styles={this.customStyle} placeholder={this.state.priceValue} options={priceOptions} onChange={this.filter} />
                            </div>
                            <div className={styles.filterItem}>
                                <Select isSearchable value={this.state.partOfValue} styles={this.customStyle} placeholder={this.state.partOfValue} options={partOfOptions} onChange={this.filter} />
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
                        <h1>Part Of</h1>
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

export default FossilList;
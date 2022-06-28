import React from 'react';
import Select from 'react-select';

import styles from './List.module.css';

import Loader from '../../assets/Loader.gif';

import Name from '../../assets/Home_SearchName.png';
import Species from '../../assets/Home_SearchSpecies.png';
import Personality from '../../assets/Home_SearchPersonality.png';

import speciesOptions from '../../data/Species.json';
import personalitiesOptions from '../../data/Personalities.json';

class Villager
{
    constructor(image, name, species, personality, birthday, catchPhrase)
    {
        this.image = image;
        this.name = name;
        this.species = species;
        this.personality = personality;
        this.birthday = birthday;
        this.catchPhrase = catchPhrase;
    }
}

class Row
{
    constructor(villager)
    {
        this.villager = villager;
        this.html = this.createHTML();

        this.createHTML.bind(this);
    }

    createHTML()
    {
        // Create an HTML row element with proper formating
        return(
            <div className={`${styles.row}`}>
                <div src={styles.image}>
                    <img src={this.villager.image} alt={this.villager.name} style={{'--color': "#FFF9E6"}} />
                </div>
                <h1>{this.villager.name}</h1>
                <h1>{this.villager.species}</h1>
                <h1>{this.villager.personality}</h1>
                <h1>{this.villager.birthday}</h1>
                <h1>"{this.villager.catchPhrase}"</h1>
            </div>
        )
    }
}

class List extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            APIData: [],
            results: [],
            filteredResults: [],
            speciesValue: "Species",
            personalityValue: "Personality"
        };

        // Select component styling
        this.customStyle = {
            control: () => ({
                backgroundColor: '#F8EEBC',
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
        this.sortBySpecies = this.sortBySpecies.bind(this);
        this.sortByPersonalities = this.sortByPersonalities.bind(this);
    }

    componentDidMount()
    {
        // Get API data about villagers
        fetch("https://acnhapi.com/v1/villagers")
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
        // Manipulate API Data
        var villagerRows = [];
        for(var i = 0; i < Object.keys(this.state.APIData).length; i++)
        {
            var index = Object.keys(this.state.APIData)[i];

            var image = this.state.APIData[index]['icon_uri'];
            var species = this.state.APIData[index]['species'];
            var personality = this.state.APIData[index]['personality'];
            var birthday = this.state.APIData[index]['birthday-string'];
            var catchPhrase = this.state.APIData[index]['catch-phrase'];

            // Format name
            var name = this.state.APIData[index]['name']['name-USen'].replace('_', ' ').split(" ");

            for(let i = 0; i < name.length; i++)
            {
                name[i] = name[i][0].toUpperCase() + name[i].substring(1) + " ";
            }

            var villager = new Villager(image, name, species, personality, birthday, catchPhrase);
            var row = new Row(villager);
            
            villagerRows.push(row);
        }

        // Sort villagers by name
        // (We don't use this.sortByNames() here because that function updates this.state.filteredResults and not also this.state.results)
        villagerRows = villagerRows.sort(function(a, b) {
            var nameA = a.villager.name[0].toUpperCase();
            var nameB = b.villager.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        // Update component state
        this.setState({
            results: villagerRows,
            filteredResults: villagerRows
        });
    }

    search(e)
    {
        const keyword = e.target.value;
        console.log(e.target.value);

        if(speciesOptions.some(e => e.label.toLowerCase() === keyword.toLowerCase()))
        {
            const searchResults = this.state.results.filter((result) => result.villager.species.toLowerCase() === keyword.toLowerCase());
            this.setState({
                filteredResults: searchResults
            });
            return;
        }
        if(keyword !== '')
        {
            const searchResults = this.state.results.filter((result) => {
                return result.villager.name[0].toLowerCase().startsWith(keyword.toLowerCase());
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
        var selectSpecies = "Species";
        var selectPersonalities = "Personality";

        if(speciesOptions.includes(e))
            selectSpecies = e.label;
        if(personalitiesOptions.includes(e))
            selectPersonalities = e.label;

        var filtered = []
        this.state.results.map((result) => {
            // If a duplicate doesn't exist in the filtered rows list, AND the row we're added includes a filtered keyword, add that row to the filtered rows list
            if(!filtered.includes(result) && (selectSpecies === result.villager.species || selectPersonalities === result.villager.personality))
                filtered.push(result);
        });

        // Edge case
        if(filtered.length === 0)
        {
            this.setState({
                filteredRows: this.state.result,
                species: selectSpecies,
                personality: selectPersonalities
            });
            return;
        }
        else
            this.setState({
                filteredResults: filtered,
                speciesValue: selectSpecies,
                personalityValue: selectPersonalities
            });
    }

    clearAll()
    {
        this.setState({
            speciesValue: "Species",
            personalityValue: "Personality"
        });
        this.sortByName();
    }

    sortByName()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.villager.name[0].toUpperCase();
            var nameB = b.villager.name[0].toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        this.setState({
            filteredResults: sorted
        });
    }

    sortBySpecies()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.villager.species.toUpperCase();
            var nameB = b.villager.species.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        this.setState({
            filteredResults: sorted
        });
    }

    sortByPersonalities()
    {
        var sorted = this.state.results.sort(function(a, b) {
            var nameA = a.villager.personality.toUpperCase();
            var nameB = b.villager.personality.toUpperCase();
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
                <div className={styles.container}>
                <h1>Villagers</h1>
                <h3 id={styles.tagline}>Get to know your villagers!</h3>
                <div className={styles.cardsWrapper}>
                    <div className={styles.card} id={styles.name} onClick={this.sortByName}>
                        <h1 className={styles.title} id={styles.nameTitle}>Name</h1>
                        <div className={styles.image}>
                            <img src={Name} alt="Villager Icon - Search by name" />
                        </div>
                    </div>
                    <div className={styles.card} id={styles.species} onClick={this.sortBySpecies}>
                        <h1 className={styles.title} id={styles.speciesTitle}>Species</h1>
                        <div className={styles.image}>
                            <img src={Species} alt="Villager Icon - Search by species" />
                        </div>
                    </div>
                    <div className={styles.card} id={styles.personality} onClick={this.sortByPersonalities}>
                        <h1 className={styles.title} id={styles.personalityTitle}>Personality</h1>
                        <div className={styles.image}>
                            <img src={Personality} alt="Villager Icon - Search by personality" />
                        </div>
                    </div>
                </div>
                <h3>Search by name, species or personality</h3>
                <h3 id={styles.tagline}>or scroll down to view a list of all villagers!</h3>
                <div className={styles.section}>
                    {/* Header with Search Bar and Filter */}
                    <div className={styles.header}>
                        <h1>Villagers</h1>
                        <div className={styles.searchWrapper}>
                            <input className={styles.searchBar} type="text" placeholder="Search name, species..." onChange={this.search}/>
                            <div className={styles.image}>
                                <span className={`${'iconify'} ${styles.iconify}`} data-icon="bx:search" data-width="32"></span>
                            </div>
                            <h2 onClick={this.toggleFilter}>Filter</h2>
                        </div>
                    </div>
                    <div className={`${styles.filterWrapper} ${styles.hide}`} id='filter'>
                        <div className={styles.filter}>
                            <div className={styles.filterItem}>
                                <Select isSearchable options={speciesOptions} value={this.state.speciesValue} styles={this.customStyle} placeholder={this.state.speciesValue} onChange={this.filter} />
                            </div>
                            <div className={styles.filterItem}>
                                <Select isSearchable options={personalitiesOptions} value={this.state.personalityValue} styles={this.customStyle} placeholder={this.state.personalityValue} onChange={this.filter} />
                            </div>
                        </div>
                        <div className={styles.clear}>
                            <h2 onClick={this.clearAll}>Clear All</h2>
                        </div>
                    </div>
                    {/* Column Names Row */}
                    <div className={`${styles.row}`} id={styles.names}>
                        <h1>Image</h1>
                        <h1 id={styles.sort} onClick={this.sortByName}>Name</h1>
                        <h1 id={styles.sort} onClick={this.sortBySpecies}>Species</h1>
                        <h1 id={styles.sort} onClick={this.sortByPersonalities}>Personality</h1>
                        <h1>Birthday</h1>
                        <h1>Catch Phrase</h1>
                    </div>
                    {/* Data Rows */}
                    <div className={styles.resultsWrapper}>
                        {this.state.filteredResults.map((result) => (result.html))}
                    </div>
                </div>
            </div>
            );
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

export default List;
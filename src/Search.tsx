import React, { useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { update } from "./actions";
import axios from "axios";
import Select from 'react-select';
 
//Prepare static region title data for selection and make a call to API with this title later
const Regional = [{value:"EU", label:"European Union"},{value:"EFTA", label:"European Free Trade Association"},
{value:"CARICOM", label:"Caribbean Community"},{value:"PA", label:"Pacific Alliance"},{value:"AU", label:"African Union"},
{value:"USAN", label:"Union of South American Nations"},{value:"EEU", label:"Eurasian Economic Union"}
,{value:"AL", label:"Arab League"},{value:"ASEAN", label:"Association of Southeast Asian Nations"},
{value:"CAIS", label:"Central American Integration System"},{value:"CEFTA", label:"Central European Free Trade Agreement"}
,{value:"NAFTA", label:"North American Free Trade Agreement"},{value:"SAARC", label:"South Asian Association for Regional Cooperation"}];




function Search() {

    const dispatch = useDispatch();  

    const [countriesForSelect, setCountriesForSelect] = useState<any[]>() ;
    const [searchedValues, setSearchedValues] = useState<null>() ;
    const [selectedValues, setSelectedValues] = useState<null>() ;

    // handle search by country and also clear old search by region 
    const  handleChange   = (e:any) => {
        async function handle() {
            dispatch(update([]));
            await setSelectedValues(null);
            await setSearchedValues(undefined);
            await  dispatch(update(e));
        }
        handle();
    }
    // handle search by region and also clear old search by country 
   const handleSelectChange = (e:any) => {
                setSelectedValues(undefined);
                setSearchedValues(null);

                const CountriesByRegional:any[] = [];

                async function fetchRegional() {
                        try {
                        const response = await axios.get('https://restcountries.eu/rest/v2/regionalbloc/'+e.value);          
                        await    response.data.forEach(function (v:any) {
                        CountriesByRegional.push({ value: v.name, label:v.name, 
                        lat:v.latlng[0],lng:v.latlng[1],population:v.population
                        })
                        });

                        dispatch(update(CountriesByRegional));

                        } catch (error) {
                        console.error(error);
                        }
                }
                fetchRegional();   
    }
  
    //get all countries from api and save it to state for search by country
    useEffect(() => {
      async function fetchMyAPI() {
        try {
          const response = await axios.get('https://restcountries.eu/rest/v2/all');
   
          const all_countries:any[] = [];
          //Convert the form of the data to fit the work on the map and chart
          response.data.forEach(function (v:any) {
            all_countries.push({ value: v.name, label:v.name, 
              lat:v.latlng[0],lng:v.latlng[1],population:v.population
            })
          });
          setCountriesForSelect(all_countries);
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchMyAPI();
    }, [])
  
  
  

  return (
    <>
        <div className="row">
            <div className="col">
                {/* search by country*/}
                <Select value={searchedValues}  options={countriesForSelect} isMulti onChange={handleChange} placeholder="Search By Country"   />
            </div>
            <div className="col">
                {/* search by region */}
                <Select value={selectedValues}  options={Regional}  onChange={handleSelectChange} placeholder="Select By Region" /> 
            </div>
        </div>
    </>
  );
}

export default Search;







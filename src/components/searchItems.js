import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getItems, handleKeyword } from "../redux/searchItemSlice";
import { getItemProperties, setCommodityID } from "../redux/getItemStats";


function SearchItems() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    //const getOptionValue = (option) => option.i;


    const handleInputChange = (newValue) => {
 

          setLoading(true);

          dispatch(handleKeyword(newValue));
          dispatch(getItems());
        
      };

    const items = useSelector(state => state.searchingItems)

    useEffect(() => {

        setLoading(false);
      
    }, [items]);


    const handleDropdownChanges = (selectedOption) => {
      let commodityID = selectedOption.value
      commodityID = parseFloat(commodityID)
      dispatch(setCommodityID(commodityID))      
      dispatch(getItemProperties())
    }

    const customStyles = { //=> for dropdown menu customize
        option: (provided, state) => ({
          ...provided, 
          color: state.isSelected ? 'white' : 'black',
          background: state.isSelected ? '#0285c7' : state.isFocused ? '#38bdf8' : 'white',
          fontSize : '12px',
        }),
        control: (provided) => ({
          ...provided,
          width: '100%',
          minHeight: "48px",
          height : '45px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize : "16px",
          maxHeight: '20px',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '8px',
            overflowY: 'auto',
            
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            fontSize: '12px', 
            backgroundColor: state.isFocused ? '#e6f7ff' : 'white', // 
            borderRadius: '8px',
            
        }),
          dropdownIndicator: (provided, state) => ({
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight : "6px",
          }),
      };

    return (
        <div className="w-full">
            <Select
                onInputChange={handleInputChange}
                onChange={(selectedOption) => handleDropdownChanges(selectedOption)}
                isLoading={loading}
                options={items.items}
                placeholder="search..."
                styles={customStyles}
            />
        </div>
    )
}

export default SearchItems

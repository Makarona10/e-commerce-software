import React, { useEffect, useState } from "react";
import './ViewProducts.css';
import { ProdCard } from '../../customer/prodCard/prodCard.jsx'
import { api } from '../../../api/axios.js';
import { BrandBar } from '../../brandBar/brandBar.js';
import { MyFooter } from '../../common/footer/footer.jsx';
import { Nav_bar } from '../../Navbar/Navbar.js';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import { SearchBar } from "../../common/searchBar/searchBar.jsx";


function valuetext(value) {
    return `${value}`;
}

export const ViewProducts = () => {

    const [value, setValue] = React.useState([1000, 10000]);
    const [age, setAge] = React.useState('');

    const handleChangeCtg = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <BrandBar />
            <Nav_bar />
            <div className="filter-prod">
                <div className="p-filter">
                    <span>Price:</span>
                    <Box sx={{ width: 300, position: "relative", top: 4 }}>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={1}
                            max={50000}
                        />
                    </Box>
                </div>
                <div className="ctg-filter">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                        <Select
                            sx={{ height: 35 }}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // value={age}
                            label=""
                            onChange={handleChangeCtg}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="in-stk-radio">
                    <span>In Stock</span>
                    <Form.Check className="chk-stk" />
                    <button className="fltr-btn">Apply</button>
                </div>
            </div>
            <SearchBar style={{ 'margin-top': '60px' }} />
            {/* <ProdCard /> */}
            <MyFooter />
        </div>
    )
}
import React, { useEffect, useState } from "react";
import './ViewProducts.css';
import { api } from '../../../api/axios.js';
import { BrandBar } from '../../brandBar/brandBar.js';
import { MyFooter } from '../../common/footer/footer.jsx';
import { NavBar } from '../../Navbar/Navbar.js';
import { SearchBar } from "../../common/searchBar/searchBar.jsx";
import queryString from 'query-string';
import { ProdCard } from "../../customer/prodCard/prodCard.jsx";
import { PaginationBar } from "../../common/pagination/pagination.jsx";
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';



function valuetext(value) {
    return `${value}`;
}

export const ViewProducts = () => {
    const [value, setValue] = useState([1, 1000]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [stockChecked, setStockChecked] = useState(false);
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [searchParams] = useSearchParams();

    const parsedQuery = queryString.parse(window.location.search);
    const { sort, page, search, category, from, to, inStock } = parsedQuery;


    const sorts = {
        'trending': 'list-trending',
        'latest': 'list-latest',
        'popular': 'list-popular',
        'offers': 'list-offers',
        'filter': 'filter'
    };

    useEffect(() => {
        api.get('categories/subcategories')
            .then(res => {
                setCategories(res.data.data)
            })
            .catch();

        if (sort) {
            if (Object.keys(sorts).includes(sort)) {
                api.get(`products/${sorts[sort]}`,
                    {
                        params: {
                            page,
                            price: [from, to],
                            subcategory: category,
                            inStock: inStock
                        }
                    })
                    .then(res => {
                        setProducts(res.data.data);
                        setTotalItems(res.data.pages * 24);
                        console.log(res.data.pages)
                    }).catch(err => console.log(err));
            }
        }
        if (search) {
            api.get(`products/search-prod/${search}`, { params: { page: page } })
                .then(res => {
                    setProducts(res.data.data);
                    setTotalItems(res.data.pages * 24)
                    console.log(res.data.data)
                }).catch(err => { console.log(err) })
        }

    }, [searchParams]);

    const handleFilter = () => {
        const q_string = queryString.parse(window.location.search);
        q_string.sort = 'filter';
        q_string.page = 1;
        q_string.from = value[0];
        q_string.to = value[1];
        q_string.category = selectedCategory
        q_string.inStock = stockChecked;
        const stringified = queryString.stringify(q_string);
        window.history.replaceState(null, '', `?${stringified}`);

        api.get('products/filter', {
            params: {
                price: value,
                subcategory: selectedCategory,
                inStock: stockChecked,
                page: page
            }
        }).then(res => {
            setProducts(res.data.data);
            setTotalItems(res.data.pages * 24)
        }).catch(err => { });
    }

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleCtgChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);
    };

    const handleCheckChange = (event) => {
        setStockChecked(event.target.checked);
        console.log(event.target.checked);
    };


    return (
        <div>
            <BrandBar />
            <NavBar />
            <SearchBar />
            <div className="filter-prod mt-4">
                <div className="p-filter">
                    <span>Price:</span>
                    <Box sx={{ width: 300, position: "relative", top: 4 }}>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={3000}
                        />
                    </Box>
                </div>
                <div className="ctg-filter">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="text-zinc-300">
                        <InputLabel id="demo-select-small-label" sx={{ color: 'rgb(199, 199, 199)' }}>Category</InputLabel>
                        <Select
                            sx={{ height: 35, color: 'rgb(199, 199, 199)' }}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectedCategory}
                            label="category"
                            onChange={handleCtgChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map(c => (
                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="in-stk-radio">
                    <span>In Stock</span>
                    <Form.Check
                        className="chk-stk"
                        checked={stockChecked}
                        onChange={handleCheckChange}
                    />
                    <button
                        className="fltr-btn"
                        onClick={() => { handleFilter() }}
                    >Apply</button>
                </div>
            </div>
            <ProdCard data={products} viewAll={false} />
            <PaginationBar total={totalItems} />
            <MyFooter />
        </div>
    )
}
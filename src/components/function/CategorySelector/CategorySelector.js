import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";

function CategorySelector({ onChangeCategoryIds }) {
    const [options, setOptions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const animatedComponents = makeAnimated();

    useEffect(() => {
        const axiosData = async () => {
            const response = await axios.get(`http://localhost:3002/category`);
            try {
                const categoryOptions = response.data.map((category) => ({
                    label: category.name,
                    value: category.id,
                }));

                setOptions(categoryOptions);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        axiosData();
    }, []);

    const handleChange = (selectedOption) => {
        setSelectedCategories(selectedOption);
        const categoryIds = selectedOption.map((option) => option.value);
        onChangeCategoryIds(categoryIds);
    };

    return (
        <div>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={options} // Bảo vệ options
                components={animatedComponents}
                value={selectedCategories}
                onChange={handleChange}
                placeholder="Danh mục sản phẩm"
            />
        </div>
    );
}

export default CategorySelector;

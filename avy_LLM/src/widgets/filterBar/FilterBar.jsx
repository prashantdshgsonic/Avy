import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import s from "./FilterBar.module.css";
import CustomInput from "../../ui/customInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { filterByPriceRange, resetFilters, sortByCategory, sortByCompany, sortByPrice } from "../../store/slice/offerSlice";
import RadioBtn from "../../ui/customRadioButton/RadioBtn";

function FilterBar() {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const offerList = useSelector((state) => state.offer.list);
  const uniqueCompanies = [...new Set(offerList.map((item) => item.company))];
  const uniqueCategories = [...new Set(offerList.map((item) => item.category))];

  const styles = {
    track: {
      backgroundColor: "var(--text-primary-color-color)",
    },
    handle: {
      backgroundColor: "var(--text-primary-color-color)",
      borderColor: "#fff",
    },
  };

  const renderCheckboxItems = (items, title) => (
    <div className={s.filterCategory}>
      <h3>{title}:</h3>
      {items.map((item, index) => (
        <RadioBtn
        key={index}
          label={item}
          value={item}
          name={title}
          onChange={
            () => {
              if (title === "Category") {
                dispatch(sortByCategory(item));
              } else {
                dispatch(sortByCompany(item));
              }
            }
          }
        />
      ))}
    </div>
  );

  const handlePriceChange = (value) => {
    setPriceRange(value);
    dispatch(filterByPriceRange(priceRange));
  };

  const handleInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
    dispatch(filterByPriceRange(priceRange));
  };

  return (
    <div className={s.filterBarContainer}>
      {renderCheckboxItems(uniqueCompanies, "Company")}
      {renderCheckboxItems(uniqueCategories, "Category")}
      <div className={s.filterPrice}>
        <h3>Price: $</h3>
        <div>
          <div className={s.priceInputs}>
            <CustomInput
              type={"number"}
              value={priceRange[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
            ></CustomInput>
            <span>-</span>
            <CustomInput
              type={"number"}
              value={priceRange[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
            ></CustomInput>
          </div>

          <div className={s.filterLowHighPrice}>
             <RadioBtn
              value={"lowToHigh"}
              name={"price"}
              label={"Low to high"}
              onChange={() => dispatch(sortByPrice("lowToHigh"))}
            />
            <RadioBtn
              value={"highToLow"}
              name={"price"}
              label={"High to low"}
              onChange={() => dispatch(sortByPrice("highToLow"))}
            />
          </div>

          <Slider
            range
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={handlePriceChange}
            styles={styles}
          />

          <button className={s.resetBtn} onClick={() => dispatch(resetFilters())}>Reset Filters</button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

import "./Home.css"
import React from "react";
import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";




export const Home = () => {

    const searchRdx = useSelector(searchData)

useEffect(() => {
    console.log(searchRdx);
}, [searchRdx]);
    return (
        <div className="homeDesign">
            soy home
        </div>
    )
}
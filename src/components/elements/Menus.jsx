/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { collection, query, getDocs, } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useFirestore } from 'reactfire';
import { MenuModel } from '../../data/menu';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

function Menus() {
  
    // Define array of menu with type Menu
    const [menus, setMenus] = React.useState([]);

    const getMenus = async () => {
        axios.get('/menu').then(res => {
            const {data} = res;
            console.log(data);
            data.forEach(menu => {
                setMenus(menus => [...menus, menu]);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    // Execute getMenus function when component is mounted using
    useEffect(() => {
        getMenus()
    }, []);

    return <div className="menu-view">
        {
            menus.map(menu => {
                return <div className="menu-item" key={menu.id}>
                    <div className="menu-info">
                        <h1 className="title text-black">{menu.name}</h1>
                        <p className="menu-description">{menu.description}</p>
                        <Link to={`menu/${menu.id}`} className="button-small">View Menu</Link>
                    </div>
                    <img alt={menu.name} className="menu-image" src={menu.image} />
                </div>
            })
        }
    </div>
}

export default Menus

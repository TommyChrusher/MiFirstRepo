import {pool} from "./DataBase/db_conection.js";

const getProducts=async()=>{
    try{
        const result = await pool.query("SELECT * FROM productos;");
        console.log(result.rows)
    } catch (error){
        console.error(error)
    }
};

getProducts();

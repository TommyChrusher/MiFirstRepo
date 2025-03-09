import express, { json } from 'express';
import { pool } from './DataBase/db_conection.js';

////Creación de la app con express
const app = express();
////Midleware para poder leer el body de los request
app.use(express.json());
///Creación de funciones para interactuar con la DB
///traer todos los productos
const getAllProducts = async () => {
    try {
        return ((await pool.query(`SELECT * FROM productos`)).rows)
    } catch (error) {
        return (error)
    }
};
/////Obtener producto por código de barras
const searchBarCode = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM Productos WHERE productcode = '${id}'`);
        return (result.rows[0]);
    } catch (error) {
        console.log(error);
        return (error)
    }
};
/////Crear un nuevo producto
const createProduct = async (data) => {
    try {
        const body = JSON.parse(JSON.stringify(data));
        await pool.query(`INSERT INTO productos (productname, productcode, productcategory, productstock, productprice, productsupplier) VALUES ('${body.Name}','${body.Code}','${body.Category}',${body.Stock},${body.Price},'${body.Supplier}')`);
        return ((await pool.query(`SELECT * FROM productos WHERE productcode = '${body.Code}'`)).rows[0]);
    } catch (error) {
        return (error)
    }
};
////Editar producto
const editProduct = async (Id, data) => {
    try {
        console.log(data);
        const body = Object.entries(data)
            .map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
            .join(", ");
        const code = Id;
        console.log(body);
        await pool.query(`UPDATE productos SET ${body} WHERE productcode = '${code}'`);
        const result = ((await pool.query(`SELECT * FROM productos WHERE productcode = '${code}'`)).rows[0]);
        return (result);
    } catch (error) {
        return (error)
    }
};

////Creación de primer ruta para obtener datos
app.get("/Product/:id", async (req, res) => {
    const id = req.params.id;
    const result = await searchBarCode(id);
    if (result == undefined) {
        res.status(404).json("Not Finded")
    } else {
        res.status(200).json(result)
    }
});

////Creación de ruta para traer todos los elementos
app.get("/Products", async (_req, res) => {
    res.status(200).json(await getAllProducts())
})

////Creación de ruta para creación de nuevo producto
app.post("/Product", async (req, res) => {
    const data = req.body;
    const result = await createProduct(data);
    res.status(200).json(result)
});

app.put("/Product", async (req, res) => {
    const Id = req.body.Id;
    const body = req.body.changes;
    const result = await editProduct(Id, body);
    res.status(200).json(result)
});

app.get("/test", (req,res) =>{
    res.send(req.ip)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor iniciado en el puerto 3000")
})
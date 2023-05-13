/* 
- Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
- Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

- El servidor debe contar con los siguientes endpoints:
		- ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
			Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
		
		
- Si no se recibe query de límite, se devolverán todos los productos
- Si se recibe un límite, sólo devolver el número de productos solicitados
		- ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), 
			y devolver sólo el producto solicitado, en lugar de todos los productos. 


		* Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
		* Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 


- Link al repositorio de Github con el proyecto completo, el cual debe incluir:
		- carpeta src con app.js dentro y tu ProductManager dentro.
		- package.json con la info del proyecto.
		- NO INCLUIR LOS node_modules generados.

 */

const express = require("express");
const app = express();

const port = 3000;

const ProductManager = require('./ProductManager');

const productManager = new ProductManager('./archivo.json');


app.get("/products", async (req, res) => {
	// console.log('params', req.params);
	// console.log('body', req.body);
	// console.log('query', req.query);

	//* http://localhost:3000/products?limit=2

	const productos = await productManager.getProducts();
	if( productos.length < 1 ){
		return res.json({
			status: "success",
			msg: "Se encontraron 0 productos",
			data: productos,
		});
	} else {
		if(req.query.limit) {
			const qty = Number(req.query.limit)
			const listProducts = productos.slice(0, qty)
			
			return res.json({
				status: "success",
				msg: `${listProducts.length} productos encontrados con exito`,
				data: listProducts,
			});
		} else {
			return res.json({
				status: "success",
				msg: `${productos.length} productos encontrados con exito`,
				data: productos,
			});
		}
	}
});

app.get("/products/:pid", async (req, res) => {
	// console.log('params', req.params);

	//* http://localhost:3000/products/1

  const id = req.params.pid;
	const producto = await productManager.getProducts().find((p) => p.id == id);

  if (producto) {
    return res.json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});



console.log(productManager.getProducts());
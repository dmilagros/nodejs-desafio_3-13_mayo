const fs = require('fs');

/* 
	Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. 
	Éste debe poder agregar, consultar, modificar y eliminar un producto y 
	manejarlo en persistencia de archivos (basado en entregable 1).

	
	La clase debe contar con una variable this.path, 
	el cual se inicializará desde el constructor y 
	debe recibir la ruta a trabajar desde el momento de generar su instancia.


	Debe guardar objetos con el siguiente formato:
			- id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
			- title (nombre del producto)
			- description (descripción del producto)
			- price (precio)
			- thumbnail (ruta de imagen)
			- code (código identificador)
			- stock (número de piezas disponibles)


	Debe tener un método "addProduct" el cual debe recibir un objeto con el formato previamente especificado, 
	asignarle un "id autoincrementable" y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).


	Debe tener un método "getProducts", el cual debe leer el archivo de productos y 
	devolver todos los productos en formato de arreglo.


	Debe tener un método "getProductById", el cual debe recibir un id, y tras leer el archivo, 
	debe buscar el producto con el id especificado y devolverlo en formato objeto


	Debe tener un método "updateProduct", el cual debe recibir el id del producto a actualizar, 
	así también como el campo a actualizar (puede ser el objeto completo, como en una DB), 
	y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 


	Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

*/
class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error al leer el archivo: ${error.message}`);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.error(`Error al escribir en el archivo: ${error.message}`);
    }
  }

  addProduct(product) {
    const lastProduct = this.products[this.products.length - 1];
    const id = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProduct(id) {
    return this.products.find(product => product.id === id);
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { id, ...updatedProduct };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }
}

module.exports = ProductManager;

## -----------------------

## Tercer Pre-Entrega

## -----------------------

- [x] Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.

- [x] El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional).
      ///// ( el parámetro --mode production toma los datos de .env.production otro parámetro diferente tomalos datos de .env.development )

- [x] Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

- [x] Modificar la ruta /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.
      ///// la rura no es /current estoy usando /profile

---

- [] Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:

  - [x] Sólo el administrador puede crear, actualizar y eliminar productos.
  - [] Sólo el usuario puede enviar mensajes al chat.
  - [x] Sólo el usuario puede agregar productos a su carrito.

---

- [x] Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra

  - [x] Id (autogenerado por mongo)
  - [x] code: String debe autogenerarse y ser único
  - [x] purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
  - [x] amount: Number, total de la compra.
  - [x] purchaser: String, contendrá el correo del usuario asociado al carrito.

---

- [x] Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
      ///// carts.controller.js funcion addPurchaseByCartById /////

  - [x] La compra debe corroborar el stock del producto al momento de finalizarse
    - [x] Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
    - [x] Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.
  - [x] Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
  - [x] En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
  - [x] Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

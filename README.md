# Curso NestJS


## Validaciones

Cuando se crean las validaciones, por ejemplo para crear los objetos de __coffee__ se puede utilizar un
global pipe (useGlobalPipe utilizando ValidationPipe). Hay que instalar además las siguientes librerias:

```bash
npm i class-validator class-transformer
```

## Extender DTOs
Tenemos un DTO para crear con la siguiente interfaz

```javascript
export class CreateCoffeeDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString({ each: true })
    readonly flavors: string [];
}
```

y un DTO para la actualización parcial, por lo tanto, todos sus atributos pueden ser opcionales,
```javascript
export class UpdateCoffeeDto {
    readonly name?: string;
    readonly brand?: string;
    readonly flavors?: string [];
}
```

Podemos utilizar la función __PartialType__ que nos permite hacer todos los atributos del DTO de create opcionales al vuelo, y por lo tanto, no hace falta repetir código, teniendo como resultado

```javascript
import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```

Hay que instalar la libreria
```bash
npm i @nestjs/mapped-types
```

### Evitar Extra fields en los DTO

El validationPipe tiene una propiedad que se dice __whitelist__, lo que realiza es eliminar todos los campos que nos envian a nuestro DTO, esto se realiza antes de la vaidación

```javascript
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
}));
```

Podemos indicar que lance una excepción incluyendo __forbidNonWhitelisted: true__
```javascript
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
}));
```
El tipo de erro es un 400 bad request.

### Transaformacion DTO
En NestJS, la propiedad transform en los pipes de validación se utiliza para habilitar la transformación automática de las propiedades de la solicitud entrante al tipo de dato esperado en el DTO.

Por ejemplo, si se tiene una clase DTO definida como:

```javascript
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly age: number;
}
```
y se envía una solicitud con un valor para age en formato de cadena ('25'), el valor se transformará automáticamente a un número (25) antes de que se realice la validación.

Esto puede ser útil para simplificar el proceso de validación y conversión de datos, ya que no es necesario realizar la conversión manualmente en el controlador o en otra parte del código. También puede ayudar a mejorar la calidad y consistencia de los datos, ya que se pueden garantizar que los valores se transformen correctamente en el tipo de dato esperado en el DTO.

Es importante tener en cuenta que la propiedad transform solo se aplica a las propiedades que están definidas en la clase DTO. Cualquier propiedad que no esté definida en el DTO no se transformará y se eliminará automáticamente si whitelist está habilitado.

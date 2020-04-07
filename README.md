BACKEND EN NODEJS PARA EL PROYECTO - SIGESCOM
===================================================================================================
Este proyecto de backend esta generado con NodeJS versión xxxx
que se conecta a MongoDB usando Mongoose.

Para reconstruir los módulos de node, es necesario utilizar el  el comando `npm install`


INICIAR EL SERVIDOR NODEJS
---------------------------------------------------------------------------------------------------
Ingrese al PATH donde se encuentra el proyecto y ejecute en el cmd `npm start` para iniciar el servidor NodeJs.


INSTALACION DE DEPENDENCIAS O LIBRERIA DE TERCEROS
---------------------------------------------------------------------------------------------------

### NodeJS Express


### Nodemon
Es para reniciar automaticamente el servidor de nodejs, cada vez que se realiza algun cambio.

Instalacion:
```bash
npm install nodemon --save
```

Para utilizar, ir al path  `.\package.js`
```javascript
 "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### Mongoose
Para realizar la conexion a la Base de Datos

### Libreria - Body parse (104)
Esta Libreria toma la informacion del POST y no crea un objeto de javascript que ya podemos utilizar

**URL:**
`https://github.com/expressjs/body-parser`

Instalacion:
```bash
npm install body-parser --save
```

Para utilizar la libreria `.\app.js`
```javascript
//Import
var bodyParser = require('body-parser');

// Body Parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Uso
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido',
};

```


### Plugins - Mongoose-unique-validator (105)
Este plugins es de mongoose, sirve para realizar validaciones semi automaticas:

Instalacion:
```bash
npm install mongoose-unique-validator --save
```

Para utilizar el plugins `\model\usuario.js`
```javascript
//Import
var uniqueValidator = require('mongoose-unique-validator');

//Uso
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido',
};

var usuarioSchema = new Schema({
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { message: ' {PATH} debe ser unico' });
```

### Libreria - bcrypt.js (106)
Esta Libreria sirve para **ENCRIPTAR CONTRASEÑA** en un sola via _(aun que la persona logre obtener la contraseña encriptada no va ser posible recontruirlo a su forma original)_

**URL:**
`https://github.com/dcodeIO/bcrypt.js`

Instalacion:
```bash
npm install bcryptjs --save
```

Para utilizar la Libreria es necesario importar donde se necesite trabajar con datos encriptados `\routes\usuario.js`
```javascript
//Import
var bcrypt = require('bcryptjs');

//Crear nuevo usuario
var usuario = new Usuario({
    password: bcrypt.hashSync(body.password, 10),
});
```

### Libreria - JSON Web Tokens (110)
Crear token

**URL:**
`https://github.com/auth0/node-jsonwebtoken`


Instalacion:
```bash
npm install jsonwebtoken --save
```

### express-fileupload (127)
Subir imagenes

**URL:**
`https://github.com/richardgirges/express-fileupload/`


Instalacion:
```bash
npm i express-fileupload --save
npm uninstall --save express-fileupload


npm install --save express-fileupload@1.0.0


```

### serve-index (132)


**URL:**
`https://github.com/expressjs/serve-index`


Instalacion:
```bash
npm install serve-index --save
```

### serve-index (141)
Libreria de google

**URL:**
`npm install google-auth-library --save`

Instalacion:
```bash
npm install google-auth-library --save
```









### EJEMPLO

CREAR UN ADVETENCIA O SUGERENCIA
> __Warning:__ When the token comes from an untrusted source (e.g. user input or external requests), the returned decoded payload should be treated like any other user input; please make sure to sanitize and only work with properties that are expected

RESALTAR PALABRA O FRASE
`token` is the JsonWebToken string

NEGRITA Y CURSIVA
> **Please _note_ that** `exp` or any other claim is only set if the payload is an object literal. Buffer or string payloads are not checked for JSON validity.

VIÑETAS
* `json`: force JSON.parse on the payload even if the header doesn't contain `"typ":"JWT"`.
* **complete**: return an object with the decoded payload and header.

* `expiresIn`: expressed in seconds or a string describing a time span.
  > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

URL
[zeit/ms](https://github.com/zeit/ms). 

CREAR TABLA
alg Parameter Value | Digital Signature or MAC Algorithm
----------------|----------------------------
HS256 | HMAC using SHA-256 hash algorithm
HS384 | HMAC using SHA-384 hash algorithm
HS512 | HMAC using SHA-512 hash algorithm
RS256 | RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm
RS384 | RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm
RS512 | RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm
PS256 | RSASSA-PSS using SHA-256 hash algorithm (only node ^6.12.0 OR >=8.0.0)
PS384 | RSASSA-PSS using SHA-384 hash algorithm (only node ^6.12.0 OR >=8.0.0)
PS512 | RSASSA-PSS using SHA-512 hash algorithm (only node ^6.12.0 OR >=8.0.0)
ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm
ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm
ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm
none | No digital signature or MAC value included
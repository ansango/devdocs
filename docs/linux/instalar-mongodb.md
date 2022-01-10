---
sidebar_position: 3
---

# Instalar MongoDB

A continuación veremos como instalar [MongoDB](https://www.mongodb.com/) en Ubuntu 20.04 y como visualizar y manipular datos con [Robo3T](https://robomongo.org/). Además agregaremos datos falsos a MongoDB mediante terminal a nuestra base de datos.

## Instalar MongoDB en Ubuntu 20.04

Para empezar, importa la clave GPG pública de la última versión estable de MongoDB ejecutando el siguiente comando. Si quieres utilizar una versión de MongoDB distinta de la 4.4, asegúrate de cambiar el 4.4 en la parte de la URL de este comando:

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

Este comando devolverá OK si la clave se ha añadido con éxito:

```bash
## Output

OK
```

Si quieres comprobar que la clave se ha añadido correctamente, puedes hacerlo con el siguiente comando:

```bash
apt-key list
```

Esto devolverá la clave de MongoDB en algún lugar de la salida:

```bash
Output
/etc/apt/trusted.gpg
--------------------
pub   rsa4096 2019-05-28 [SC] [expires: 2024-05-26]
      2069 1EEC 3521 6C63 CAF6  6CE1 6564 08E3 90CF B1F5
uid           [ unknown] MongoDB 4.4 Release Signing Key <packaging@mongodb.com>
. . .
```

En este punto, APT todavía no sabe dónde encontrar el paquete mongodb-org que necesita para instalar la última versión de MongoDB.

Ejecuta el siguiente comando, que creará un archivo en el directorio sources.list.d llamado mongodb-org-4.4.list:

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

Esta única línea le dice a APT todo lo que necesita saber sobre cuál es la fuente y dónde encontrarla:

- `deb`: Esto significa que la entrada de la fuente hace referencia a una arquitectura normal de Debian.

- `[ arch=amd64,arm64 ]`: Especifica para qué arquitecturas deben descargarse los datos de APT. En este caso, especifica las arquitecturas amd64 y arm64.

- `https://repo.mongodb.org/apt/ubuntu`: Se trata de un URI que representa la ubicación donde se pueden encontrar los datos de APT. En este caso, el URI apunta a la dirección HTTPS donde se encuentra el repositorio oficial de MongoDB.

- `focal/mongodb-org/4.4`: Los repositorios de Ubuntu pueden contener varias versiones diferentes. Esto especifica que sólo quieres la versión 4.4 del paquete mongodb-org disponible para la versión focal de Ubuntu ("Focal Fossa" es el nombre en clave de Ubuntu 20.04).

- `multiverse`: Esta parte apunta a APT a uno de los cuatro repositorios principales de Ubuntu. En este caso, apunta al repositorio multiverse.

Después de ejecutar este comando, actualiza el índice de paquetes local de su servidor para que APT sepa dónde encontrar el paquete mongodb-org:

```bash
sudo apt update
```

A continuación podemos **instalar** MongoDB:

```bash
sudo apt install mongodb-org
```

1. **Arrancar MongoDB**:

```bash
sudo service mongod start

```

2. **Verificar que MongoDB se ha iniciado**:

```bash
sudo service mongod status
```

Deberíamos obtener un output como este:

```bash
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-06-09 12:57:06 UTC; 2s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 37128 (mongod)
     Memory: 64.8M
     CGroup: /system.slice/mongod.service
             └─37128 /usr/bin/mongod --config /etc/mongod.conf
```

Si por algún casual obtenemos que no está activo:

```bash
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Wed 2021-07-07 23:14:17 CEST; 33s ago
       Docs: https://docs.mongodb.org/manual
    Process: 606001 ExecStart=/usr/bin/mongod --config /etc/mongod.conf (code=exited, status=14)
   Main PID: 606001 (code=exited, status=14)

jul 07 23:14:17 ansango systemd[1]: Started MongoDB Database Server.
jul 07 23:14:17 ansango systemd[1]: mongod.service: Main process exited, code=exited, status=14/n/a
jul 07 23:14:17 ansango systemd[1]: mongod.service: Failed with result 'exit-code'.
```

Es probable que sea por falta de permisos en las carpetas internas. Para dar permisos podemos introducir en terminal lo siguiente:

```bash
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

3. **Parar MongoDB**:

```bash
sudo service mongod stop
```

4. **Reiniciar MongoDB**:

```bash
sudo service mongod restart
```

5. **Empezar a usar MongoDB**:

```bash
mongo
```

6. **Arrancar la terminal de MongoDB**:

```bash
mongo shell
```


## Instalar Robo 3T en Ubuntu 20.04

Para instalar Robo 3T primero descargaremos la [versión oficial](https://robomongo.org/) para Linux. Tendremos entonces un archivo comprimido con este nombre: `robo3t-1.4.3-linux-x86_64-48f7dfd.tar.gz`

Lo extraeremos con:

```bash
tar -xvzf robo3t-1.4.3-linux-x86_64-48f7dfd.tar.gz
```

Crea una nueva carpta para el paquete en usr/local/bin:

```bash
sudo mkdir /usr/local/bin/robo3t
```

Mueve el paquete extraido a usr/local/bin/robo3t

```bash
sudo mv  robo3t-1.4.3-linux-x86_64-48f7dfd/* /usr/local/bin/robo3t
```

Cámbiate al directorio:

```bash
cd /usr/local/bin/robo3t/
```

Necesitamos dar permisos a Robo 3T:

```bash
sudo chmod +x robo3t ./robo3t
```

Ahora ya podemos ejecutar Robo 3T

```bash
./robo3t
```

Para customizar el icono que veremos en el dashboard podemos [descargar](https://www.google.com/search?q=robo3t+icon+png&tbm=isch&source=iu&ictx=1&fir=Lh5FTCRLPKZyvM%253A%252CT0TupOjHzw6HKM%252C_&usg=AI4_-kRUiahKne4RFzDIMMulD1ZHJZNzAA&sa=X&ved=2ahUKEwiXtenUqbjgAhUBUhUIHfvEACQQ9QEwAHoECAUQBA) la imagen que queramos y guardarla en el `/bin`:

```bash
mv icon.png /usr/local/bin/robo3t/bin
```

Para crear un acceso desde el escritorio podemos crear un archivo en `sr/share/applications`:

```bash
sudo nano /usr/share/applications/robo3t.desktop
```

Copiamos y pegamos lo siguiente:

```bash
[Desktop Entry]
Encoding=UTF-8
Type=Application
Name=Robo3t
Icon=/usr/local/bin/robo3t/bin/icon.png
Exec="/usr/local/bin/robo3t/bin/robo3t"
Comment=Robo3t
Categories=Development;
Terminal=false
StartupNotify=true
```


## Insertar fake data con Mongo Shell

Por último vamos a generar datos falsos en MongoDB. Necesitarás tener un archivo `.json`, o bien tener instalado `Node JS` y un archivo `.js` con los datos.

En este caso partiremos del supuesto de estar desarrollando una aplicación en `Node` y que tenemos un `.js` con un array de objetos:

```javascript
// fake-data.js

module.exports = [
  {
    id: '123',
    name: 'Mexican Casserole',
    ingredients: [
      { name: 'Refried Beans', amount: 2, units: 'cups' },
      { name: 'Onions', amount: 1, units: 'count' },
      { name: 'Tortillas', amount: 5, units: 'count' },
      { name: 'Salsa', amount: 1, units: 'cups' },
      { name: 'Cheddar', amount: 2, units: 'cups' },
    ],
    originalRecipeLink: 'https://www.allrecipes.com/recipe/16560/mexican-casserole/',
  },
  {
    id: '234',
    name: 'Chicken Cordon Bleu',
    ingredients: [
      { name: 'Chicken Breast Halves', amount: 4, units: 'count' },
      { name: 'Salt', amount: 0.25, units: 'teaspoons' },
      { name: 'Black Pepper', amount: 0.125, units: 'teaspoons' },
      { name: 'Swiss Cheese Slices', amount: 6, units: 'count' },
      { name: 'Ham', amount: 4, units: 'count' },
      { name: 'Bread Crumbs', amount: 0.5, units: 'cups' },
    ],
    originalRecipeLink: 'https://www.allrecipes.com/recipe/8495/chicken-cordon-bleu-i/',
  },
]
```

Como pasar a `.json` este tipo de archivos puede ser un auténtico aburrimiento, vamos a crear un pequeño script que, mediante `Node` nos convierta este `.js` a `.json`:

```javascript
// convert-to-json.js

const fs = require('fs')
const recipes = require('./fake-data')

const FILE_NAME = 'recipes.json'

fs.writeFileSync(FILE_NAME, JSON.stringify(recipes), 'utf-8')

console.log('Done!')
```

Después mediante terminal ejecutaremos:

```bash
node convert-to-json.js
```

Esto nos generará un archivo `json` en la raíz.

Ahora sólo nos queda meter todos estos datos directamente en nuesta base de datos, para ello tendremos que tener arrancado MongoDB, y entonces ejecutamos lo siguiente en nuestro terminal:

```bash
mongoimport --db="meal-tracker" --collection="recipes" --file="recipes.json" --jsonArray
```

¿Cómo podemos ver estos datos que hemos insertado?

Pues bien, para ello podemos recurrir a Robo 3T, o bien iniciando Mongo Shell, si elegimos esta última opción introduciremos:

```bash
use meal-tracker
```

```bash
db.recipes.find({}).pretty()
```

Si queremos crear una colección nueva:

```bash
db.meals.insert({ recipeId: '123', plannedDate: newDate() })
```

Espero que te haya gustado este artículo. ❤️

---
sidebar_position: 2
---

# Comandos Básicos

## Primeros Comandos, Navegando por el Sistema de Archivos

Los sistemas de archivos modernos tienen árboles de directorios (carpetas), donde un directorio es un directorio raíz (sin directorio padre) o es un subdirectorio (contenido dentro de otro directorio, al que llamamos "padre"). Si se recorre el árbol de archivos hacia atrás (desde el directorio hijo hasta el directorio padre) siempre se llegará al directorio raíz. Algunos sistemas de archivos tienen múltiples directorios raíz (como las unidades de Windows: `C:\`, `A:\,` etc.), pero los sistemas Unix y similares sólo tienen un único directorio raíz llamado `\`.

### `pwd / ls / cd`

Cuando se trabaja dentro de un sistema de archivos, el usuario siempre está trabajando dentro de algún directorio, al que llamamos directorio actual o directorio de trabajo. Imprime el directorio de trabajo del usuario con pwd:

```bash
$ pwd
/home/andrew
```

Listar el contenido de este directorio (archivos y/o directorios hijos, etc.) con ls:

```bash
$ ls
Git  TEST  jdoc  test  test.file
```

> - Mostrar archivos ocultos (".") con `ls -a`
> - Mostrar los detalles de los archivos con `ls -l`
> - Combinar varios indicadores como `ls -l -a`
> - A veces se pueden encadenar banderas como `ls -la` en lugar de `ls -l -a`

Cambia de directorio con cd

```bash

$ cd TEST/

$ pwd
/home/andrew/TEST

$ cd A

$ pwd
/home/andrew/TEST/A
```

`cd ..` es la abreviatura de "cd al directorio padre":

```bash
$ cd ..

$ pwd
/home/andrew/TEST
```

`cd ~` o simplemente `cd` es la abreviatura de "cd a mi directorio personal" (/home/nombredeusuario):

```bash
$ cd

$ pwd
/home/andrew
```

> - `cd ~user` significa `cd` al directorio principal del usuario
> - Puede saltar varios niveles de directorio con `cd ../..`, etc.
> - Vuelve al directorio más reciente con `cd -`
> - `.` es la abreviatura de "este directorio", así que `cd .` no hará nada

### `; / && / &`

Las cosas que escribimos en la línea de comandos se llaman comandos, y siempre ejecutan algún código máquina almacenado en algún lugar de tu ordenador. A veces este código de máquina es un comando incorporado de Linux, a veces es una aplicación, a veces es algún código que escribiste tú mismo. Ocasionalmente, querremos ejecutar un comando justo después de otro. Para hacer eso, podemos usar `;`

```bash
$ ls; pwd
Git  TEST  jdoc  test  test.file
/home/andrew
```

En el ejemplo anterior, punto y coma significa que primero (ls) lista el contenido del directorio de trabajo, y luego (pwd) imprime su ubicación.

Otra herramienta útil para encadenar comandos es `&&`. Con `&&`, el comando de la derecha no se ejecutará si el comando de la izquierda falla. `;` y `&&` pueden utilizarse varias veces en la misma línea:

```bash
# whoops!
$ cd /Giit/Parser && pwd && ls && cd
-bash: cd: /Giit/Parser: No such file or directory

# el primer comando funcion ahora, así que se ejecuta el siguiente
$ cd Git/Parser/ && pwd && ls && cd
/home/andrew/Git/Parser
README.md  doc.sh  pom.xml  resource  run.sh  shell.sh  source  src  target
```

pero con `;`, el segundo comando se ejecutará incluso si el primero falla:

```bash
# pwd y ls se ejecutarán aún si cd falla
$ cd /Giit/Parser ; pwd ; ls
-bash: cd: /Giit/Parser: No such file or directory
/home/andrew
Git  TEST  jdoc  test  test.file
```

`&` se parece a `&&` pero en realidad cumple una función completamente diferente. Normalmente, cuando se ejecuta un comando de larga duración, la línea de comandos espera a que ese comando termine antes de permitirle introducir otro. Poner `&` después de un comando evita que esto ocurra, y te permite ejecutar un nuevo comando mientras uno anterior sigue en marcha:

```bash
$ cd Git/Parser && mvn package & cd
[1] 9263
```

> Cuando usamos `&` después de un comando para "ocultarlo", decimos que el trabajo está "en segundo plano". Para ver qué trabajos en segundo plano se están ejecutando actualmente, podemos utilizar el comando `jobs`:
>
> ```bash
> $ jobs
> [1]+ Running cd Git/Parser/ && mvn package &
> ```

## Cómo obtener ayuda

### `-h`

Escribe `-h` o `--help` después de casi cualquier comando para que aparezca un menú de ayuda para ese comando:

```bash
$ du --help
Usage: du [OPTION]... [FILE]...
  or:  du [OPTION]... --files0-from=F
Summarize disk usage of the set of FILEs, recursively for directories.

Mandatory arguments to long options are mandatory for short options too.
  -0, --null            end each output line with NUL, not newline
  -a, --all             write counts for all files, not just directories
      --apparent-size   print apparent sizes, rather than disk usage; although
                          the apparent size is usually smaller, it may be
                          larger due to holes in ('sparse') files, internal
                          fragmentation, indirect blocks, and the like
  -B, --block-size=SIZE  scale sizes by SIZE before printing them; e.g.,
                           '-BM' prints sizes in units of 1,048,576 bytes;
                           see SIZE format below
...
```

### `man`

Escribe `man` antes de casi cualquier comando para que aparezca el manual de ese comando (salga de man con `q`):

```bash
LS(1)                            User Commands                           LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List  information  about  the FILEs (the current directory by default).
       Sort entries alphabetically if none of -cftuvSUX nor --sort  is  speci-
       fied.

       Mandatory  arguments  to  long  options are mandatory for short options
       too.
...
```

## Visualización y edición de archivos

### `head / tail / cat / less`

`head` muestra las primeras líneas de un archivo. La bandera `-n` especifica el número de líneas a mostrar (el valor por defecto es 10):

```bash
# Imprime las primeras tres líneas
$ head -n 3 c
this
file
has
```

`tail` muestra las últimas líneas de un archivo. Puedes obtener las últimas `n` líneas (como en el caso anterior), o puedes obtener el final del archivo a partir de la Nª línea con tail -n +N:

```bash
# imprime el final del archivo empezando por la cuarta línea
$ tail -n +4 c
exactly
six
lines
```

`cat` concatena una lista de archivos y los envía al flujo de salida estándar (normalmente el terminal). `cat` puede usarse con un solo archivo, o con varios, y a menudo se utiliza para verlos rápidamente.

```bash
$ cat a
file a

$ cat a b
file a
file b
```

`less` es otra herramienta para ver rápidamente un archivo, abre una ventana de sólo lectura similar a la de vim.

### `nano / nedit`

`nano` es un editor de texto de línea de comandos minimalista. Es un gran editor para los principiantes o la gente que no quiere aprender un millón de atajos.

`nedit` es un pequeño editor gráfico, que abre una ventana X y permite la edición de apuntar y hacer clic, arrastrar y soltar, resaltar la sintaxis y más. Podemos usar `nedit` para hacer pequeños cambios en un script y volver a ejecutarlo una y otra vez.

Otros editores comunes de CLI (interfaz de línea de comandos) / GUI (interfaz gráfica de usuario) son `emacs`, `vi`, `vim`, `gedit`, `Notepad++`, `Atom`, o `VS Code`y muchos más.

Todos los editores modernos ofrecen comodidades básicas como buscar y reemplazar, resaltar la sintaxis, etc. vi(m) y emacs tienen más características que nano y nedit, pero tienen una curva de aprendizaje mucho más pronunciada.

## Creación y eliminación de archivos y directorios

### `touch`

`touch` fue creado para modificar las marcas de tiempo de los archivos, pero también puede utilizarse para crear rápidamente un archivo vacío. Puedes crear un nuevo archivo abriéndolo con un editor de texto, como `nano`:

```bash
$ ls

$ nano a
```

```bash
$ touch b && ls
a  b
```

### `mkdir / rm / rmdir`

## Mover y copiar archivos, hacer enlaces, historial de comandos

### `mv / cp / ln`

`mkdir` se utiliza para crear nuevos directorios vacíos:

```bash
$ ls && mkdir c && ls
a  b
a  b  c
```

Puedes eliminar cualquier archivo con `rm` -- ¡pero ten cuidado, esto no es recuperable!

```bash
$ rm a && ls
b  c
```

Puedes añadir un aviso de "¿está seguro?" con la bandera `-i`:

```bash
$ rm -i b
rm: remove regular empty file 'b'? y
```

Eliminar un directorio vacío con `rmdir`. Si `ls -a` en un directorio vacío, sólo debería ver una referencia al propio directorio (.) y una referencia a su directorio padre (..):

```bash
$ rmdir c && ls -a
.  ..
```

`rmdir` sólo elimina los directorios vacíos:

```bash
$ cd .. && ls test/
*.txt  0.txt  1.txt  a  a.txt  b  c

$ rmdir test/
rmdir: failed to remove 'test/': Directory not empty
```

Pero puedes eliminar un directorio y todo su contenido con `rm -rf` (-r = recursivo, -f = forzado):

```bash
$ rm –rf test
```

### Historial de comandos

`bash` tiene dos grandes características para ayudarte a completar y volver a ejecutar comandos, la primera es la finalización de tabulación. Simplemente escribe la primera parte de un comando, pulsa la tecla`tab` y deja que el terminal adivine lo que estás tratando de hacer:

```bash
$ ls <ENTER>
anotherlongfilename  thisisalongfilename  anewfilename

$ ls t <TAB>
```

pulsa la tecla `tab` después de escribir ls t y el comando se completará...

```bash
$ ls thisisalongfilename <ENTER>
thisisalongfilename
```

Puede que tengas que pulsar `tab` varias veces si hay una ambigüedad:

```bash
$ ls a <TAB>

$ ls an <TAB>
anewfilename  anotherlongfilename
```

`bash` mantiene un breve historial de los comandos que has escrito anteriormente y te permite buscar entre esos comandos escribiendo ^r (Ctrl+r):

```bash
(reverse-i-search)`':
```

escribe 'anew' y se encuentra el último comando que contiene esto...

```bash
(reverse-i-search)`anew': touch anewfilename
```

## Árboles de directorios, uso del disco y procesos

### `mkdir –p / tree`

`mkdir`, por defecto, sólo hace un único directorio. Esto significa que si, por ejemplo, el directorio d/e no existe, entonces d/e/f no puede hacerse con mkdir por sí mismo:

```bash
$ ls && mkdir d/e/f
a  b  c
mkdir: cannot create directory 'd/e/f': No such file or directory
```

Pero si pasamos la bandera `-p` a mkdir, hará todos los directorios de la ruta si no existen ya:

```bash
$ mkdir -p d/e/f && ls
a  b  c  d
```

`tree` puede ayudarte a visualizar mejor la estructura de un directorio imprimiendo un árbol de directorios con un buen formato. Por defecto, imprime toda la estructura del árbol (empezando por el directorio especificado), pero puede restringirla a un número determinado de niveles con la bandera -L:

```bash
$ tree -L 2
.
|-- a
|-- b
|-- c
`-- d
    `--e

3 directories, 2 files
```

Puedes ocultar los directorios vacíos en la salida de `tree` con `--prune`. Ten en cuenta que esto también elimina los directorios "recursivamente vacíos", o los directorios que no están vacíos en sí mismos, pero que sólo contienen otros directorios vacíos, u otros directorios recursivamente vacíos:

```bash
$ tree --prune
.
|-- a
`-- b
```

### `df / du / ps`

`df` se utiliza para mostrar cuánto espacio ocupan los archivos de los discos o de su sistema (discos duros, etc.).

```bash
$ df -h
Filesystem                   Size  Used Avail Use% Mounted on
udev                         126G     0  126G   0% /dev
tmpfs                         26G  2.0G   24G   8% /run
/dev/mapper/ubuntu--vg-root  1.6T  1.3T  252G  84% /
...
```

En el comando anterior, `-h` no significa "ayuda", sino "lectura humana". Algunos comandos utilizan esta convención para mostrar el tamaño de los archivos/disco con K para kilobytes, G para gigabytes, y así sucesivamente, en lugar de escribir un gigantesco número entero de bytes.

`du` muestra el uso del espacio de archivos para un directorio en particular y sus subdirectorios. Si quieres saber cuánto espacio está libre en un disco duro determinado, utiliza `df`; si quieres saber cuánto espacio está ocupando un directorio, utiliza `du`:

```bash
$ du
4       ./d/e/f
8       ./d/e
12      ./d
4       ./c
20      .
```

`du` toma una bandera `--max-depth=N`, que sólo muestra los directorios N niveles abajo (o menos) del directorio especificado:

```bash
$ du -h --max-depth=1
12K     ./d
4.0K    ./c
20K     .
```

`ps` muestra todos los procesos del usuario que se están ejecutando actualmente (también conocidos como trabajos):

```bash
$ ps
  PID TTY          TIME CMD
16642 pts/15   00:00:00 ps
25409 pts/15   00:00:00 bash
```

## Miscellaneous

### `passwd / logout / exit`

Cambia la contraseña de tu cuenta con `passwd`. Te pedirá tu contraseña actual para verificarla, y luego te pedirá que introduzcas la nueva contraseña dos veces, para que no cometas ningún error:

```bash
$ passwd
Changing password for andrew.
(current) UNIX password:    <type current password>
Enter new UNIX password:    <type new password>
Retype new UNIX password:   <type new password again>
passwd: password updated successfully
```

`logout` sale de un shell en el que has entrado (donde tienes una cuenta de usuario):

```bash
$ logout

──────────────────────────────────────────────────────────────────────────────
Session stopped
    - Press <return> to exit tab
    - Press R to restart session
    - Press S to save terminal output to file
```

`exit` sale de cualquier tipo de shell:

```bash
$ exit
logout

──────────────────────────────────────────────────────────────────────────────
Session stopped
    - Press <return> to exit tab
    - Press R to restart session
    - Press S to save terminal output to file
```

### `clear / *`

Ejecuta `clear` para mover la línea actual del terminal a la parte superior de la pantalla. Este comando sólo agrega líneas en blanco debajo de la línea actual del prompt. Es bueno para limpiar su espacio de trabajo.

Utilice el glob (\*, aka. Kleene Star, aka. wildcard) cuando busques archivos. Observe la diferencia entre los dos comandos siguientes:

```bash
$ ls Git/Parser/source/
PArrayUtils.java     PFile.java            PSQLFile.java      PWatchman.java
PDateTimeUtils.java  PFixedWidthFile.java  PStringUtils.java  PXSVFile.java
PDelimitedFile.java  PNode.java            PTextFile.java     Parser.java

$ ls Git/Parser/source/PD*
Git/Parser/source/PDateTimeUtils.java  Git/Parser/source/PDelimitedFile.java
```

`glob` se puede utilizar varias veces en un comando y coincide con cero o más caracteres:

```bash
$ ls Git/Parser/source/P*D*m*
Git/Parser/source/PDateTimeUtils.java  Git/Parser/source/PDelimitedFile.java
```

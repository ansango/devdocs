---
sidebar_position: 2
---

# Comandos Intermedios

## Uso de disco, memoria y procesador

### `ncdu`

`ncdu` (NCurses Disk Usage) proporciona una visión general navegable del uso del espacio de archivos, como un du mejorado. Abre una ventana de sólo lectura similar a la de vim (pulsa `q` para salir):

```bash
$ ncdu

ncdu 1.11 ~ Use the arrow keys to navigate, press ? for help
-------- /home/andrew -------------------------------------------------------------
  148.2 MiB [##########] /.m2
   91.5 MiB [######    ] /.sbt
   79.8 MiB [#####     ] /.cache
   64.9 MiB [####      ] /.ivy2
   40.6 MiB [##        ] /.sdkman
   30.2 MiB [##        ] /.local
   27.4 MiB [#         ] /.mozilla
   24.4 MiB [#         ] /.nanobackups
   10.2 MiB [          ]  .confout3.txt
    8.4 MiB [          ] /.config
    5.9 MiB [          ] /.nbi
    5.8 MiB [          ] /.oh-my-zsh
    4.3 MiB [          ] /Git
    3.7 MiB [          ] /.myshell
    1.7 MiB [          ] /jdoc
    1.5 MiB [          ]  .confout2.txt
    1.5 MiB [          ] /.netbeans
    1.1 MiB [          ] /.jenv
  564.0 KiB [          ] /.rstudio-desktop
 Total disk usage: 552.7 MiB  Apparent size: 523.6 MiB  Items: 14618
```

### `top / htop`

`top` muestra todos los procesos que se están ejecutando actualmente y sus propietarios, el uso de la memoria, etc. `htop` es un top mejorado e interactivo. (Nota: puede pasar la bandera `-u username` para restringir los procesos mostrados sólo a los propietarios por nombre de usuario).

```bash
$ htop

  1  [       0.0%]   9  [       0.0%]   17 [       0.0%]   25 [       0.0%]
  2  [       0.0%]   10 [       0.0%]   18 [       0.0%]   26 [       0.0%]
  3  [       0.0%]   11 [       0.0%]   19 [       0.0%]   27 [       0.0%]
  4  [       0.0%]   12 [       0.0%]   20 [       0.0%]   28 [       0.0%]
  5  [       0.0%]   13 [       0.0%]   21 [|      1.3%]   29 [       0.0%]
  6  [       0.0%]   14 [       0.0%]   22 [       0.0%]   30 [|      0.6%]
  7  [       0.0%]   15 [       0.0%]   23 [       0.0%]   31 [       0.0%]
  8  [       0.0%]   16 [       0.0%]   24 [       0.0%]   32 [       0.0%]
  Mem[||||||||||||||||||||1.42G/252G]   Tasks: 188, 366 thr; 1 running
  Swp[|                   2.47G/256G]   Load average: 0.00 0.00 0.00
                                        Uptime: 432 days(!), 00:03:55

   PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
 9389 andrew     20   0 23344  3848  2848 R  1.3  0.0  0:00.10 htop
10103 root       20   0 3216M 17896  2444 S  0.7  0.0  5h48:56 /usr/bin/dockerd
    1 root       20   0  181M  4604  2972 S  0.0  0.0 15:29.66 /lib/systemd/syst
  533 root       20   0 44676  6908  6716 S  0.0  0.0 11:19.77 /lib/systemd/syst
  546 root       20   0  244M     0     0 S  0.0  0.0  0:01.39 /sbin/lvmetad -f
 1526 root       20   0  329M  2252  1916 S  0.0  0.0  0:00.00 /usr/sbin/ModemMa
 1544 root       20   0  329M  2252  1916 S  0.0  0.0  0:00.06 /usr/sbin/ModemMa
F1Help  F2Setup F3SearchF4FilterF5Tree  F6SortByF7Nice -F8Nice +F9Kill  F10Quit
```

## REPLs y versiones de software

### REPLs

Un REPL es un bucle de lectura-evaluación-impresión, similar a la línea de comandos, pero que suele utilizarse para determinados lenguajes de programación.

Puedes abrir el REPL de Python con el comando python (y salir con la función quit()):

```bash
$ python
Python 3.5.2 (default, Nov 12 2018, 13:43:14) ...
>>> quit()
```

Abre el R REPL con el comando R (y salga con la función q()):

```bash
$ R
R version 3.5.2 (2018-12-20) --"Eggshell Igloo" ...
> q()
Save workspace image? [y/n/c]: n
```

Abre el REPL de Scala con el comando scala (y salga con el comando :quit):

```bash
$ scala
Welcome to Scala 2.11.12 ...
scala> :quit
```

Abre el REPL de Java con el comando jshell (y salga con el comando /exit):

```bash
$ jshell
| Welcome to JShell--Version 11.0.1 ...
jshell> /exit
```

También puedes salir de cualquiera de estos REPL con ^d (Ctrl+d). ^d es el marcador EOF (fin de archivo) en Unix y significa el fin de la entrada.

### `-version / --version / -v`

La mayoría de los comandos y programas tienen una bandera `-version` o `--version` que da la versión del software de ese comando o programa. La mayoría de las aplicaciones hacen que esta información esté fácilmente disponible:

```bash
$ ls --version
ls (GNU coreutils) 8.25 ...

$ ncdu -version
ncdu 1.11

$ python --version
Python 3.5.2
```

pero algunos son menos intuitivos:

```bash
$ sbt scalaVersion
...
[info] 2.12.4s
```

Ten en cuenta que algunos programas utilizan `-v` como bandera de versión, mientras que otros utilizan `-v` para significar "verboso", que ejecutará la aplicación mientras imprime mucha información de diagnóstico o depuración:

```bash
SCP(1)                    BSD General Commands Manual                   SCP(1)

NAME
     scp -- secure copy (remote file copy program)
...
-v      Verbose mode.  Causes scp and ssh(1) to print debugging messages
             about their progress.  This is helpful in debugging connection,
             authentication, and configuration problems.
...
```

## Variables de entorno y alias

### Variables de entorno

Las variables de entorno (a veces abreviadas como "env vars") son variables persistentes que pueden ser creadas y utilizadas dentro de su shell bash. Se definen con un signo de igualdad (=) y se utilizan con un signo de dólar ($). Puedes ver todas las env vars definidas actualmente con printenv:

```bash
$ printenv
SPARK_HOME=/usr/local/spark
TERM=xterm
...
```

Establece una nueva variable de entorno con un signo `=` (¡no pongas ningún espacio antes o después del `=`!):

```bash
$ myvar=hello
```

Imprime una var env específica en la terminal con `echo` y un signo `$` precedente:

```bash
$ echo $myvar
hello
```

Las variables de entorno que contengan espacios u otros espacios en blanco deben ir rodeadas de comillas ("..."). Ten en cuenta que la reasignación de un valor a una variable de entorno lo sobrescribe sin previo aviso:

```bash
$ myvar="hello, world!" && echo $myvar
hello, world!
```

Los env vars también pueden definirse utilizando el comando export. Cuando se definen de esta manera, también estarán disponibles para los subprocesos (comandos llamados desde este shell):

```bash
$ export myvar="another one" && echo $myvar
another one
```

Se puede anular una variable de entorno dejando el lado derecho del `=` en blanco o utilizando el comando `unset`:

```bash
$ unset mynewvar

$ echo $mynewvar
```

### Alias

Los alias son similares a las variables de entorno, pero suelen utilizarse de forma diferente: para sustituir comandos largos por otros más cortos:

```bash
$ ls -l -a -h -t
total 220K
drwxr-xr-x 5 andrew andrew 4.0K Dec 21 12:37 .
-rw-r--r-- 1 andrew andrew 9.9K Dec 21 12:37 help-doc.html
-rw-r--r-- 1 andrew andrew 4.5K Dec 21 12:37 script.js
...

$ alias lc="ls -l -a -h -t"

$ lc
total 220K
drwxr-xr-x 5 andrew andrew 4.0K Dec 21 12:37 .
-rw-r--r-- 1 andrew andrew 9.9K Dec 21 12:37 help-doc.html
-rw-r--r-- 1 andrew andrew 4.5K Dec 21 12:37 script.js
...
```

Puedes eliminar un alias con `unalias`:

```bash
$ unalias lc

$ lc
The program 'lc' is currently not installed. ...
```

## Scripts bash básicos

### Scripts `bash`

Los scripts bash (que suelen terminar en .sh) permiten automatizar procesos complicados, empaquetándolos en funciones reutilizables. Un script bash puede contener cualquier número de comandos normales del shell:

```bash
$ echo "ls && touch file && ls" > ex.sh
```

Un script de shell puede ser ejecutado con el comando source o el comando sh:

```bash
$ source ex.sh
Desktop  Git  TEST  c  ex.sh  project  test
Desktop  Git  TEST  c  ex.sh  file  project  test
```

Las secuencias de comandos pueden hacerse ejecutables con el comando `chmod`:

```bash
$ echo "ls && touch file2 && ls" > ex2.sh

$ chmod +x ex2.sh
```

Un script de shell ejecutable puede ser ejecutado precediéndolo con `./`:

```bash
$ ./ex2.sh
Desktop  Git  TEST  c  ex.sh  ex2.sh  file  project  test
Desktop  Git  TEST  c  ex.sh  ex2.sh  file  file2  project  test
```

Las líneas largas de código se pueden dividir terminando un comando con `\`:

```bash
$ echo "for i in {1..3}; do echo \
> \"Welcome \$i times\"; done" > ex3.sh
```

Los scripts de Bash pueden contener bucles, funciones y mucho más.

```bash
$ source ex3.sh
Welcome 1 times
Welcome 2 times
Welcome 3 times
```

### Prompt y `ls` personalizados

Los scripts de Bash pueden hacer tu vida mucho más fácil y colorida.

`$PS1` (Prompt String 1) es la variable de entorno que define el prompt principal de tu shell

```bash
$ printf "%q" $PS1
$'\\n\\[\E[1m\\]\\[\E[30m\\]\\A'$'\\[\E[37m\\]|\\[\E[36m\\]\\u\\[\E[37m\\]@\\[\E[34m\\]\\h'$'\\[\E[32m\\]\\W\\[\E[37m\\]|'$'\\[\E(B\E[m\\]‘
```

Puedes cambiar el prompt por defecto con el comando export:

```bash
$ export PS1="\ncommand here> "

command here> echo $PS1
\ncommand here>
```

También puedes añadir colores!:

```bash
command here> export PS1="\e[1;31m\nCODE: \e[39m"

# (this should be red, but it may not show up that way in Markdown)
CODE: echo $PS1
\e[1;31m\nCODE: \e[39m
```

También puedes cambiar los colores que muestra ls editando la variable de entorno `$LS_COLORS`:

```bash
# (again, these colours might not show up in Markdown)
CODE: ls
Desktop  Git  TEST  c  ex.sh  ex2.sh  ex3.sh  file  file2  project  test

CODE: export LS_COLORS='di=31:fi=0:ln=96:or=31:mi=31:ex=92‘

CODE: ls
Desktop  Git  TEST  c  ex.sh  ex2.sh  ex3.sh  file  file2  project  test
```

## Archivos de configuración

### Archivos de configuración / `.bashrc`

Si has probado los comandos de la última sección y te has desconectado y vuelto a conectar, te habrás dado cuenta de que tus cambios han desaparecido. Los archivos config (de configuración) te permiten mantener los ajustes de tu shell o de un programa concreto cada vez que te conectas (o ejecutas ese programa). El principal archivo de configuración para un shell bash es el archivo `~/.bashrc`. Los alias, las variables de entorno y las funciones añadidas a `~/.bashrc` estarán disponibles cada vez que se inicie una sesión. Los comandos de `~/.bashrc` se ejecutarán cada vez que se inicie una sesión.

Si editas tu archivo `~/.bashrc`, puedes recargarlo sin cerrar la sesión utilizando el comando fuente:

```bash
$ nano ~/.bashrc
```

añade la línea `echo "~/.bashrc loaded!"` al principio del archivo

```bash
$ source ~/.bashrc
~/.bashrc loaded!
```

cierra la sesión y vuelve a entrar

```bash
Last login: Fri Jan 11 10:29:07 2019 from 111.11.11.111
~/.bashrc loaded!

```

### Tipos de Shells

Los shells de inicio de sesión son shells en los que se entra (donde se tiene un nombre de usuario). Los shells interactivos son shells que aceptan comandos. Los shells pueden ser de inicio de sesión e interactivos, de no inicio de sesión y no interactivos, o cualquier otra combinación.

Además de ~/.bashrc, hay algunos otros scripts que el shell obtiene automáticamente cuando se inicia o se cierra la sesión. Estos son:

- `/etc/profile`
- `~/.bash_profile`
- `~/.bash_login`
- `~/.profile`
- `~/.bash_logout`
- `/etc/bash.bash_logout`

De cómo se obtienen estos scripts, y el orden en que se obtienen, dependen del tipo de shell abierto.

Ten en cuenta que los scripts de bash pueden originar otros scripts. Por ejemplo, en tu ~/.bashrc, podrías incluir la línea

```bash
source ~/.bashrc_addl
```

lo que también originaría ese script .bashrc_addl. Este archivo puede contener sus propios alias, funciones, variables de entorno, etc. Podría, a su vez, originar otros scripts, también. (¡Ten cuidado y evita los bucles infinitos de aprovisionamiento de scripts!)

Puede ser útil dividir los comandos en diferentes scripts de shell basados en la funcionalidad o el tipo de máquina (Ubuntu vs. Red Hat vs. macOS), por ejemplo:

`~/.bash_ubuntu ` - configuración específica para máquinas basadas en Ubuntu
`~/.bashrc_styles` - configuración estética, como PS1 y LS_COLORS
`~/.bash_java` - configuración específica para el lenguaje Java

Ten en cuenta que también hay diferentes shells. bash es sólo un tipo de shell (el "Bourne Again Shell").
Otras más comunes son `zsh`, `csh`, `fish` entre otras. Juega con diferentes shells y encuentra uno que sea adecuado para ti, pero ten en cuenta que este tutorial contiene sólo comandos del shell bash y no todo lo que se menciona aquí (tal vez ninguno) será aplicable a otros shells que no sean bash.

## Cómo encontrar cosas

### `whereis / which / whatis`

`whereis` busca archivos "posiblemente útiles" relacionados con un comando en particular. Intentará devolver la ubicación del binario (código máquina ejecutable), el código fuente (archivos de origen del código) y la página `man` de ese comando:

```bash
[ andrew@pc01 ~ ]$ whereis ls
ls: /bin/ls /usr/share/man/man1/ls.1.gz
```

`which` sólo devolverá la ubicación del binario (el propio comando):

```bash
[ andrew@pc01 ~ ]$ which ls
/bin/ls
```

`whatis` imprime la descripción de una línea de un comando desde su página `man`:

```bash
[ andrew@pc01 ~ ]$ whatis whereis which whatis
whereis (1)          - locate the binary, source, and manual page files for a command
which (1)            - locate a command
whatis (1)           - display one-line manual page descriptions
```

`which` es útil para encontrar la "versión original" de un comando que puede estar oculto por un alias:

```bash
[ andrew@pc01 ~ ]$ alias ls="ls -l"

# “original” ls has been “hidden” by the alias defined above
[ andrew@pc01 ~ ]$ ls
total 36
drwxr-xr-x 2 andrew andrew 4096 Jan  9 14:47 Desktop
drwxr-xr-x 4 andrew andrew 4096 Dec  6 10:43 Git
...

# but we can still call “original” ls by using the location returned by which
[ andrew@pc01 ~ ]$ /bin/ls
Desktop  Git  TEST  c  ex.sh  ex2.sh  ex3.sh  file  file2  project  test
```

### `locate / find`

`locate` encuentra un archivo en cualquier lugar del sistema haciendo referencia a una lista de archivos en caché que se actualiza de forma semiregular:

```bash
[ andrew@pc01 ~ ]$ locate README.md
/home/andrew/.config/micro/plugins/gotham-colors/README.md
/home/andrew/.jenv/README.md
/home/andrew/.myshell/README.md
...

```

Dado que sólo busca en una lista, `locate` suele ser más rápido que la alternativa, `find`. `find` itera a través del sistema de archivos para encontrar el archivo que está buscando. Sin embargo, dado que está buscando en los archivos que existen actualmente en el sistema, siempre devolverá una lista actualizada de archivos, lo que no es necesariamente cierto con `locate`.

```bash
[ andrew@pc01 ~ ]$ find ~/ -iname "README.md"
/home/andrew/.jenv/README.md
/home/andrew/.config/micro/plugins/gotham-colors/README.md
/home/andrew/.oh-my-zsh/plugins/ant/README.md
...
```

`find` tiene muchas más características que `locate`, y puede buscar por edad del archivo, tamaño, propiedad, tipo, marca de tiempo, permisos, profundidad dentro del sistema de archivos; `find` puede buscar usando expresiones regulares, ejecutar comandos en los archivos que encuentra, y más.

Cuando necesites una lista rápida (pero posiblemente obsoleta) de archivos, o no estés seguro de en qué directorio se encuentra un archivo concreto, utiliza `locate`. Cuando necesites una lista precisa de archivos, tal vez basada en algo más que los nombres de los archivos, y necesites hacer algo con esos archivos, usa `find`.

## Descargando cosas

### `ping / wget / curl`

`ping` intenta abrir una línea de comunicación con un host de la red. Principalmente, se utiliza para comprobar si la conexión a Internet está caída o no:

```bash
[ andrew@pc01 ~ ]$ ping google.com
PING google.com (74.125.193.100) 56(84) bytes of data.
Pinging 74.125.193.100 with 32 bytes of data:
Reply from 74.125.193.100: bytes=32 time<1ms TTL=64
...
```

`wget` se utiliza para descargar fácilmente un archivo de Internet:

```bash
[ andrew@pc01 ~ ]$ wget \
> http://releases.ubuntu.com/18.10/ubuntu-18.10-desktop-amd64.iso
```

`curl` puede usarse igual que wget (no olvides la bandera `--output`):

```bash
[ andrew@pc01 ~ ]$ curl \
> http://releases.ubuntu.com/18.10/ubuntu-18.10-desktop-amd64.iso \
> --output ubuntu.iso
```

`curl` y `wget` tienen sus propios puntos fuertes y débiles. `curl` soporta muchos más protocolos y está más ampliamente disponible que `wget`; `curl` también puede enviar datos, mientras que `wget` sólo puede recibir datos. `wget` puede descargar archivos recursivamente, mientras que `curl` no puede.

### `apt / gunzip / tar / gzip`

Las distribuciones de Linux descendientes de Debian tienen una fantástica herramienta de gestión de paquetes llamada `apt`. Se puede utilizar para instalar, actualizar o eliminar software en su máquina. Para buscar en `apt` un software en particular, utilice `apt search`, e instálalo con `apt install`:

```bash
[ andrew@pc01 ~ ]$ apt search bleachbit
...bleachbit/bionic,bionic 2.0-2 all
  delete unnecessary files from the system

# you need to 'sudo' to install software
[ andrew@pc01 ~ ]$ sudo apt install bleachbit
```

El software de Linux suele venir empaquetado en archivos .tar.gz ("tarball"):

```bash
[ andrew@pc01 ~ ]$ wget \
> https://github.com/atom/atom/releases/download/v1.35.0-beta0/atom-amd64.tar.gz
```

..este tipo de archivos se pueden descomprimir con `gunzip`:

```bash
[ andrew@pc01 ~ ]$ gunzip atom-amd64.tar.gz && ls
atom-amd64.tar
```

Un archivo .tar.gz se convertirá con `gunzip` en un archivo .tar, que puede extraerse a un directorio de archivos utilizando `tar -xf` (-x para "extraer", -f para especificar el archivo a "desatar"):

```bash
[ andrew@pc01 ~ ]$ tar -xf atom-amd64.tar && mv \
atom-beta-1.35.0-beta0-amd64 atom && ls
atom atom-amd64.tar
```

Para ir en la dirección inversa, puedes crear (`-c`) un archivo tar desde un directorio y comprimirlo (o descomprimirlo, según el caso) con `-z`:

```bash
[ andrew@pc01 ~ ]$ tar -zcf compressed.tar.gz atom && ls
atom  atom-amd64.tar  compressed.tar.gz
```

Los archivos .tar también se pueden comprimir con `gzip`:

```bash
[ andrew@pc01 ~ ]$ gzip atom-amd64.tar && ls
atom  atom-amd64.tar.gz compressed.tar.gz
```

## Redirigir la entrada y la salida

### `| / > / < / echo / printf`

Por defecto, los comandos del shell leen su entrada del flujo de entrada estándar (también conocido como stdin o 0) y escriben en el flujo de salida estándar (también conocido como stdout o 1), a menos que haya un error, que se escribe en el flujo de error estándar (también conocido como stderr o 2).

`echo` writes text to stdout by default, which in most cases will simply print it to the terminal:

```bash
[ andrew@pc01 ~ ]$ echo "hello"
hello
```

El operador pipe, `|`, redirige la salida del primer comando a la entrada del segundo:

```bash
# 'wc' (word count) returns the number of lines, words, bytes in a file
[ andrew@pc01 ~ ]$ echo "example document" | wc
      1       2      17
```

`>` redirige la salida de stdout a un lugar determinado

```bash
[ andrew@pc01 ~ ]$ echo "test" > file && head file
test
```

`printf` es un `echo` mejorado, que permite el formateo y las secuencias de escape:

```bash
[ andrew@pc01 ~ ]$ printf "1\n3\n2"
1
3
2
```

`<` obtiene la entrada desde una ubicación particular, en lugar de stdin:

```bash
# 'sort' sorts the lines of a file alphabetically / numerically
[ andrew@pc01 ~ ]$ sort <(printf "1\n3\n2")
1
2
3
```

La forma recomendada de enviar el contenido de un archivo a un comando es utilizar `<`. Ten en cuenta que esto hace que los datos "fluyan" de derecha a izquierda en la línea de comandos, en lugar de (el quizás más natural, para los angloparlantes) de izquierda a derecha:

```bash
[ andrew@pc01 ~ ]$ printf "1\n3\n2" > file && sort < file
1
2
3
```

### `0 / 1 / 2 / tee`

0, 1 y 2 son los flujos estándar de entrada, salida y error, respectivamente. Los flujos de entrada y salida pueden ser redirigidos con los operadores `|`, `>` y `<` mencionados anteriormente, pero stdin, stdout y stderr también pueden ser manipulados directamente usando sus identificadores numéricos:

Escribe en stdout o stderr con `>&1` o `>&2`:

```bash
[ andrew@pc01 ~ ]$ cat test
echo "stdout" >&1
echo "stderr" >&2
```

Por defecto, stdout y stderr imprimen la salida al terminal:

```bash
[ andrew@pc01 ~ ]$ ./test
stderr
stdout
```

Redirigir stdout a `/dev/null` (sólo imprimir la salida enviada a stderr):

```bash
[ andrew@pc01 ~ ]$ ./test 1>/dev/null
stderr
```

Redirigir stderr a `/dev/null` (sólo imprimir la salida enviada a stdout):

```bash
[ andrew@pc01 ~ ]$ ./test 2>/dev/null
stdout
```

Redirige toda la salida a `/dev/null` (no imprime nada):

```bash
[ andrew@pc01 ~ ]$ ./test &>/dev/null
```

Send output to stdout and any number of additional locations with `tee`:

```bash
[ andrew@pc01 ~ ]$ ls && echo "test" | tee file1 file2 file3 && ls
file0
test
file0  file1  file2  file3
```

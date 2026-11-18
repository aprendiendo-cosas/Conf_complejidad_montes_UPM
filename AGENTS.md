# Repo de la conferencia (la presentación)

Las instrucciones generales y el flujo de trabajo están en `../AGENTS.md`. Este archivo solo recoge lo técnico del repo.

## Remotes
- `origin` → `aprendiendo-cosas/Conf_complejidad_montes_UPM`. Aquí se publica.
- `upstream` → `aprendiendo-cosas/Conf_ingenieria_regenerativa_UPM`. No se le hace push.
- Rama de trabajo: `main`.
- El repo es un fork de otra charla. Está pendiente de decidir si sigue siéndolo; lo decide el ponente.

## Contenido
- `index.html`: la presentación (HTML, SVG y JavaScript propio, sin librerías externas; funciona sin conexión).
  - Se avanza con →, la barra espaciadora, un clic o el mando; se retrocede con ←. La tecla `h` oculta el contador de pasos.
  - El contador muestra el número de paso de la escaleta (p. ej. `5.19`), y se puede saltar a un paso con `index.html#5.19`.
- `js/motor.js`: motor común. Cada paso enciende o apaga banderas; los elementos del SVG con `data-on="bandera"` se ven mientras la bandera está encendida.
- `js/escena0.js`, `js/escenas1-4.js`, `js/escena5.js`: una por escena (o bloque). Cada una dibuja su material y registra sus pasos con `P.steps()`, numerados como en la escaleta.
  - Estado actual: escenas 0–5 programadas, hasta el paso 5.42.
- `Conf_ingenieria_regenerativa_sistemas_complejos.md`: **se conserva, no borrar.** Servirá para documentar el proceso y alojar la transcripción de la conferencia. El repo tendrá más material público aparte de la presentación. Su contenido actual procede de otra charla y el ponente lo irá sustituyendo.
- `imagenes/portada.png`: **se conserva** hasta que el ponente la sustituya por la portada nueva.

## Reglas
- Cada imagen que entre en el repo debe estar anotada en `../figuras/fuentes.md`.
- Los commits y los push los hace el usuario con GitHub Desktop; la IA solo propone el mensaje.
- Hay que hacer push antes de cambiar de ordenador.

## Publicación y forma de trabajo
- **GitHub Pages:** se despliega desde la rama `main`, en la raíz del repo. Dirección prevista: https://aprendiendo-cosas.github.io/Conf_complejidad_montes_UPM/
- **Modelo híbrido:**
  - **Iterar en local:** servidor `python3 -m http.server 8765` sobre esta carpeta. Desde la app de Claude se arranca con la configuración `presentacion` de `../.claude/launch.json`.
  - **Hitos:** commit y push → Pages. Sirve para verla desde otro dispositivo o compartirla.
  - **Día de la charla:** se presenta desde el archivo local, sin depender del wifi; Pages queda como respaldo.
- Todo lo que llega a `main` se publica. Las imágenes con licencia sin aclarar en `../figuras/fuentes.md` no deberían subirse.

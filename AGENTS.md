# Repo de la conferencia (la presentación)

Las instrucciones generales y el flujo de trabajo están en `../AGENTS.md`. Este archivo solo recoge lo técnico del repo.

## Remotes
- `origin` → `aprendiendo-cosas/Conf_complejidad_montes_UPM`. Aquí se publica.
- `upstream` → `aprendiendo-cosas/Conf_ingenieria_regenerativa_UPM`. No se le hace push.
- Rama de trabajo: `main`.
- El repo es un fork de otra charla. Está pendiente de decidir si sigue siéndolo; lo decide el ponente.

## Contenido
- `index.html`: la presentación. Es un único archivo con HTML, SVG y JavaScript propio, sin librerías externas, y funciona sin conexión.
  - Se avanza con →, la barra espaciadora, un clic o el mando; se retrocede con ←. La tecla `h` oculta el contador de pasos.
  - El guion de pasos está en el array `STEPS` del script. Cada paso enciende o apaga capas, que se marcan en el SVG con el atributo `data-on`.
  - Estado actual: prototipo de las escenas 1–4.
- `Conf_ingenieria_regenerativa_sistemas_complejos.md`: **se conserva, no borrar.** Servirá para documentar el proceso y alojar la transcripción de la conferencia. El repo tendrá más material público aparte de la presentación. Su contenido actual procede de otra charla y el ponente lo irá sustituyendo.
- `imagenes/portada.png`: **se conserva** hasta que el ponente la sustituya por la portada nueva.

## Reglas
- Cada imagen que entre en el repo debe estar anotada en `../figuras/fuentes.md`.
- Los commits y los push los hace el usuario con GitHub Desktop; la IA solo propone el mensaje.
- Hay que hacer push antes de cambiar de ordenador.
- Pendiente de decidir: la configuración de GitHub Pages. Cuando se decida, documentarlo aquí.

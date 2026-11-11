# Repo de la conferencia (producto final)

Las instrucciones generales y el flujo de trabajo están en `../AGENTS.md`. Este archivo solo recoge lo técnico del repo.

## Remotes
- `origin` → `aprendiendo-cosas/Conf_complejidad_montes_UPM` (este fork; aquí se publica).
- `upstream` → `aprendiendo-cosas/Conf_ingenieria_regenerativa_UPM` (original; no se le hace push).
- Rama de trabajo: `main`.

## Contenido actual (heredado del original)
- `Conf_ingenieria_regenerativa_sistemas_complejos.md`: texto de la conferencia. **Es la fuente de verdad del contenido.**
- `Conf_ingenieria_regenerativa_sistemas_complejos.html`: exportación de Typora, con comentarios Cusdis. Se sustituirá por la nueva web.
- `presentacion/*.pptx`: diapositivas originales; solo como referencia.
- `imagenes/`: imágenes que usa la web.

## Reglas
- Durante la fase 1 (revisión temática) **no se modifica el repo**.
- Cada imagen que entre en `imagenes/` debe estar anotada en `../preparacion/fuentes.md`.
- Los commits y los push los hace el usuario con GitHub Desktop; Claude solo propone el mensaje. Hay que hacer push antes de cambiar de ordenador, porque el otro ordenador solo ve lo que está en GitHub.
- Pendiente de decidir (fase 3): tecnología de la web (HTML estático o generador), si se mantiene Cusdis y la configuración de GitHub Pages. Cuando se decida, documentarlo aquí.

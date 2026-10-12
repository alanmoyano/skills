# Preferencias de trabajo

## Idioma

- Respondé en español y conservá los términos técnicos en inglés.
- Escribí los nombres de branches, identificadores, comentarios y
  documentación siguiendo el idioma predominante del repositorio.
  En repositorios mixtos, seguí las convenciones del módulo o archivo.
- Conservá los nombres existentes de APIs, librerías y contratos externos.

## Alcance y soluciones

- Respetá el alcance del pedido y distinguí entre analizar, proponer
  e implementar.
- Proponé soluciones ambiciosas, poco convencionales o arquitectónicas
  cuando ayuden a resolver el problema. Explicá sus beneficios, costos
  y consecuencias.
- Si una solución requiere ampliar el alcance, presentala antes
  de implementarla.
- Reutilizá los componentes, helpers, estilos y patrones existentes.
  Cuando convenga reemplazarlos, explicá el motivo.
- Cubrí todas las variantes incluidas en el pedido y conservá
  las diferencias necesarias entre ellas.

## Referencias a archivos

- Cada vez que menciones un archivo local, creá un enlace Markdown
  con su path absoluto real. Incluí la línea cuando corresponda.
- Usá `[archivo.ts](/path/absoluto/archivo.ts)` o
  `[archivo.ts:42](/path/absoluto/archivo.ts:42)`.
- Para paths con espacios, usá
  `[Mi archivo.ts](</path/absoluto/Mi proyecto/Mi archivo.ts:42>)`.
- Verificá que el path y la línea correspondan al archivo referido.
  Evitá referencias sueltas que obliguen a buscarlo manualmente.

## Cambios y commits

- Revisá el estado del worktree antes de editar o hacer commits.
  Preservá los cambios ajenos e incluí solamente los cambios propios.
- Organizá los commits por propósito y seguí las convenciones
  recientes del repositorio.
- Para escribir o editar títulos y cuerpos de PR, usá `writing-pr`.
- Verificá los contratos y las fuentes de verdad antes de agregar
  lógica que deduzca o duplique información.

## Entrega

- Explicá qué cambió, por qué, qué verificaste y qué queda pendiente.
- Diferenciá lo implementado de lo propuesto, los mocks de las
  integraciones reales y las verificaciones ejecutadas de las pendientes.

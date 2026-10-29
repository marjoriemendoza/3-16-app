export const AGE_GROUPS = [
  { id: "kids", label: "Niños", ages: "6 a 11 años", desc: "Frases cortas, relatos, ejemplos concretos y sesiones breves." },
  { id: "teens", label: "Adolescentes", ages: "12 a 17 años", desc: "Preguntas de significado, escenarios cotidianos y espacio para dudas." },
  { id: "adults", label: "Adultos", ages: "18 años o más", desc: "Más contexto, glosario y conexiones entre pasajes." },
];

export const VERSE = {
  ref: "Juan 3:16",
  text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.",
  translation: "Reina-Valera 1960 · traducción sujeta a confirmación de permisos por la iglesia",
};

const v = (kids, teens, adults) => ({ kids, teens, adults });

export const PHASES = [
  {
    id: "f1",
    name: "Fase 1 · Inicial",
    slogan: "CONOCER",
    tagline: "Establece una base bíblica y presenta con claridad el mensaje del evangelio.",
    audience: "Niños, adolescentes, adultos nuevos en el aprendizaje bíblico y quien necesita repasar fundamentos.",
    result:
      "Reconocer la estructura básica de la Biblia, identificar acontecimientos centrales de Jesús y explicar con tus palabras una presentación inicial del evangelio y la salvación.",
    modules: [
      {
        id: "m1",
        title: "La Biblia",
        icon: "book",
        summary: "Qué es la Biblia, Antiguo y Nuevo Testamento, libros, capítulos, versículos y cómo localizar pasajes.",
        lessons: [
          {
            id: "l1-1",
            title: "¿Qué es la Biblia?",
            objective: "Entender qué es la Biblia y por qué es importante para la fe cristiana.",
            activation: v(
              "Imagina que alguien te regala una carta escrita por la persona que más te ama. ¿Qué harías con ella? Hoy vamos a conocer un libro muy especial: la Biblia.",
              "Si pudieras recibir un mensaje directo de Dios, ¿qué esperarías encontrar en él? La Biblia es el libro que los cristianos creen que Dios usó para hablarnos.",
              "Antes de estudiar cualquier tema, conviene preguntar: ¿qué es exactamente la Biblia, quién la escribió y con qué propósito fue reunida?"
            ),
            passage: {
              ref: "2 Timoteo 3:16-17",
              text: "Toda Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea enteramente adecuado para toda buena obra.",
            },
            explanation: v(
              "La Biblia es el libro de libros. Lo escribieron muchas personas, pero los cristianos creemos que Dios fue el que guió sus palabras. La Biblia nos enseña quién es Dios, qué hizo y cómo queremos vivir.",
              "La Biblia es un conjunto de libros escritos por autores humanos distintos, en muchos siglos, pero que los cristianos reconocen como Palabra de Dios inspirada: enseña verdad, corrige y forma el carácter.",
              "La afirmación paulina de inspiración bíblica no se limita al origen textual: define la autoridad, suficiencia y propósito pastoral de toda Escritura para formar al discípulo."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Según 2 Timoteo 3:16, ¿para qué es útil la Escritura?",
                options: [
                  "Solo para ceremonias especiales",
                  "Para enseñar, redargüir, corregir e instruir en justicia",
                  "Solo para historias antiguas",
                  "Únicamente para los pastores",
                ],
                answer: 1,
                feedback:
                  "Pablo escribió que toda Escritura es útil para enseñar, corregir e instruir. La Biblia tiene un propósito práctico para la vida de todos los creyentes.",
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "La Biblia fue escrita por muchas personas a lo largo de la historia.", answer: true, ref: "2 Pedro 1:21" },
                  { text: "La Biblia solo sirve para los domingos en la iglesia.", answer: false, ref: "2 Timoteo 3:16" },
                  { text: "Dios usó autores humanos para transmitir su Palabra.", answer: true, ref: "2 Pedro 1:21" },
                ],
              },
            ],
            reflection: v(
              "¿A quién le contarías esta semana que la Biblia es el mensaje de Dios para las personas?",
              "¿Qué diferencia hay entre leer la Biblia como un libro antiguo y leerla como Palabra de Dios para ti hoy?",
              "¿Qué uso concreto has dado a la Escritura en decisiones recientes de tu vida?"
            ),
            evaluation: [
              {
                q: "¿Qué significa que toda Escritura es «inspirada por Dios»?",
                options: [
                  "Que solo algunos libros son de Dios",
                  "Que Dios guió a los autores humanos para transmitir su Palabra",
                  "Que la Biblia es un libro de poesía antigua",
                ],
                answer: 1,
                why: "La inspiración significa origen divino con autores humanos: Dios guió la escritura de la Biblia.",
              },
              {
                q: "¿Cuál de estas NO es una función de la Escritura según 2 Timoteo 3:16?",
                options: ["Enseñar", "Corregir", "Instruir en justicia", "Entretener con historias inventadas"],
                answer: 3,
                why: "La lista paulina es enseñar, redargüir, corregir e instruir en justicia; no incluye entretener con invenciones.",
              },
            ],
          },
          {
            id: "l1-2",
            title: "Antiguo y Nuevo Testamento",
            objective: "Conocer la estructura de la Biblia y cómo localizar un pasaje.",
            activation: v(
              "Si te dieran un mapa de una ciudad enorme, ¿cómo encontrarías una casa? La Biblia tiene un «mapa»: capítulos y versículos que nos ayudan a llegar al lugar correcto.",
              "Alguien te dice: «lee Juan 3:16». ¿Sabes cómo encontrarlo? Hoy aprenderás a moverte por la Biblia como quien sabe leer un mapa.",
              "La alfabetización bíblica básica —estructura canonica y localización de pasajes— es prerrequisito para cualquier estudio serio de las Escrituras."
            ),
            passage: {
              ref: "Lucas 24:27",
              text: "Y comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían.",
            },
            explanation: v(
              "La Biblia tiene dos grandes partes: el Antiguo Testamento, escrito antes de la llegada de Jesús, y el Nuevo Testamento, que habla de Jesús y de la iglesia. Cada libro se divide en capítulos, y cada capítulo en versículos.",
              "El Antiguo Testamento recoge la historia y la ley de Israel antes de Cristo; el Nuevo Testamento presenta la vida de Jesús, la iglesia primitiva y las cartas. Juntos cuentan una sola historia de salvación.",
              "El canon bíblico no es una colección arbitraria: el NT cita y se apoya en el VT (como en Lucas 24:27), mostrando una revelación progresiva y coherente de un mismo autor divino."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena los acontecimientos",
                prompt: "Ordena del 1 al 4 según la historia bíblica:",
                items: ["Creación del mundo", "Vida, muerte y resurrección de Jesús", "Pacto con Abraham", "Cartas a las iglesias del Nuevo Testamento"],
                answer: [0, 2, 1, 3],
              },
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada parte con su descripción:",
                pairs: [
                  { left: "Antiguo Testamento", right: "Historia de Israel antes de Cristo" },
                  { left: "Nuevo Testamento", right: "Vida de Jesús y la iglesia primitiva" },
                  { left: "Capítulo", right: "División grande de un libro" },
                  { left: "Versículo", right: "División pequeña dentro del capítulo" },
                ],
              },
            ],
            reflection: v(
              "Escribe con tus dedos cómo llegarías al libro de Juan en tu Biblia.",
              "¿Por qué crees que Dios quiso guardar su Palabra en muchos libros y no en uno solo?",
              "¿Cómo cambia tu lectura bíblica cuando entiendes el contexto histórico del pasaje?"
            ),
            evaluation: [
              {
                q: "¿Cuántos grandes partes tiene la Biblia?",
                options: ["Una", "Dos: Antiguo y Nuevo Testamento", "Tres", "Cuatro"],
                answer: 1,
                why: "La Biblia se divide en Antiguo Testamento (antes de Jesús) y Nuevo Testamento (Jesús y la iglesia).",
              },
              {
                q: "Si quieres leer Juan 3:16, ¿qué debes localizar primero?",
                options: ["El versículo, luego el capítulo, luego el libro", "El libro Juan, luego el capítulo 3, luego el versículo 16", "Solo el nombre del libro"],
                answer: 1,
                why: "La referencia se lee de lo grande a lo pequeño: libro, capítulo y versículo.",
              },
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Dios y la creación",
        icon: "globe",
        summary: "Dios como creador, la creación del ser humano y la relación de Dios con la humanidad.",
        lessons: [
          {
            id: "l2-1",
            title: "Dios, el creador",
            objective: "Reconocer a Dios como creador de todo lo que existe.",
            activation: v(
              "Mira a tu alrededor: las estrellas, los animales, las flores, tú mismo. ¿Quién hizo todo esto? La Biblia contesta desde su primera página.",
              "Antes de cualquier debate sobre el origen del universo, la Biblia afirma algo con claridad: hay un Creador. ¿Qué implica eso para nosotros?",
              "La doctrina de la creación no es un dato aislado: establece la dependencia de toda la realidad creada y la dignidad del ser humano como obra de Dios."
            ),
            passage: {
              ref: "Génesis 1:1",
              text: "En el principio creó Dios los cielos y la tierra.",
            },
            explanation: v(
              "Dios creó todo: el mar, los animales, las plantas, las estrellas y a las personas. No salió de la nada; todo lo que existe depende de él.",
              "La Biblia no comienza preguntando si Dios existe, sino afirmando que él creó todo. Nada de lo creado es accidental: todo depende de su poder y bondad.",
              "Génesis 1:1 establece el monoteísmo y la trascendencia de Dios: él está antes y por encima de toda la creación, y esta le está sujeta."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Según Génesis 1:1, ¿quién creó los cielos y la tierra?",
                options: ["Los ángeles", "Dios", "Los hombres antiguos", "Nadie: siempre existieron"],
                answer: 1,
                feedback: "La Biblia es clara: en el principio, Dios creó. Todo lo que existe tiene su origen en él.",
              },
              {
                type: "fill",
                title: "Completa la frase",
                sentences: [
                  { text: "En el principio ______ los cielos y la tierra.", bank: ["creó Dios", "hicieron los ángeles", "aparecieron solos"], answer: 0 },
                  { text: "Todo lo que existe ______ de Dios.", bank: ["depende", "no depende", "se oculta"], answer: 0 },
                ],
              },
            ],
            reflection: v(
              "Nombra tres cosas bonitas que hayas visto hoy y agradece a Dios por ellas.",
              "Si Dios creó todo, ¿cómo influye eso en cómo cuidamos la naturaleza y a las personas?",
              "¿Cómo se relaciona la soberanía del Creador con tu ansiedad por el control de las circunstancias?"
            ),
            evaluation: [
              {
                q: "¿Qué enseña Génesis 1:1?",
                options: ["El universo surgió por accidente", "Dios creó los cielos y la tierra", "La tierra siempre existió"],
                answer: 1,
                why: "El versículo inicial de la Biblia atribuye la creación de todo a Dios.",
              },
              {
                q: "Si Dios es el creador, entonces tú eres:",
                options: ["Producto del azar", "Creación de Dios con propósito", "Igual que él"],
                answer: 1,
                why: "El ser humano fue creado por Dios, no por casualidad, y eso le da valor y propósito.",
              },
            ],
          },
          {
            id: "l2-2",
            title: "El ser humano, imagen de Dios",
            objective: "Comprender que el ser humano fue creado a imagen de Dios.",
            activation: v(
              "Todos los niños de tu salón son especiales, pero tú también lo eres de una forma única. La Biblia dice algo aún más grande sobre las personas.",
              "Hay muchas ideas sobre el valor de las personas: fama, dinero, apariencia. La Biblia da otra respuesta. ¿Cuál?",
              "La imagen Dei es la base de la dignidad humana: define el valor de cada persona con independencia de logros, origen o condición."
            ),
            passage: {
              ref: "Génesis 1:27",
              text: "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.",
            },
            explanation: v(
              "Dios creó a las personas a su imagen. Eso significa que cada persona es valiosa, especial y digno de respeto, porque refleja a su Creador.",
              "«Imagen de Dios» no describe el cuerpo físico, sino las capacidades morales, relacionales y de raciocinio que reflejan al Creador. Por eso toda vida humana tiene dignidad infinita.",
              "La imago Dei iguala a los seres humanos ante Dios: rico o pobre, sano o enfermo, todos reflejan al Creador y merecen respeto y cuidado."
            ),
            activities: [
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Las personas fueron creadas a imagen de Dios.", answer: true, ref: "Génesis 1:27" },
                  { text: "Según la Biblia, solo algunas personas tienen valor.", answer: false, ref: "Génesis 1:27" },
                  { text: "Dios creó varón y hembra a su imagen.", answer: true, ref: "Génesis 1:27" },
                ],
              },
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada idea con lo que enseña la Biblia:",
                pairs: [
                  { left: "Imagen de Dios", right: "Cada persona tiene dignidad" },
                  { left: "El Creador", right: "Dios, de quien todo depende" },
                  { left: "El valor de las personas", right: "No depende del dinero ni de la fama" },
                ],
              },
            ],
            reflection: v(
              "Dile a alguien de tu familia hoy: «tú eres valioso porque Dios te hizo a su imagen».",
              "¿Cómo tratarías distinto a alguien si recordaras que también él es imagen de Dios?",
              "¿Dónde ves en tu entorno personas tratadas como si no tuvieran valor? ¿Cómo respondería un cristiano a eso?"
            ),
            evaluation: [
              {
                q: "¿Qué significa ser creados a imagen de Dios?",
                options: ["Que tenemos alas", "Que cada persona tiene valor y refleja a su Creador", "Que somos dioses"],
                answer: 1,
                why: "La imagen de Dios no nos hace divinos, sino que nos da dignidad y nos asemeja al Creador en capacidades y valor.",
              },
              {
                q: "Según Génesis 1:27, ¿a quién creó Dios a su imagen?",
                options: ["Solo a los reyes", "Al varón y a la hembra", "A los ángeles únicamente"],
                answer: 1,
                why: "El texto incluye a toda la humanidad, hombres y mujeres, en la imagen de Dios.",
              },
            ],
          },
        ],
      },
      {
        id: "m3",
        title: "El ser humano y el pecado",
        icon: "alert",
        summary: "La creación, la desobediencia, el significado del pecado y la necesidad de reconciliación.",
        lessons: [
          {
            id: "l3-1",
            title: "La caída: cuando desobedecimos",
            objective: "Entender qué pasó en el jardín y por qué el pecado entró al mundo.",
            activation: v(
              "¿Alguna vez rompiste una regla sabiendo que no debías? Todos lo hemos hecho. La Biblia cuenta cómo comenzó ese problema en la historia humana.",
              "Adán y Eva tenían todo en el jardín, menos una instrucción. ¿Qué hicieron con ella? Y más importante: ¿qué enseña eso sobre nosotros?",
              "El relato de Génesis 3 no es una fábola: describe el origen del pecado humano y sus consecuencias existenciales, relacionales y cósmicas."
            ),
            passage: {
              ref: "Génesis 3:6-7",
              text: "Y vio la mujer que el árbol era bueno para comer, y que era agradable a los ojos, y árbol deseable para adquirir sabiduría; y tomó de su fruto, y comió; y dio también a su marido, el cual comió con ella. Fue entonces conocido por ambos que estaban desnudos.",
            },
            explanation: v(
              "Dios había dicho que no comieran de un árbol. Pero Adán y Eva desobedecieron. Esa desobediencia se llama pecado, y trajo vergüenza, miedo y separación de Dios.",
              "La desobediencia no fue un accidente: fue decisión de confiar en el propio criterio en lugar del de Dios. Ese mismo patrón se repite en cada pecado humano.",
              "El pecado en las Escrituras es ruptura de relación con Dios que manifiesta desobediencia, idolatría del yo y corrupción de la relación entre las personas y con la creación."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena el relato",
                prompt: "Ordena del 1 al 4 lo ocurrido en Génesis 3:",
                items: [
                  "Dios da la instrucción de no comer del árbol",
                  "La serpiente tienta a Eva diciendo que no morirán",
                  "Eva toma del fruto y come, y da a Adán",
                  "Se dan cuenta de que están desnudos y se esconden de Dios",
                ],
                answer: [0, 1, 2, 3],
              },
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "¿Cuál fue el problema central de Adán y Eva?",
                options: [
                  "Comieron fruta con hambre",
                  "Desobedecieron a Dios confiando en su propio criterio",
                  "No sabían qué hacer",
                  "Dios les puso una trampa",
                ],
                answer: 1,
                feedback: "El problema no fue el fruto en sí, sino la decisión de desobedecer a Dios y decidir por sí mismos qué era bueno y malo.",
              },
            ],
            reflection: v(
              "¿Qué sientes cuando desobedeces a tus papás o a Dios? Eso es un poquito de lo que sintieron Adán y Eva.",
              "¿En qué áreas de tu vida tiendes a decidir «a mi manera» en lugar de buscar la de Dios?",
              "¿Cómo cambia tu vida cotidiana al reconocer que el problema del pecado es de todos, incluido tú?"
            ),
            evaluation: [
              {
                q: "¿Qué hizo Adán y Eva que trajo el pecado al mundo?",
                options: ["Obedecieron a Dios", "Desobedecieron la instrucción de Dios", "Trabajaron mucho en el jardín"],
                answer: 1,
                why: "El pecado aparece como desobediencia deliberada a la instrucción clara de Dios.",
              },
              {
                q: "¿Cuáles fueron consecuencias de la desobediencia?",
                options: ["Ninguna, todo siguió igual", "Vergüenza, miedo y separación de Dios", "Más amistad con Dios"],
                answer: 1,
                why: "Tras la caída aparecen la vergüenza, el miedo y la ruptura de la comunión con Dios.",
              },
            ],
          },
          {
            id: "l3-2",
            title: "¿Qué es el pecado?",
            objective: "Definir el pecado y entender la necesidad de reconciliación con Dios.",
            activation: v(
              "Si te alejas mucho de tu casa, cada vez te cuesta más llegar. El pecado nos aleja de Dios. Pero la buena noticia es que Dios no se queda quieto.",
              "Muchas personas piensan que el pecado es solo «hacer cosas malas». La Biblia lo ve más profundo. ¿Qué es realmente?",
              "La reflexión clásica sobre el pecado (hartamiento, pecado personal, naturaleza pecaminosa) exige precisión doctrinal para no trivializar ni dramatizar la condición humana."
            ),
            passage: {
              ref: "Romanos 3:23",
              text: "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.",
            },
            explanation: v(
              "El pecado es no hacer lo que Dios dice y hacer lo que él prohíbe. Todos lo hemos hecho: somos pecadores por naturaleza y por elección. Por eso necesitamos a Dios.",
              "Pablo es universal: «todos pecaron». El pecado es desobediencia a Dios y falla de su gloria; nos coloca en necesidad de un Salvador que no dependa de nuestros méritos.",
              "Romanos 3:23 sintetiza el diagnóstico paulino: pecado universal, incapacidad de glorificar a Dios por mérito propio y necesidad justificante de gracia."
            ),
            activities: [
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Según la Biblia, todos han pecado.", answer: true, ref: "Romanos 3:23" },
                  { text: "El pecado es simplemente equivocarse de número en la cuenta.", answer: false, ref: "Romanos 3:23" },
                  { text: "El pecado nos separa de Dios.", answer: true, ref: "Isaías 59:2" },
                ],
              },
              {
                type: "fill",
                title: "Completa la frase",
                sentences: [
                  { text: "Por cuanto ______ pecaron, y están destituidos de la gloria de Dios.", bank: ["todos", "algunos", "nadie"], answer: 0 },
                  { text: "El pecado nos ______ de Dios.", bank: ["aleja", "acerca", "no afecta"], answer: 0 },
                ],
              },
            ],
            reflection: v(
              "¿Por qué es importante saber que todos necesitamos a Dios?",
              "¿Cómo ves el pecado en las noticias de cada día? ¿Y en tu propia vida?",
              "Reconocer la universalidad del pecado ¿te lleva a juzgar a otros o a orar por ellos?"
            ),
            evaluation: [
              {
                q: "¿Qué dice Romanos 3:23 sobre el pecado?",
                options: ["Solo los malos pecan", "Todos pecaron", "El pecado no importa"],
                answer: 1,
                why: "Pablo incluye a toda la humanidad: todos han pecado y necesitan la gloria de Dios.",
              },
              {
                q: "Si todos somos pecadores, ¿qué necesitamos?",
                options: ["Más esfuerzo humano", "La ayuda y el perdón de Dios", "Nada, estamos bien"],
                answer: 1,
                why: "Ningún esfuerzo humano resuelve la separación de Dios: necesitamos su perdón.",
              },
            ],
          },
        ],
      },
      {
        id: "m4",
        title: "Jesús",
        icon: "cross",
        summary: "Nacimiento, enseñanzas, milagros, ministerio, muerte y resurrección de Jesús.",
        lessons: [
          {
            id: "l4-1",
            title: "Jesús, el centro de la historia",
            objective: "Conocer quién es Jesús según la Biblia y por qué es central para la fe.",
            activation: v(
              "La Biblia entera cuenta una historia que va creciendo hasta llegar a su personaje más importante: Jesús. ¿Por qué es tan especial?",
              "El mundo tiene muchos maestros, profetas y líderes. La Biblia presenta a Jesús como único. ¿En qué se diferencia?",
              "La persona de Cristo es el punto de encuentro entre el plan de Dios y la necesidad humana: toda teología bíblica converge en él."
            ),
            passage: {
              ref: "Juan 1:14",
              text: "Y aquel Verbo fue hecho carne, y habitó entre nosotros, y vimos su gloria, gloria como del unigénito del Padre, lleno de gracia y de verdad.",
            },
            explanation: v(
              "Jesús es Dios que vino a vivir entre nosotros. Nació de una virgen, vivió sin pecado, enseñó verdades de Dios e hizo milagros.",
              "La encarnación no es una disminución de Dios, sino su revelación máxima: el Verbo eterno se hizo carne para habitar entre la humanidad y revelar la gloria del Padre.",
              "Juan 1:14 sostiene la plena deidad y la plena humanidad de Cristo: el Verbo preexistente «habitó» (escató) entre nosotros, base de la salvación y del acceso a Dios."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Según Juan 1:14, ¿qué hizo el Verbo?",
                options: [
                  "Se quedó en el cielo sin acercarse a nosotros",
                  "Se hizo carne y habitó entre nosotros",
                  "Dejó de ser Dios",
                  "Solo envió un mensaje escrito",
                ],
                answer: 1,
                feedback: "El Verbo —Jesús— se hizo carne y habitó entre nosotros: es Dios con nosotros, en persona.",
              },
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada título de Jesús con su significado:",
                pairs: [
                  { left: "El Verbo", right: "Dios revelado en persona" },
                  { left: "El Cordero de Dios", right: "Quien quita el pecado del mundo" },
                  { left: "El Hijo unigénito", right: "El amado enviado del Padre" },
                  { left: "El Camino", right: "Nadie viene al Padre sino por él" },
                ],
              },
            ],
            reflection: v(
              "Jesús dijo ser el camino a Dios. ¿Qué te dice eso?",
              "¿Cómo cambiaría tu semana si recordaras que Jesús es Dios con nosotros?",
              "¿Qué preguntas tienes sobre la identidad de Jesús? Anótalas y compártelas con tu instructor."
            ),
            evaluation: [
              {
                q: "¿Quién es Jesús según Juan 1:14?",
                options: ["Un profeta más", "El Verbo hecho carne, Dios entre nosotros", "Un buen maestro humano"],
                answer: 1,
                why: "Juan presenta a Jesús como el Verbo eterno que se hizo carne y reveló la gloria del Padre.",
              },
              {
                q: "¿Por qué es central Jesús para la fe cristiana?",
                options: ["Porque es el revelador de Dios y el Salvador del mundo", "Porque fue un personaje histórico más", "Porque sus enseñanzas son bonitas"],
                answer: 0,
                why: "Toda la Biblia apunta a Jesús como revelación de Dios y camino de salvación.",
              },
            ],
          },
          {
            id: "l4-2",
            title: "La cruz y la resurrección",
            objective: "Comprender lo ocurrido en la cruz y el significado de la resurrección.",
            activation: v(
              "En la Pascua celebramos dos cosas: Jesús murió y Jesús vive. Son las dos caras de la mayor noticia de la Biblia.",
              "La cruz parece una derrota. Para los discípulos, ese viernes fue el fin de todo. Pero Dios tenía otro plan. ¿Cuál?",
              "La crucifixión y la resurrección constituyen el centro histórico y teológico del evangelio: muerte sustitutiva, victoria sobre la muerte y fundamento de la esperanza."
            ),
            passage: {
              ref: "1 Corintios 15:3-4",
              text: "Porque primeramente recibí de lo que también os enseñé: que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras.",
            },
            explanation: v(
              "Jesús murió en la cruz cargando nuestro pecado. Pero no se quedó en la tumba: al tercer día resucitó. Por eso la cruz no es el final: es el lugar donde Dios nos salvó.",
              "Pablo resume el evangelio histórico: muerte por nuestros pecados y resurrección corporal al tercer día, ambos «conforme a las Escrituras», cumpliendo el plan revelado en el Antiguo Testamento.",
              "La resurrección certifica la identidad de Cristo, su victoria sobre la muerte y la eficacia de su obra: sin ella, la fe cristiana queda vacía (1 Corintios 15:17)."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena los acontecimientos",
                prompt: "Ordena del 1 al 4 la semana pasional:",
                items: [
                  "Jesús entra a Jerusalén",
                  "Jesús es crucificado",
                  "Jesús es sepultado",
                  "Jesús resucita al tercer día",
                ],
                answer: [0, 1, 2, 3],
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Cristo murió por nuestros pecados.", answer: true, ref: "1 Corintios 15:3" },
                  { text: "La resurrección fue solo un símbolo, no algo real.", answer: false, ref: "1 Corintios 15:4" },
                  { text: "La resurrección al tercer día es conforme a las Escrituras.", answer: true, ref: "1 Corintios 15:4" },
                ],
              },
            ],
            reflection: v(
              "¿Qué significa para ti que Jesús viva hoy?",
              "Si la cruz muestra el amor de Dios y la resurrección su poder, ¿cuál te habla más esta semana?",
              "Paulo dijo que la fe sería vana sin resurrección. ¿Por qué la resurrección es indispensable para el cristianismo?"
            ),
            evaluation: [
              {
                q: "¿Por qué murió Jesús según 1 Corintios 15:3?",
                options: ["Por error de la justicia romana", "Por nuestros pecados", "Porque quiso retirarse"],
                answer: 1,
                why: "Pablo enseña que la muerte de Cristo fue por nuestros pecados, en cumplimiento de las Escrituras.",
              },
              {
                q: "¿Qué pasó al tercer día?",
                options: ["Nada, siguió muerto", "Jesús resucitó", "Los discípulos olvidaron todo"],
                answer: 1,
                why: "La resurrección corporal de Jesús al tercer día es el corazón de la proclamación apostólica.",
              },
            ],
          },
        ],
      },
      {
        id: "m5",
        title: "El evangelio y la salvación",
        icon: "heart",
        summary: "El amor de Dios, la gracia, la fe, el arrepentimiento, el perdón, la cruz, la resurrección y la vida eterna.",
        lessons: [
          {
            id: "l5-1",
            title: "Juan 3:16, el corazón del evangelio",
            objective: "Explicar el mensaje central de Juan 3:16 con palabras propias.",
            activation: v(
              "Hay un versículo que resume toda la Biblia en una frase. Se lo aprenden los niños y lo meditan los abuelos. ¿Sabes cuál es?",
              "Si tuvieras que explicar el evangelio en un minuto, ¿qué dirías? Hay un versículo que lo hace con asombrosa claridad.",
              "Juan 3:16 es la síntesis del evangelio joánico: amor divino, acción sacrificial, fe como medio y vida eterna como promesa."
            ),
            passage: {
              ref: "Juan 3:16",
              text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.",
            },
            explanation: v(
              "Dios amó tanto al mundo que dio a su Hijo. Jesús vino porque el Padre lo envió por amor. Y todo el que cree en él tiene vida eterna: un regalo, no un sueldo.",
              "Desglosa el versículo: el amador es Dios; el objeto del amor, el mundo entero; la acción, dar al Hijo; el medio, la fe en él; el resultado, vida eterna en lugar de perdición.",
              "La economía joánica de la salvación en Juan 3:16 evita tanto el universalismo absoluto como el exclusivismo frío: la oferta es universal, la aplicación personal por fe."
            ),
            activities: [
              {
                type: "fill",
                title: "Completa Juan 3:16",
                sentences: [
                  { text: "Porque de tal manera amó ______ al mundo,", bank: ["Dios", "Jesús solo", "los hombres"], answer: 0 },
                  { text: "que ha dado a su ______ unigénito,", bank: ["Hijo", "libro", "iglesia"], answer: 0 },
                  { text: "para que todo aquel que en él ______ no se pierda,", bank: ["cree", "trabaja", "compra"], answer: 0 },
                  { text: "mas tenga ______ eterna.", bank: ["vida", "dinero", "fama"], answer: 0 },
                ],
              },
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Según Juan 3:16, ¿quién da la vida eterna?",
                options: [
                  "La iglesia a quien asiste mucho",
                  "Dios, a todo aquel que cree en su Hijo",
                  "Cada persona que se esfuerza lo suficiente",
                  "Los pastores a sus ovejas",
                ],
                answer: 1,
                feedback: "La vida eterna es regalo de Dios para todo aquel que cree en su Hijo; no se gana con esfuerzo propio.",
              },
              {
                type: "memory",
                title: "Juego de memoria",
                prompt: "Empareja cada palabra con su idea:",
                pairs: [
                  { left: "Amor de Dios", right: "El que da a su Hijo" },
                  { left: "Fe", right: "Confiar en Jesús" },
                  { left: "Vida eterna", right: "El regalo prometido" },
                  { left: "Perdición", right: "Lo que evitamos en Cristo" },
                ],
              },
            ],
            reflection: v(
              "Dibuja o escribe: «Dios me ama y me dio a Jesús».",
              "Si el evangelio es un regalo, ¿por qué a veces tratamos la fe como si fuera un trabajo para ganarla?",
              "¿Cómo explicarías Juan 3:16 a un amigo que nunca ha leído la Biblia, sin usar palabras difíciles?"
            ),
            evaluation: [
              {
                q: "¿Quién es el que ama en Juan 3:16?",
                options: ["Dios", "La iglesia", "Los profetas"],
                answer: 0,
                why: "El versículo comienza con el amor de Dios hacia el mundo.",
              },
              {
                q: "¿Qué debemos hacer para tener vida eterna según este versículo?",
                options: ["Comprar un regalo", "Creer en su Hijo", "Ser perfectos"],
                answer: 1,
                why: "La condición del versículo es sencilla: creer en el Hijo unigénito de Dios.",
              },
              {
                q: "La vida eterna es...",
                options: ["Un regalo de Dios", "Un premio por ser bueno", "Solo para pastores"],
                answer: 0,
                why: "Dios la «da»: es un regalo recibido por fe, no un salario ganado.",
              },
            ],
          },
          {
            id: "l5-2",
            title: "Gracia, fe y arrepentimiento",
            objective: "Entender los términos centrales del evangelio: gracia, fe y arrepentimiento.",
            activation: v(
              "Gracia significa algo que recibes sin merecerlo. Fe es confiar. Arrepentimiento es cambiar de dirección. Las tres palabras juntas cuentan la historia de la salvación.",
              "Estas tres palabras son el vocabulario mínimo del evangelio. Conocerlas cambia la forma en que entiendes a Dios y a ti mismo.",
              "Gracia, fe y arrepentimiento describen el acto salvífico desde perspectivas distintas: don divino, recepción humana y giro de la voluntad."
            ),
            passage: {
              ref: "Efesios 2:8-9",
              text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se glorie.",
            },
            explanation: v(
              "Gracia: Dios te salva sin que lo merezcas. Fe: confiar en Jesús. Arrepentimiento: dejar el pecado y volverse a Dios. Juntas cuentan cómo Dios nos rescata.",
              "La gracia es el fundamento de la salvación, la fe el medio receptor y el arrepentimiento el giro de vida que acompaña a la fe genuina. Ninguna obra humana suma al don.",
              "Efesios 2:8-9 excluye toda co-gloria humana en la justificación: la salvación es monergismo de gracia recibida por fe, excluyendo el mérito y excluyendo también el orgullo."
            ),
            activities: [
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada palabra con su significado:",
                pairs: [
                  { left: "Gracia", right: "Un regalo de Dios que no merecemos" },
                  { left: "Fe", right: "Confiar y apoyarse en Jesús" },
                  { left: "Arrepentimiento", right: "Cambiar de dirección, dejar el pecado" },
                  { left: "Obras", right: "No son la base de la salvación" },
                ],
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Somos salvos por gracia, mediante la fe.", answer: true, ref: "Efesios 2:8" },
                  { text: "Si hacemos suficientes obras, merecemos el cielo.", answer: false, ref: "Efesios 2:9" },
                  { text: "La salvación es don de Dios, no mérito humano.", answer: true, ref: "Efesios 2:8-9" },
                ],
              },
            ],
            reflection: v(
              "¿Qué sientes al saber que la salvación es un regalo?",
              "¿En qué parte de tu vida crees aún que debes «ganarte» el amor de Dios?",
              "El arrepentimiento como giro de vida: ¿qué dirección necesitas dejar y a dónde volverte hoy?"
            ),
            evaluation: [
              {
                q: "Según Efesios 2:8-9, ¿por qué somos salvos?",
                options: ["Por gracia, mediante la fe", "Por nuestras obras", "Por pertenecer a una iglesia"],
                answer: 0,
                why: "Pablo atribuye la salvación a la gracia de Dios recibida por fe, no a obras.",
              },
              {
                q: "¿Qué significa arrepentimiento?",
                options: ["Sentir tristeza nada más", "Cambiar de dirección, dejar el pecado y volverse a Dios", "Esconder los errores"],
                answer: 1,
                why: "El arrepentimiento bíblico es un giro real de vida hacia Dios, no solo emoción.",
              },
            ],
          },
        ],
      },
      {
        id: "m6",
        title: "Vida nueva",
        icon: "sprout",
        summary: "Oración, lectura bíblica, iglesia, amor al prójimo, obediencia, adoración y servicio.",
        lessons: [
          {
            id: "l6-1",
            title: "Pasar de la fe a la vida diaria",
            objective: "Conocer los pilares de la vida cristiana práctica.",
            activation: v(
              "Cuando alguien se hace amigo de Jesús, su vida empieza a cambiar poquito a poquito. ¿Cómo se ve ese cambio en un día normal?",
              "Aceptar el evangelio no es el final del camino: es el comienzo de una vida nueva con hábitos que la sostienen.",
              "La sanctificación progresiva se nutre de medios de gracia: oración, Escritura, comunidad, obediencia y servicio."
            ),
            passage: {
              ref: "Colosenses 3:16",
              text: "Habite entre vosotros ricamente la palabra de Cristo; enseñándoos y amonestándoos unos a otros en toda sabiduría.",
            },
            explanation: v(
              "La vida cristiana se nutre de la oración, leer la Biblia, ir a la iglesia, amar a los demás y obedecer a Jesús. Son como comidas que nos fortalecen cada día.",
              "La vida nueva se cultiva en comunidad: la Palabra habitando entre los creyentes, la oración, la obediencia práctica y el amor al prójimo como evidencia del discipulado.",
              "Colosenses 3:16 describe la instrucción mutua dentro del cuerpo: la Palabra de Cristo habita rica en la comunidad, no solo en el individuo aislado."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "¿Cuál de estos NO es un pilar de la vida cristiana según la lección?",
                options: [
                  "La oración",
                  "La lectura de la Biblia",
                  "Ignorar a los demás",
                  "El amor al prójimo",
                ],
                answer: 2,
                feedback: "La vida cristiana se nutre de la oración, la Escritura, la iglesia, el amor al prójimo y la obediencia; ignorar a los demás va en contra del evangelio.",
              },
              {
                type: "order",
                title: "Ordena la rutina espiritual",
                prompt: "Ordena del 1 al 4 un posible día con Dios:",
                items: [
                  "Ora por la mañana pidiendo guía",
                  "Lee un pasaje de la Biblia",
                  "Actúa con amor hacia alguien",
                  "Agradece a Dios antes de dormir",
                ],
                answer: [0, 1, 2, 3],
              },
            ],
            reflection: v(
              "¿Cuál de estos hábitos quieres empezar esta semana: orar, leer la Biblia o servir a alguien?",
              "¿Qué hábito espiritual has descuidado y cómo podrías retomarlo?",
              "La Palabra debe «habitar» rica entre nosotros: ¿cómo se ve eso en tu familia o grupo?"
            ),
            evaluation: [
              {
                q: "¿Cuáles son pilares de la vida cristiana práctica?",
                options: [
                  "Oración, Biblia, iglesia, amor y obediencia",
                  "Solo asistir a cultos",
                  "Dinero y éxito",
                ],
                answer: 0,
                why: "La vida nueva se cultiva con oración, Escritura, comunidad, amor al prójimo y obediencia a Jesús.",
              },
              {
                q: "Según Colosenses 3:16, ¿qué debe hacer la palabra de Cristo?",
                options: ["Habitar ricamente entre nosotros", "Quedarse solo en la iglesia", "No leerse nunca"],
                answer: 0,
                why: "Pablo exige que la Palabra habite ricamente en la comunidad, enseñando y amonestando unos a otros.",
              },
            ],
          },
          {
            id: "l6-2",
            title: "Compartir lo que aprendiste",
            objective: "Animarse a compartir el evangelio con naturalidad y amor.",
            activation: v(
              "Si descubres un lugar bonito, ¿no quieres llevarte a un amigo? El evangelio es la mejor noticia: también queremos compartirla.",
              "Compartir el evangelio no es discutir, sino comunicar con claridad y amor lo que Dios ha hecho. Puedes empezar con tu propia historia.",
              "El evangelismo personal exige claridad doctrinal, sensibilidad relacional y confianza en la obra del Espíritu, no en técnicas de persuasión."
            ),
            passage: {
              ref: "Romanos 1:16",
              text: "Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree.",
            },
            explanation: v(
              "El evangelio es el poder de Dios para salvar. Compartirlo no es avergonzarse: es contar lo que Dios hizo por nosotros en Jesús.",
              "Pablo no se avergüenza porque el evangelio no depende de su elocuencia: es poder de Dios. Nuestra tarea es comunicarlo con claridad; la conversión es obra de Dios.",
              "La valentía misionera de Pablo descansa en la eficacia del evangelio, no en la aprobación humana: la iglesia primitiva creció por testimonio y señales del Reino."
            ),
            activities: [
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "El evangelio es poder de Dios para salvación.", answer: true, ref: "Romanos 1:16" },
                  { text: "Compartir el evangelio es avergonzarse de Jesús.", answer: false, ref: "Romanos 1:16" },
                  { text: "La salvación depende de tan buenas palabras del que habla.", answer: false, ref: "1 Corintios 2:4-5" },
                ],
              },
              {
                type: "fill",
                title: "Completa la frase",
                sentences: [
                  { text: "No me ______ del evangelio,", bank: ["avergüenzo", "hablo", "olvido"], answer: 0 },
                  { text: "porque es ______ de Dios para salvación,", bank: ["poder", "dinero", "ruido"], answer: 0 },
                ],
              },
            ],
            reflection: v(
              "Escribe en una oración qué ha hecho Dios por ti, para contárselo a alguien.",
              "¿A quién puedes invitar esta semana a conocer a Jesús o a tu iglesia?",
              "¿Qué miedo te impide compartir el evangelio y cómo se enfrenta con Romanos 1:16?"
            ),
            evaluation: [
              {
                q: "¿Cómo describe Pablo al evangelio?",
                options: ["Como vergüenza", "Como poder de Dios para salvación", "Como una idea bonita"],
                answer: 1,
                why: "Pablo afirma que el evangelio es poder de Dios para salvación de todo el que cree.",
              },
              {
                q: "¿Por qué podemos compartir el evangelio sin temor?",
                options: ["Porque convencemos con palabras perfectas", "Porque el poder está en el evangelio, no en nosotros", "Porque todos aceptarán"],
                answer: 1,
                why: "La eficacia del evangelio proviene de Dios; nuestro papel es comunicarlo con fidelidad y amor.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "f2",
    name: "Fase 2 · Intermedio",
    slogan: "COMPRENDER Y VIVIR",
    tagline: "Profundiza en los fundamentos de la fe, conecta conceptos con pasajes y promueve aplicación.",
    audience: "Participantes que completaron la Fase 1 o que ya conocen los fundamentos del evangelio.",
    result:
      "Explicar relaciones entre conceptos, interpretar una lección en su contexto básico y reconocer aplicaciones apropiadas, sabiendo cuándo consultar a los responsables de enseñanza.",
    modules: [
      {
        id: "m7",
        title: "Dios: atributos y Trinidad",
        icon: "crown",
        summary: "Santidad, justicia, amor y fidelidad de Dios; la enseñanza bíblica sobre la Trinidad.",
        lessons: [
          {
            id: "l7-1",
            title: "Los atributos de Dios",
            objective: "Distinguir atributos bíblicos de Dios y relacionarlos entre sí.",
            activation: v(
              "¿Alguna vez has intentado describir a alguien con una sola palabra? Con Dios no alcanza: la Biblia usa muchas para mostrar su grandeza.",
              "Atributos como santidad, justicia, amor y fidelidad no compiten: se sostienen mutuamente. ¿Cómo se relacionan?",
              "La doctrina clásica distingue atributos comunicables e incomunicables; la tensión entre santidad y amor se resuelve en la unidad del ser divino."
            ),
            passage: {
              ref: "Éxodo 34:6-7",
              text: "Jehová, Jehová, Dios misericordioso y clemente, tardo para la ira, y grande en misericordia y fidelidad; que guarda el beneficio a mil generaciones.",
            },
            explanation: v(
              "Dios es santo (perfecto y aparte), justo (hace lo correcto), amor (se preocupa por nosotros) y fiel (cumple lo que promete). Todos a la vez, sin contradicción.",
              "La autodeclaración de Yahwé en el Sinaí combina misericordia, clemencia, paciencia, grandeza y fidelidad: la justicia no limita el amor, lo fundamenta.",
              "La revelación de Éxodo 34:6-7 se convierte en el AT en el «nombre» recurrente de Dios, citado y amplificado proféticamente como base del pacto."
            ),
            activities: [
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona el atributo con su descripción:",
                pairs: [
                  { left: "Santidad", right: "Dios es perfecto y aparte del mal" },
                  { left: "Justicia", right: "Dios hace siempre lo correcto" },
                  { left: "Amor", right: "Dios se dona bondadosamente" },
                  { left: "Fidelidad", right: "Dios cumple su palabra" },
                  { left: "Misericordia", right: "Dios se compadece del que sufre" },
                ],
              },
              {
                type: "choice",
                title: "Detecta la idea incorrecta",
                prompt: "¿Cuál de estas frases NO corresponde a la enseñanza bíblica sobre Dios?",
                options: [
                  "Dios es santo y a la vez misericordioso",
                  "La justicia de Dios contradice su amor",
                  "Dios es fiel a su pacto",
                  "Dios es paciente y tardo para la ira",
                ],
                answer: 1,
                feedback:
                  "La santidad y el amor de Dios no se excluyen: en Éxodo 34:6-7 aparecen juntos. La justicia fundamenta su amor, no lo contradice.",
              },
            ],
            reflection: v(
              "¿Qué atributo de Dios te da más tranquilidad y por qué?",
              "¿Cómo te consuela saber que Dios es fiel cuando tú no lo eres?",
              "¿Dónde tu círculo social muestra una imagen distorsionada de Dios?"
            ),
            evaluation: [
              {
                q: "¿Cómo se relacionan santidad y amor en Dios?",
                options: ["Se excluyen mutuamente", "Conviven sin contradicción: el amor es santo", "Solo vale la santidad"],
                answer: 1,
                why: "Éxodo 34:6-7 los declara juntos: el amor de Dios es perfecto, nunca complaciente ni injusto.",
              },
              {
                q: "¿Qué significa «tardo para la ira»?",
                options: ["Dios se enfada siempre", "Dios es paciente antes de juzgar", "Dios no juzga nunca"],
                answer: 1,
                why: "«Tardo para la ira» describe la paciencia de Dios, que da oportunidad de arrepentimiento.",
              },
            ],
          },
        ],
      },
      {
        id: "m8",
        title: "Persona y obra de Cristo",
        icon: "cross",
        summary: "Humanidad y deidad de Jesús, encarnación, ministerio, muerte, resurrección y señorío.",
        lessons: [
          {
            id: "l8-1",
            title: "Verdadero Dios y verdadero hombre",
            objective: "Explicar por qué la Biblia atribuye a Jesús plena deidad y plena humanidad.",
            activation: v(
              "Jesús cansaba, tenía hambre y lloraba. También perdonó pecados y calmó la tormenta. ¿Cómo puede ser las dos cosas?",
              "La persona de Cristo es el misterio central de la fe: no es «medio Dios y medio hombre», sino todo en cada naturaleza.",
              "Las definiciones calcedonenses (451 d.C.) articulan lo que el NT afirma: dos naturalezas, una persona, sin confusión ni separación."
            ),
            passage: {
              ref: "Colosenses 2:9",
              text: "Porque en él habita toda la plenitud de la divinidad corporalmente.",
            },
            explanation: v(
              "En Jesús habita toda la divinidad, y él también es completamente humano. Por eso puede ser nuestro mediador: se parece a Dios y se parece a nosotros.",
              "La plenitud de la deidad habita «corporalmente» en Cristo: no por participación parcial, sino en totalidad; y su humanidad verdadera lo hace apto como sumo sacerdote.",
              "Colosenses 2:9 y Hebreos 4:15 sostienen la doble naturaleza: plenitud divina y humanidad sin pecado, base de la salvación y de la mediación."
            ),
            activities: [
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "En Cristo habita toda la plenitud de la divinidad.", answer: true, ref: "Colosenses 2:9" },
                  { text: "Jesús solo parecía ser humano, pero no lo era.", answer: false, ref: "Hebreos 2:17" },
                  { text: "Jesús fue tentado en todo, como nosotros, pero sin pecado.", answer: true, ref: "Hebreos 4:15" },
                ],
              },
              {
                type: "choice",
                title: "Detecta la idea incorrecta",
                prompt: "¿Cuál afirmación sobre Cristo NO es bíblica?",
                options: [
                  "Jesús es verdadero Dios y verdadero hombre",
                  "Jesús pecó como nosotros para darnos ejemplo",
                  "Jesús resucitó corporalmente",
                  "Jesús es el mediador entre Dios y los hombres",
                ],
                answer: 1,
                feedback: "Jesús fue tentado en todo «como nosotros, pero sin pecado» (Hebreos 4:15); su humanidad es real pero íntegra.",
              },
            ],
            reflection: v(
              "¿Qué consuela saber que Jesús entiende tu sufrimiento?",
              "¿Por qué la Biblia insiste en que Jesús es Dios y hombre al mismo tiempo?",
              "¿Cómo cambia tu oración saber que hay un mediador que te conoce?"
            ),
            evaluation: [
              {
                q: "Según Colosenses 2:9, ¿qué habita en Cristo?",
                options: ["Una parte de la divinidad", "Toda la plenitud de la divinidad", "Solo sabiduría humana"],
                answer: 1,
                why: "Pablo afirma la plenitud de la deidad habitando corporalmente en Cristo.",
              },
              {
                q: "¿Por qué es importante que Jesús sea también verdadero hombre?",
                options: ["Para poder representarnos ante Dios y morir en nuestro lugar", "Para que nadie lo tome en serio", "No es importante"],
                answer: 0,
                why: "Sin humanidad verdadera, Jesús no podría representar y redimir a la humanidad.",
              },
            ],
          },
        ],
      },
      {
        id: "m9",
        title: "Salvación",
        icon: "flame",
        summary: "Gracia, fe, arrepentimiento, perdón, justificación, regeneración, adopción y santificación.",
        lessons: [
          {
            id: "l9-1",
            title: "El camino completo de la salvación",
            objective: "Relacionar los conceptos de la obra salvadora de Dios en orden coherente.",
            activation: v(
              "La salvación es como un regalo que Dios envía: él lo da, tú lo recibes, y tu vida empieza a cambiar. Cada palabra tiene su lugar.",
              "Justificación, regeneración, adopción y santificación no son sinónimos: describen momentos y aspectos de una sola obra de Dios.",
              "La ordenación lógica de la ordo salutis evita sincretismos: la regeneración precede a la fe, la justificación es forensic, la adopción filial y la santificación progresiva."
            ),
            passage: {
              ref: "Tito 3:5",
              text: "No por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia, nos salvó por el lavamiento de la regeneración y por la renovación del Espíritu Santo.",
            },
            explanation: v(
              "Dios nos salva por su misericordia, no por nuestras obras. Él nos perdona (justificación), nos hace nuevos (regeneración), nos hace sus hijos (adopción) y nos cambia cada día (santificación).",
              "Tito 3:5-6 resume la soteriología paulina: iniciativa divina, medio instrumental del Espíritu y exclusión del mérito humano en la regeneración y la justificación.",
              "La justificación forensic y la regeneración renovadora ocurren en unidad: Dios declara justo y hace justo, sin que la ley se relaxe ni la gracia se trivialice."
            ),
            activities: [
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada concepto con su significado:",
                pairs: [
                  { left: "Justificación", right: "Dios te declara justo por medio de Cristo" },
                  { left: "Regeneración", right: "Dios te hace una nueva persona por su Espíritu" },
                  { left: "Adopción", right: "Dios te recibe como hijo o hija" },
                  { left: "Santificación", right: "El proceso de crecer en santidad" },
                  { left: "Perdón", right: "Dios cancela la deuda del pecado" },
                ],
              },
              {
                type: "choice",
                title: "Detecta la idea incorrecta",
                prompt: "Según Tito 3:5, ¿cuál es la base de nuestra salvación?",
                options: [
                  "Nuestras obras de justicia",
                  "La misericordia de Dios",
                  "El esfuerzo religioso constante",
                  "La pertenencia a una familia cristiana",
                ],
                answer: 1,
                feedback: "Pablo excluye el mérito humano («no por obras») y atribuye la salvación a la misericordia de Dios.",
              },
            ],
            reflection: v(
              "¿Qué concepto te resulta más difícil de entender? Pídele ayuda a tu instructor.",
              "Si la salvación es por misericordia, ¿cómo influye eso en cómo tratas a otros?",
              "¿En cuál de estas etapas de la salvación (justificación, adopción, santificación) notas hoy la obra de Dios?"
            ),
            evaluation: [
              {
                q: "¿Qué enseña Tito 3:5 sobre la base de la salvación?",
                options: ["Nuestras obras justas", "La misericordia de Dios", "Nuestros sentimientos"],
                answer: 1,
                why: "Pablo excluye las obras humanas y funda la salvación en la misericordia de Dios.",
              },
              {
                q: "¿Qué significa justificación?",
                options: ["Hacerte más bueno poco a poco", "Ser declarado justo ante Dios por medio de Cristo", "Sentirte perdonado"],
                answer: 1,
                why: "La justificación es un acto judicial de Dios: nos declara justos por la obra de Cristo.",
              },
            ],
          },
        ],
      },
      {
        id: "m10",
        title: "Espíritu Santo",
        icon: "wind",
        summary: "Su persona y obra, convicción, crecimiento cristiano, fruto y dones.",
        lessons: [
          {
            id: "l10-1",
            title: "El Espíritu que vive en nosotros",
            objective: "Reconocer al Espíritu Santo como persona divina que obra en el creyente.",
            activation: v(
              "El Espíritu Santo no es una fuerza sin nombre: la Biblia lo presenta como persona que consuela, guía y transforma.",
              "¿Cómo reconocer la obra del Espíritu en la vida cotidiana? Pablo da criterios claros: fruto, no excitación momentánea.",
              "La pneumatología neotestamentaria presenta al Espíritu como tercera persona trinitaria, con funciones de convicción, regeneración, sellamiento y dotación."
            ),
            passage: {
              ref: "Gálatas 5:22-23",
              text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.",
            },
            explanation: v(
              "El Espíritu Santo produce en nosotros un fruto: amor, gozo, paz y más. Ese fruto se ve en la vida diaria, no solo en momentos especiales.",
              "El fruto del Espíritu es la evidencia normativa del crecimiento cristiano: cualidades de carácter, no espectáculo, que se miden en relaciones reales.",
              "Gálatas 5:22-23 contrasta obras de la carne con fruto del Espíritu: la vida cristiana se juzga por el carácter producido, no por la intensidad emocional."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena el fruto",
                prompt: "Ordena del 1 al 4 el fruto del Espíritu según Gálatas 5:22:",
                items: ["Amor", "Gozo", "Paz", "Paciencia"],
                answer: [0, 1, 2, 3],
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "El fruto del Espíritu se demuestra en el carácter, no en emociones momentáneas.", answer: true, ref: "Gálatas 5:22" },
                  { text: "El Espíritu Santo es solo una fuerza sin persona.", answer: false, ref: "Hechos 5:3-4" },
                  { text: "Contra el fruto del Espíritu no hay ley.", answer: true, ref: "Gálatas 5:23" },
                ],
              },
            ],
            reflection: v(
              "¿Cuál de los frutos del Espíritu notas más en tu vida? ¿Cuál menos?",
              "¿Cómo puedes pedir hoy al Espíritu que cultive un fruto específico?",
              "¿Qué diferencias hay entre manifestaciones llamativas y el fruto constante del Espíritu?"
            ),
            evaluation: [
              {
                q: "¿Qué es el fruto del Espíritu según la Biblia?",
                options: ["Un show de poderes", "Un conjunto de cualidades de carácter como amor y paz", "Una lista de reglas"],
                answer: 1,
                why: "Pablo describe el fruto como cualidades de vida: amor, gozo, paz, paciencia y más.",
              },
              {
                q: "¿Cuál NO es fruto del Espíritu?",
                options: ["Paciencia", "Riqueza", "Bondad"],
                answer: 1,
                why: "La riqueza no aparece en la lista de Gálatas 5:22-23; el fruto describe carácter, no posesiones.",
              },
            ],
          },
        ],
      },
      {
        id: "m11",
        title: "Iglesia",
        icon: "users",
        summary: "Comunidad, propósito, servicio y misión; bautismo y Cena del Señor.",
        lessons: [
          {
            id: "l11-1",
            title: "¿Qué es la iglesia?",
            objective: "Entender la iglesia como comunidad del pueblo de Dios con propósito de adoración y misión.",
            activation: v(
              "La iglesia no es un edificio bonito: es un grupo de personas que siguen a Jesús juntas. ¿Cómo se ve eso en la práctica?",
              "La eclesiología bíblica distingue la iglesia universal de las iglesias locales, con estructura, ordinances y misión concreta.",
              "Mateo 16:18 y 18:17 muestran que Cristo edifica y disciplina a su iglesia local; su identidad es confesional y comunitaria."
            ),
            passage: {
              ref: "Mateo 16:18",
              text: "Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia, y las puertas del Hades no prevalecerán contra ella.",
            },
            explanation: v(
              "La iglesia es el grupo de personas que Dios junta para adorarlo, crecer y servir. Jesús prometió que ella seguirá firme, con él como fundamento.",
              "Cristo es el edificador y fundamento de su iglesia; la comunidad creyente local es llamada a enseñanza, comunión, bautismo, Cena y misión.",
              "La promesa de Mateo 16:18 asegura la invencibilidad de la iglesia frente al Hades, no la ausencia de persecución ni de disciplina interna."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Según Mateo 16:18, ¿quién edifica la iglesia?",
                options: ["Los pastores solos", "Jesús", "Los gobiernos", "Las tradiciones humanas"],
                answer: 1,
                feedback: "Jesús dijo: «sobre esta roca edificaré mi iglesia». Ella es su obra, no un proyecto puramente humano.",
              },
              {
                type: "match",
                title: "Une parejas",
                prompt: "Relaciona cada práctica de la iglesia con su propósito:",
                pairs: [
                  { left: "Bautismo", right: "Señal pública de identificación con Cristo" },
                  { left: "Cena del Señor", right: "Recordatorio de la muerte de Cristo" },
                  { left: "Enseñanza", right: "Formación en la Palabra" },
                  { left: "Comunión", right: "Vida compartida entre hermanos" },
                ],
              },
            ],
            reflection: v(
              "¿En qué sentido la iglesia ha sido importante en tu vida?",
              "¿Cómo vives la iglesia como comunidad, no solo como un lugar al que asistes?",
              "¿Qué responsabilidad personal tienes con la iglesia local a la que perteneces?"
            ),
            evaluation: [
              {
                q: "¿Quién edifica la iglesia según Mateo 16:18?",
                options: ["Jesús", "Los apóstoles solos", "El estado"],
                answer: 0,
                why: "Jesús declara que él edificará su iglesia sobre la confesión de Pedro.",
              },
              {
                q: "¿Cuál es la diferencia entre iglesia universal y local?",
                options: ["Ninguna", "La universal es todos los creyentes; la local es una congregación concreta", "La local no es iglesia"],
                answer: 1,
                why: "La Escritura reconoce todo el pueblo de Dios (universal) y también comunidades locales organizadas.",
              },
            ],
          },
        ],
      },
      {
        id: "m12",
        title: "Vida cristiana y discipulado",
        icon: "path",
        summary: "Oración, estudio bíblico, integridad, mayordomía, evangelismo y acompañamiento.",
        lessons: [
          {
            id: "l12-1",
            title: "Discípulos que hacen discípulos",
            objective: "Comprender el discipulado como camino de obediencia y acompañamiento mutuo.",
            activation: v(
              "Un discípulo es un aprendiz de Jesús que obedece lo que enseña. Y Jesús pidió que hagamos discípulos también.",
              "El discipulado cristiano no es información sola, sino obediencia comunitaria que se transmite intencionalmente.",
              "Mateo 28:19-20 y 2 Timoteo 2:2 muestran una cadena de transmisión: Cristo → apóstoles → hombres fieles → otros."
            ),
            passage: {
              ref: "2 Timoteo 2:2",
              text: "Y lo que de mí has oído por muchos testigos, eso mismo encomienda a hombres fieles, que también sean idóneos para enseñar a otros.",
            },
            explanation: v(
              "Discipular es aprender de Jesús y ayudar a otros a hacer lo mismo. Cada creyente puede acompañar a alguien más en el camino de la fe.",
              "El versículo describe una estrategia de multiplicación: lo aprendido debe confiarse a hombres fieles y capaces de enseñar, en cadena sucesiva.",
              "El discipulado maduro se mide por fidelidad y capacidad de enseñanza transmitida, no por popularidad o carisma personal."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena la cadena del discipulado",
                prompt: "Ordena del 1 al 4 la transmisión enseñada en 2 Timoteo 2:2:",
                items: [
                  "Pablo enseña a Timoteo",
                  "Timoteo escucha con muchos testigos",
                  "Timoteo encomienda a hombres fieles",
                  "Esos hombres enseñan a otros",
                ],
                answer: [0, 1, 2, 3],
              },
              {
                type: "choice",
                title: "Detecta la idea incorrecta",
                prompt: "¿Cuál NO corresponde al discipulado bíblico?",
                options: [
                  "Aprender de Jesús y obedecerle",
                  "Acompañar a otros en el camino de fe",
                  "Guardar lo aprendido solo para uno mismo",
                  "Enseñar a hombres fieles para que enseñen a otros",
                ],
                answer: 2,
                feedback: "El discipulado es multiplicación: lo recibido debe compartirse y encomendarse a otros fieles.",
              },
            ],
            reflection: v(
              "¿Quién te ha acompañado en tu fe? ¿A quién puedes acompañar tú?",
              "¿Qué área de obediencia a Jesús necesitas practicar esta semana?",
              "¿Cómo se vería tu iglesia si cada miembro tuviera a un discípulo con quien caminar?"
            ),
            evaluation: [
              {
                q: "¿Qué enseña 2 Timoteo 2:2 sobre la fe?",
                options: ["Debe guardarse en secreto", "Debe encomendarse a hombres fieles que enseñen a otros", "Solo Pablo puede enseñarla"],
                answer: 1,
                why: "Pablo describe una cadena de transmisión fiel: de Timoteo a hombres capaces de enseñar a otros.",
              },
              {
                q: "¿Qué es un discípulo según la lección?",
                options: ["Alguien que solo asiste a la iglesia", "Un aprendiz de Jesús que obedece y acompaña a otros", "Un experto en religión"],
                answer: 1,
                why: "El discipado combina aprendizaje, obediencia y acompañamiento intencional de otros.",
              },
            ],
          },
        ],
      },
      {
        id: "m13",
        title: "Panorama bíblico",
        icon: "map",
        summary: "Conexiones entre acontecimientos del Antiguo y Nuevo Testamento.",
        lessons: [
          {
            id: "l13-1",
            title: "Una sola gran historia",
            objective: "Conectar acontecimientos del Antiguo Testamento con su cumplimiento en Cristo.",
            activation: v(
              "La Biblia no es un montón de historias sueltas: es como un rompecabezas donde todo encaja alrededor de Jesús.",
              "La unidad del canon bíblico se revela en las citas apostólicas del AT: «como está escrito» se repite cientos de veces en el NT.",
              "La tipología y la cita apostólica muestran continuidad histórica y teológica entre pactos: Cristo es el cumplimiento del AT, no su anulación."
            ),
            passage: {
              ref: "Lucas 24:27",
              text: "Y comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían.",
            },
            explanation: v(
              "Desde el principio, la Biblia habla de Jesús. Los profetas anunciaron su venida, y el Nuevo Testamento muestra cómo todo se cumplió en él.",
              "Jesús mismo enseñó que todo el AT apuntaba a él: la ley, los profetas y los salmos tienen su centro en su persona y obra.",
              "La hermenéutica de Cristo en Lucas 24:27 establece el criterio de lectura cristiana del AT: interpretado a la luz de su cumplimiento messiánico."
            ),
            activities: [
              {
                type: "match",
                title: "Une el Antiguo con el Nuevo",
                prompt: "Relaciona cada elemento del AT con su enfoque en Cristo:",
                pairs: [
                  { left: "Cordero de la Pascua", right: "Cristo, el Cordero de Dios" },
                  { left: "Sacrificio en el templo", right: "El sacrificio único de Cristo" },
                  { left: "Promesa a Abraham", right: "Bendición para todas las naciones en Cristo" },
                  { left: "Profeta como Moisés", right: "Jesús, el profeta definitivo" },
                ],
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "El Antiguo Testamento habla de Jesús.", answer: true, ref: "Lucas 24:27" },
                  { text: "El Nuevo Testamento contradice por completo al Antiguo.", answer: false, ref: "Mateo 5:17" },
                  { text: "Jesús declaró que las Escrituras hablaban de él.", answer: true, ref: "Lucas 24:27" },
                ],
              },
            ],
            reflection: v(
              "¿Qué parte de la historia bíblica te gusta más? ¿Cómo apunta a Jesús?",
              "¿Cómo cambia tu lectura del Antiguo Testamento al buscar a Cristo en él?",
              "Elige un pasaje del AT y pregúntate: ¿qué dice de Dios, del pecado y del Salvador?"
            ),
            evaluation: [
              {
                q: "¿Cómo enseñó Jesús a leer el Antiguo Testamento?",
                options: ["Como un libro sin relación con él", "Como Escrituras que hablaban de él", "Como solo leyes ritualísticas"],
                answer: 1,
                why: "En Lucas 24:27 Jesús declara que toda la Escritura hablaba de él.",
              },
              {
                q: "¿Qué unifica el mensaje de toda la Biblia?",
                options: ["Las reglas de la iglesia", "El plan de Dios de salvación cumplido en Cristo", "Las tradiciones humanas"],
                answer: 1,
                why: "Tanto el AT como el NT narran el plan de Dios de redención centrado en Jesucristo.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "f3",
    name: "Fase 3 · Instructores",
    slogan: "ENSEÑAR Y ACOMPAÑAR",
    tagline: "Prepara a personas que apoyarán la fase inicial: planificación, facilitación y acompañamiento.",
    audience: "Participantes designados por la iglesia para enseñar y acompañar la Fase 1.",
    result:
      "Preparar y facilitar una lección inicial ante un instructor o grupo piloto, recibir retroalimentación y mejorar. La autorización para enseñar es decisión de la iglesia, no de un algoritmo.",
    modules: [
      {
        id: "m14",
        title: "Preparar una lección",
        icon: "clipboard",
        summary: "Objetivo, pasaje, explicación, actividad, preguntas y cierre.",
        lessons: [
          {
            id: "l14-1",
            title: "Las 8 partes de una lección",
            objective: "Dominar la estructura de 8 pasos para preparar cualquier lección inicial.",
            isPractice: true,
            activation: v(
              "Una buena lección no improvisa: tiene pasos claros. Hoy las conocerás y las practicarás.",
              "La estructura de 8 pasos garantiza que la lección tenga propósito, Biblia, práctica y aplicación, no solo buenos deseos.",
              "La arquitectura didáctica (objetivo → activación → texto → explicación → práctica → retroalimentación → reflexión → evaluación) asegura coherencia entre fin y medio."
            ),
            passage: {
              ref: "2 Timoteo 2:15",
              text: "Procura presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que maneja bien la palabra de verdad.",
            },
            explanation: v(
              "Cada lección tiene 8 pasos: objetivo, activación, Biblia, explicación, juego, retroalimentación, reflexión y evaluación. Prepararlos te da confianza y claridad.",
              "El «manejo correcto de la palabra de verdad» exige preparación: definir el objetivo, elegir el pasaje, explicar con fidelidad y verificar comprensión antes de avanzar.",
              "El obrero aprobado de 2 Timoteo 2:15 es el que maneja bien la Palabra: la fidelidad textual precede a la creatividad metodológica."
            ),
            activities: [
              {
                type: "order",
                title: "Ordena la estructura",
                prompt: "Ordena del 1 al 8 los pasos de una lección:",
                items: [
                  "Objetivo",
                  "Activación (pregunta o relato)",
                  "Lectura del pasaje bíblico",
                  "Explicación del concepto",
                  "Juego o actividad",
                  "Retroalimentación",
                  "Reflexión personal",
                  "Evaluación y cierre",
                ],
                answer: [0, 1, 2, 3, 4, 5, 6, 7],
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Toda lección debe comenzar definiendo un objetivo claro.", answer: true },
                  { text: "La evaluación sirve para calificar y excluire a quien falla.", answer: false, ref: "Proverbios 27:23" },
                  { text: "La retroalimentación explica respuestas y remite al pasaje.", answer: true },
                ],
              },
            ],
            reflection: v(
              "Elige una lección de la Fase 1 y escribe su objetivo en una frase.",
              "¿Qué paso de los ocho te cuesta más y cómo puedes prepararte mejor en ese punto?",
              "¿Cómo equilibras enseñanza fiel con actividades atractivas según tu público?"
            ),
            evaluation: [
              {
                q: "¿Cuál debe ser el primer paso al preparar una lección?",
                options: ["Elegir un juego divertido", "Definir el objetivo de aprendizaje", "Hacer una lista larga de versículos"],
                answer: 1,
                why: "El objetivo define qué debe comprender el alumno y guía el resto de la lección.",
              },
              {
                q: "¿Qué es la retroalimentación en la lección?",
                options: ["Un premio", "Explicar las respuestas y remitir al pasaje bíblico", "Una pausa para tomar agua"],
                answer: 1,
                why: "La retroalimentación aclara por qué una respuesta es correcta o requiere revisión, apoyada en el texto bíblico.",
              },
            ],
            practice: {
              title: "Práctica: prepara una lección",
              instructions:
                "Elige una lección de la Fase 1 y escribe: (1) objetivo, (2) pasaje, (3) idea central en dos frases, (4) una actividad y (5) una pregunta de cierre. Preséntala a tu instructor.",
            },
          },
        ],
      },
      {
        id: "m15",
        title: "Facilitar según la edad",
        icon: "users",
        summary: "Comunicar según edad y nivel de lectura sin alterar el sentido central.",
        lessons: [
          {
            id: "l15-1",
            title: "Un mensaje, distintas formas",
            objective: "Adaptar lenguaje y ejemplos a niños, adolescentes y adultos sin cambiar el mensaje.",
            activation: v(
              "Contarle a un niño y explicarle a un adulto usa palabras distintas, pero la verdad es la misma. Esa es la habilidad del instructor.",
              "La adaptación no es trivialización: es fidelidad comunicativa. El contenido doctrinal es común; el envoltorio cambia.",
              "La contextualización legítima preserva el sentido del mensaje mientras ajusta vocabulario, ejemplos y densidad cognitiva."
            ),
            passage: {
              ref: "1 Corintios 9:19-23",
              text: "Me hice como judío a los judíos, para ganar a los judíos... me hago débil para ganar a los débiles; a todos me he hecho todo, para por todos algunos salve.",
            },
            explanation: v(
              "Con niños: frases cortas, relatos e imágenes. Con adolescentes: preguntas y escenarios. Con adultos: contexto y conexiones. Siempre con el mismo mensaje fiel.",
              "Pablo practicó la adaptación sin perder el evangelio: cambia el approach según la audiencia con un único propósito misionero.",
              "La estrategia paulina (1 Corintios 9) ofrece el marco: renunciar a derechos de estilo por el bien del otro, sin renunciar jamás a la verdad."
            ),
            activities: [
              {
                type: "match",
                title: "Une grupo con estrategia",
                prompt: "Relaciona cada grupo con su forma de enseñar recomendada:",
                pairs: [
                  { left: "Niños", right: "Frases cortas, relatos, imágenes y sesiones breves" },
                  { left: "Adolescentes", right: "Escenarios, preguntas de significado y dudas respetadas" },
                  { left: "Adultos", right: "Contexto, glosario, conexiones entre pasajes" },
                ],
              },
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Un adolescente hace una pregunta difícil sobre su fe. ¿Qué haces?",
                options: [
                  "Cambiar de tema para no perderte",
                  "Decirle que no piense en esas cosas",
                  "Escuchar, reconocer la duda y ofrecer conversarlo con profundidad",
                  "Responder con una definición técnica que no entienda",
                ],
                answer: 2,
                feedback:
                  "El plan del ministerio pide espacio para dudas y conversación respetuosa, con derivación a responsables cuando la duda excede la actividad.",
              },
            ],
            reflection: v(
              "Piensa en un niño que conozcas: ¿cómo le explicarías Juan 3:16?",
              "¿Cómo evitas trivializar el evangelio al simplificarlo?",
              "¿Qué preguntas difíciles de adolescentes has escuchado y cómo prepararías una respuesta?"
            ),
            evaluation: [
              {
                q: "¿Qué se adapta según la edad y qué no?",
                options: [
                  "Se adapta vocabulario y ejemplos; el mensaje central permanece",
                  "Todo cambia según la audiencia",
                  "Nada debe cambiarse nunca",
                ],
                answer: 0,
                why: "El plan sostiene «una base, distintas formas de explicar» sin mensajes contradictorios.",
              },
              {
                q: "Ante una duda doctrinal fuera de tu alcance, ¿qué corresponde?",
                options: ["Improvisar una respuesta", "Derivar al responsable designado", "Ignorar la pregunta"],
                answer: 1,
                why: "El instructor reconoce límites y deriva dudas doctrinales, pastorales o de protección a responsables designados.",
              },
            ],
          },
        ],
      },
      {
        id: "m16",
        title: "Acompañar sin avergonzar",
        icon: "hand",
        summary: "Facilitar juegos y conversaciones, formular preguntas, explicar errores y registrar avance.",
        lessons: [
          {
            id: "l16-1",
            title: "Errores que enseñan",
            objective: "Explicar errores con paciencia y crear un ambiente seguro para aprender.",
            activation: v(
              "Cuando alguien se equivoca en clase, eso no es una vergüenza: es una oportunidad para aprender. El instructor decide cuál de las dos se siente.",
              "La corrección efectiva protege la dignidad del alumno y corrige la idea: las dos cosas a la vez, sin humillar.",
              "El ambiente psicológico seguro incrementa la participación y la retención; la vergüenza pública las destruye y viola el principio de respeto del plan."
            ),
            passage: {
              ref: "Proverbios 15:1",
              text: "La respuesta blanda aparta el furor, pero la palabra áspera levanta la ira.",
            },
            explanation: v(
              "Si un amigo se equivoca, ayúdale con amor, no con burlas. Explica con calma, muestra el pasaje y anímale a intentarlo de nuevo.",
              "El instructor modela la respuesta blanda: corrige la idea sin tocar la dignidad de la persona, y siempre remite al texto bíblico como autoridad.",
              "La sabiduría de Proverbios 15:1 aplicada a la enseñanza: la forma amorosa abre donde la dureza cierra; la autoridad se gana sirviendo, no imponiendo."
            ),
            activities: [
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Un alumno responde mal delante del grupo. ¿Qué hace un buen instructor?",
                options: [
                  "Decirle en público que eso está mal y seguir",
                  "Burlarse un poco para que no vuelva a fallar",
                  "Agradecer su participación, corregir con amor y mostrar el pasaje",
                  "Ignorar el error para no incomodar",
                ],
                answer: 2,
                feedback:
                  "El plan exige explicar errores con paciencia, proteger la dignidad del alumno y remitir al pasaje: el error es oportunidad de aprendizaje.",
              },
              {
                type: "tf",
                title: "Verdadero o falso",
                items: [
                  { text: "Los errores deben verse como oportunidades de aprendizaje.", answer: true },
                  { text: "Avergonzar a quien falla motiva a estudiar más.", answer: false, ref: "Proverbios 15:1" },
                  { text: "El instructor registra avances para detectar quién necesita apoyo.", answer: true },
                ],
              },
            ],
            reflection: v(
              "Recuerda a un maestro que te hizo sentir seguro al equivocarte. ¿Qué hizo?",
              "¿Cómo preparas tu lenguaje para corregir sin herir?",
              "¿Qué límites de protección debo conocer antes de acompañar menores?"
            ),
            evaluation: [
              {
                q: "¿Cómo debe tratarse el error de un alumno?",
                options: ["Con vergüenza pública", "Como oportunidad de aprendizaje con explicación paciente", "Ignorándolo"],
                answer: 1,
                why: "El principio del ministerio es claro: los errores serán oportunidades de aprendizaje.",
              },
              {
                q: "¿Qué versículo sustenta corregir con palabras amables?",
                options: ["Proverbios 15:1", "Génesis 1:1", "Romanos 1:16"],
                answer: 0,
                why: "Proverbios 15:1 enseña que la respuesta blanda aparta el furio y la palabra áspera levanta la ira.",
              },
            ],
          },
        ],
      },
      {
        id: "m17",
        title: "Registrar y derivar",
        icon: "shield",
        summary: "Registrar progreso, detectar dificultades y reconocer límites de enseñanza y protección.",
        lessons: [
          {
            id: "l17-1",
            title: "Límites del instructor",
            objective: "Saber qué documentar, qué derivar y a quién acudir en casos doctrinales o de protección.",
            isPractice: true,
            activation: v(
              "Un buen instructor sabe qué puede enseñar y cuándo pedir ayuda. Esa sabiduría protege a todos.",
              "El registro mínimo de acompañamiento debe respetar privacidad: documentar lo necesario para el discipulado, no curiosidades personales.",
              "Los protocolos de derivación protegen al instructor, al alumno y al ministerio: dudas doctrinales → liderazgo; protección → responsable designado."
            ),
            passage: {
              ref: "Romanos 13:1",
              text: "Sométase toda persona a las autoridades superiores; porque no hay autoridad sino de parte de Dios, y las que existen, por Dios fueron ordenadas.",
            },
            explanation: v(
              "Si una duda es demasiado profunda o si alguien necesita protección, el instructor pide ayuda a los líderes designados. No tiene que resolverlo todo solo.",
              "La rendición de cuentas estructural no debilita el ministerio: lo fortalece. El instructor actúa dentro de un marco de autoridad, privacidad y derivación.",
              "La obediencia a autoridades legítimas (Romanos 13) se aplica a la estructura del ministerio: responsables doctrinales y de protección designados por la iglesia."
            ),
            activities: [
              {
                type: "match",
                title: "Une caso con la acción correcta",
                prompt: "Relaciona cada situación con lo que debe hacer el instructor:",
                pairs: [
                  { left: "Duda doctrinal profunda", right: "Derivar al responsable doctrinal designado" },
                  { left: "Señal de riesgo para un menor", right: "Informar al responsable de protección" },
                  { left: "Alumno con dificultad en un tema", right: "Sugerir repaso y ofrecer ayuda" },
                  { left: "Preparar una sesión", right: "Registrar objetivos trabajados" },
                ],
              },
              {
                type: "choice",
                title: "Elige la mejor respuesta",
                prompt: "Un alumno te confía algo que excede tu alcance pastoral. ¿Qué haces?",
                options: [
                  "Prometerle que guardarás el secreto siempre",
                  "Escuchar con respeto y derivar al responsable designado",
                  "Publicarlo en el grupo para pedir oración",
                  "Ignorarlo porque no es tu problema",
                ],
                answer: 1,
                feedback:
                  "El plan establece reconocer límites y derivar dudas doctrinales, pastorales o de protección a responsables designados, actuando siempre con respeto y confidencialidad.",
              },
            ],
            reflection: v(
              "¿A quién acudirías en tu iglesia ante una duda doctrinal seria?",
              "¿Cómo registras el avance de tus alumnos sin invadir su privacidad?",
              "¿Qué responsabilidad tienes como instructor ante situaciones de riesgo de menores?"
            ),
            evaluation: [
              {
                q: "Ante una duda doctrinal fuera de tu alcance, ¿qué corresponde?",
                options: ["Improvisar", "Derivar al responsable designado", "Dejar la duda en el aire"],
                answer: 1,
                why: "El instructor reconoce sus límites y deriva a los responsables doctrinales de la iglesia.",
              },
              {
                q: "¿Qué datos debe registrar un instructor?",
                options: ["Todo lo que sepa del alumno", "Solo el registro mínimo de acompañamiento conforme a privacidad", "Nada jamás"],
                answer: 1,
                why: "El plan pide registro mínimo de acompañamiento, sujeto a políticas de privacidad.",
              },
            ],
            practice: {
              title: "Práctica: simula una derivación",
              instructions:
                "Escribe (1) la situación simulada, (2) cómo la escucharías con respeto, (3) a quién la derivarías y (4) qué registrarías. Preséntalo a tu instructor evaluador.",
            },
          },
        ],
      },
    ],
  },
];

export const BADGES = [
  { id: "first-step", name: "Primer paso", desc: "Completaste tu primera lección.", icon: "footprints" },
  { id: "module-master", name: "Módulo completado", desc: "Terminaste todas las lecciones de un módulo.", icon: "award" },
  { id: "quiz-100", name: "Evaluación perfecta", desc: "Obtuviste 100% en una evaluación.", icon: "star" },
  { id: "xp-100", name: "100 XP", desc: "Acumulaste 100 puntos de experiencia.", icon: "zap" },
  { id: "phase-1", name: "Conocer", desc: "Completaste la Fase 1 completa.", icon: "sun" },
  { id: "streak-3", name: "Constancia", desc: "Estudiaste 3 días seguidos.", icon: "flame" },
  { id: "instructor-ready", name: "Listo para enseñar", desc: "Completaste las prácticas de la Fase 3.", icon: "graduation" },
];

export const MISSIONS = [
  { id: "ms1", title: "Conoce la Biblia", desc: "Completa el módulo 1 de la Fase 1.", phase: "f1", module: "m1", xp: 60 },
  { id: "ms2", title: "El corazón del evangelio", desc: "Completa el módulo 5 de la Fase 1 (Juan 3:16).", phase: "f1", module: "m5", xp: 60 },
  { id: "ms3", title: "Fundamentos completos", desc: "Completa la Fase 1 entera.", phase: "f1", xp: 200 },
  { id: "ms4", title: "Profundiza", desc: "Completa 3 módulos de la Fase 2.", phase: "f2", count: 3, xp: 150 },
  { id: "ms5", title: "Prepárate para enseñar", desc: "Completa la Fase 3 de instructores.", phase: "f3", xp: 200 },
];

export const INSTRUCTOR_GUIDE = {
  before: [
    "Define el objetivo de la lección en una frase medible.",
    "Lee el pasaje bíblico completo y anota su contexto.",
    "Prepara la explicación con palabras apropiadas para la edad del grupo.",
    "Elige una actividad que practique el concepto, no solo lo decore.",
  ],
  during: [
    "Abre con la pregunta o relato de activación.",
    "Lee el pasaje en voz alta y pide observar sus ideas.",
    "Explica la idea central con calma y ejemplos.",
    "Facilita el juego sin avergonzar a quien se equivoca.",
    "Retroalimenta cada respuesta remitiendo al pasaje.",
  ],
  after: [
    "Recoge la reflexión de los alumnos sin exponerlos.",
    "Revisa la evaluación y sugiere avanzar o repasar.",
    "Registra objetivos trabajados y dificultades detectadas.",
    "Deriva al responsable designado cualquier duda fuera de tu alcance.",
  ],
};

export const LOOK_OPTIONS = [
  { value:'papa_2.0', emoji:'👨‍👧', title:'Papa 2.0', desc:'Pelo negro parado + ojos marrones', quote:'"No se de quien lo heredo." 😂' },
  { value:'mama_gano', emoji:'👩‍👧', title:'Mama gano la partida', desc:'Pelo rubio/castanio + ojos azules', quote:'"Aparentemente yo estaba de decoracion."' },
  { value:'crossover', emoji:'🔀', title:'El crossover', desc:'Pelo negro/castanio oscuro + ojos azules', quote:'"¿Y esos ojos?" — "Importados." 😂' },
  { value:'negociacion', emoji:'🤝', title:'La negociacion', desc:'Pelo castanio + ojos marrones/avellana', quote:'"Les doy algo a cada uno y no peleen."' },
  { value:'genetica_caotica', emoji:'🧬', title:'Genetica caotica', desc:'Pelo castanio oscuro + ojos verdes', quote:'La familia saca fotos de bisabuelos buscando al responsable 😂' },
  { value:'edicion_limitada', emoji:'✨', title:'Bebe edicion limitada', desc:'Pelo oscuro + ojos claros', quote:'Papa: "Tiene mis genes." Mama: "Si, pero mira los ojos."' },
];
export const LOOK_MAP: Record<string, typeof LOOK_OPTIONS[number]> = {};
LOOK_OPTIONS.forEach(o => { LOOK_MAP[o.value] = o; });

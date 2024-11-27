const opcionesUnidades = {
    metros: 1,
    kilometros: 0.001,
    millas: 0.000621371,
    yardas: 1.09361,
    pulgadas: 39.3701,
    milimetros: 1000,
    millasNauticas: 0.000539957,
    decimetros: 10, // Nueva unidad: Decímetros
    centimetros: 100, // Nueva unidad: Centímetros
  };
  
  // Componente: Selector de Unidades
  const SelectorUnidades = {
    props: ["unidadSeleccionada", "unidades"],
    emits: ["update:unidadSeleccionada"],
    template: `
      <div>
        <label for="unidad" class="form-label text-white">Unidad:</label>
        <select
          class="form-select"
          id="unidad"
          v-model="localUnidad"
          @change="$emit('update:unidadSeleccionada', localUnidad)"
        >
          <option v-for="(valor, unidad) in unidades" :value="unidad">{{ unidad }}</option>
        </select>
      </div>
    `,
    data() {
      return {
        localUnidad: this.unidadSeleccionada,
      };
    },
  };
  
  // Componente: Input de Valor
  const InputValor = {
    props: ["valor"],
    emits: ["update:valor"],
    template: `
      <div>
        <label for="valor" class="form-label text-white">Valor:</label>
        <input
          type="number"
          class="form-control"
          id="valor"
          v-model.number="localValor"
          @input="$emit('update:valor', localValor)"
          placeholder="Introduce un valor"
        />
      </div>
    `,
    data() {
      return {
        localValor: this.valor,
      };
    },
  };
  
  // Componente: Resultado de Conversión
  const ResultadoConversion = {
    props: ["resultado", "unidadFinal"],
    template: `
      <div v-if="resultado !== null" class="alert alert-info mt-4">
        Resultado: {{ resultado.toFixed(2) }} {{ unidadFinal }}
      </div>
    `,
  };
  
  // Componente Principal: Convertidor de Unidades
  const ConvertidorUnidades = {
    components: { SelectorUnidades, InputValor, ResultadoConversion },
    data() {
      return {
        valor: 0,
        unidadOrigen: "metros",
        unidadDestino: "kilometros",
        resultado: null,
        unidades: opcionesUnidades,
      };
    },
    computed: {
      factorConversion() {
        return this.unidades[this.unidadDestino] / this.unidades[this.unidadOrigen];
      },
    },
    methods: {
      convertir() {
        this.resultado = this.valor * this.factorConversion;
      },
    },
    template: `
      <div class="card card-custom p-4">
        <h2 class="text-center mb-4 text-white">Convertidor de Unidades</h2>
        <div class="row">
          <div class="col-md-6">
            <selector-unidades
              v-model:unidadSeleccionada="unidadOrigen"
              :unidades="unidades"
            ></selector-unidades>
          </div>
          <div class="col-md-6">
            <selector-unidades
              v-model:unidadSeleccionada="unidadDestino"
              :unidades="unidades"
            ></selector-unidades>
          </div>
        </div>
        <input-valor v-model:valor="valor"></input-valor>
        <div class="d-flex justify-content-center mt-4">
          <button @click="convertir" class="btn btn-custom btn-lg">Convertir</button>
        </div>
        <resultado-conversion
          :resultado="resultado"
          :unidad-final="unidadDestino"
        ></resultado-conversion>
      </div>
    `,
  };
  
  // Crear instancia Vue
  Vue.createApp({ components: { ConvertidorUnidades } }).mount("#app");  
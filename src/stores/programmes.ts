import { defineStore } from "pinia";
import type { IProgramme } from "../models/Programme";
import type { Ref } from "vue";
import { ref } from "vue";

export interface IProgrammeStore {
    programmes: Ref<IProgramme[]>;
    fetchProgrammes():Promise<IProgramme[]>
    addProgramme(programme:IProgramme):Promise<void>;
    updateProgramme(programme:IProgramme):Promise<void>;
}

export const useProgrammesStore = defineStore("programmes", (): IProgrammeStore => {
    const programmes:Ref<IProgramme[]> = ref([]);

    async function fetchProgrammes() {
      const response = await fetch("/api/programmes");
      programmes.value = await response.json();
      return programmes.value;
    };

     async function addProgramme(programme: IProgramme) {
      const response = await fetch("/api/programmes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programme),
      });
      const newProgramme = await response.json();
      programmes.value.push(newProgramme);
    };

    async function updateProgramme(programme: IProgramme) {
      const response = await fetch(`/api/programmes/${programme.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programme),
      });
      const updatedProgramme = await response.json();
      const index = programmes.value.findIndex(p => p.id === updatedProgramme.id);
      if (index !== -1) {
        programmes.value[index] = updatedProgramme;
      }
    };

    return {
        addProgramme,
        fetchProgrammes,
        programmes,
        updateProgramme
    };
});


export const useProgrammesStore2 = defineStore("programmes", {
  state: () => ({
    programmes: [] as IProgramme[],
  }),
  actions: {
   
    async fetchProgrammes() {
      const response = await fetch("/api/programmes");
      this.programmes = await response.json();
      return this.programmes;
    },
  },
});
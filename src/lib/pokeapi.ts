import { PokemonClient } from 'pokenode-ts';

const baseApi = new PokemonClient();

// Função para simular um delay
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Agora criamos um "wrapper" do api
const api = {
  async listPokemons(offset: number, limit: number) {
    await delay(2500); // 1.5 segundos de delay
    return baseApi.listPokemons(offset, limit);
  },

  async getPokemonByName(name: string) {
    await delay(2500); // 1.5 segundos de delay
    return baseApi.getPokemonByName(name);
  },

  async getPokemonSpeciesByName(name: string) {
    await delay(0); // 1.5 segundos de delay
    return baseApi.getPokemonSpeciesByName(name);
  }
};

export default api;

import { IGetCharactersResponse } from '@/services/modules/characters/interface';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Character = IGetCharactersResponse['results'][0]

type CharacterStoreState = {
    state: {
        character: Character | null;
        favoriteCharacters: Character[];
    }
    actions: {
        setCharacter: (character: Character) => void;
        clearCharacter: () => void;
        addCharacterToFavorites: (character: Character) => void;
        removeCharacterFromFavorites: (id: number) => void;
    }
}

const useCharacterStore = create<CharacterStoreState>()(
    persist(
    (set) => ({
    state: {
        character: null,
        favoriteCharacters: []
    },
    actions: {
        setCharacter: (character) => set((state) => ({ state: { ...state.state, character } })),
        clearCharacter: () => set((state) => ({ state: { ...state.state, character: null } })),
        addCharacterToFavorites: (character) => set((state) => ({ state: { ...state.state, favoriteCharacters: [...state.state.favoriteCharacters, character] } })),
        removeCharacterFromFavorites: (id: number) => set((state) => ({ state: { ...state.state, favoriteCharacters: state.state.favoriteCharacters.filter((character) => character.id !== id) } }))
    }
}), {
    partialize(state) {
        return { state: state.state };
    },
    name: 'character-store',
    storage: createJSONStorage(() => sessionStorage),
})
);

export default useCharacterStore;
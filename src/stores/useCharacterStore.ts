import { IGetCharactersResponse } from '@/services/modules/characters/interface';
import { create } from 'zustand';

type Character = Pick<IGetCharactersResponse['results'][0], 'id' | 'name' | 'description' | 'thumbnail'>

type CharacterStoreState = {
    state: {
        character: Character | null;
    }
    actions: {
        setCharacter: (character: Character) => void;
        clearCharacter: () => void;
    }
}

const useCharacterStore = create<CharacterStoreState>((set) => ({
    state: {
        character: null
    },
    actions: {
        setCharacter: (character) => set((state) => ({ state: { ...state, character } })),
        clearCharacter: () => set((state) => ({ state: { ...state, character: null } }))
    }
}))

export default useCharacterStore;
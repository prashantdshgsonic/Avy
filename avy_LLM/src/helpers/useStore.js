import { create } from 'zustand';
import { AnimationMixer } from 'three';

export const useStore = create(() => ({
    actions: {},
    mixer: new AnimationMixer()
}))
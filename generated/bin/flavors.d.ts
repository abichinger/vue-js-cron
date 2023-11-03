import type { App } from 'vue';
export interface Flavor {
    name: string;
    package: string;
    dir: string;
    css?: string;
    component: string;
    uses?: Record<string, string[]>;
    imports?: string[];
    setup?: (app: App) => Promise<void>;
}
export declare const core: Flavor;
export declare const light: Flavor;
export declare const ant: Flavor;
export declare const element: Flavor;
export declare const quasar: Flavor;
export declare const vuetify: Flavor;
export declare const flavors: Flavor[];

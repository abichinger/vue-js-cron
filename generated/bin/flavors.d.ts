import type { App } from 'vue';
export interface Requirement {
    name: string;
    url: string;
}
export interface Flavor {
    name: string;
    description: string;
    package: string;
    dir: string;
    css?: string;
    component: string;
    componentHypen: string;
    uses?: Record<string, string[]>;
    imports?: string[];
    setup?: (app: App) => Promise<void>;
    requirements?: Requirement[];
    example?: string;
}
export declare const core: Flavor;
export declare const light: Flavor;
export declare const ant: Flavor;
export declare const element: Flavor;
export declare const quasar: Flavor;
export declare const vuetify: Flavor;
export declare const flavors: Flavor[];

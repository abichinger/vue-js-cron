import type { App } from 'vue';
export interface Link {
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
    requirements?: Link[];
    example?: string;
    api?: Link[];
}
export declare const flavors: Flavor[];

export interface TaskInterface {
    title?: string;
    short_description?: string;
    description?: string;
    priority?: string;
    category?: string;
    status?: string;
}

export interface Properties {
    name: string;
    description?: string;
}

export interface States {
    name: string;
    description?: string;
}
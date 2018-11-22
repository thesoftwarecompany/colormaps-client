import {API_URL} from './constants';
import {ColorFormat, ColorSpace} from './types';


/**
 * Get a list of all colormaps
 */
export async function names() {
    const response = await fetch(`${API_URL}/colormap`);
    return getData<string[]>(response);
}


/**
 * Get a colormap by name
 * @param name
 * @param [format]
 */
export async function forName(name: string, format: 'hex'): Promise<string[]>;
export async function forName(name: string, format?: ColorSpace): Promise<number[][]>;
export async function forName(name: string, format?: ColorFormat) {
    const response = await fetch(setFormat(`${API_URL}/colormap/${name}`, format));
    return getData(response);
}


/**
 * Get a random colormap
 * @param length
 * @param [format]
 */
export async function random(length: number, format: 'hex'): Promise<string[]>;
export async function random(length: number, format?: ColorSpace): Promise<number[][]>;
export async function random(length: number = 2, format?: ColorFormat) {
    const response = await fetch(`${setFormat(`${API_URL}/colormap/random`, format)}&length=${length}`);
    return getData(response);
}


/**
 * Get a random color
 * @param [format]
 */
export async function randomColor(format: 'hex'): Promise<RandomColor<string>>;
export async function randomColor(format?: ColorSpace): Promise<RandomColor>;
export async function randomColor(format?: ColorFormat) {
    const response = await fetch(setFormat(`${API_URL}/color/random`, format));
    return getData<RandomColor<any>>(response);
}


/**
 * Search colormaps by name or Euclidean distance
 * @param query
 */
export async function search(query: SearchByNameParams | SearchByDistanceParams) {
    const response = await fetch(`${API_URL}/colormap/search`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    });
    return getData<string[]>(response);
}


function setFormat(uri: string, format?: ColorFormat) {
    return `${uri}?format=${format ? format : 'gl'}`;
}

async function getData<T>(res: Response) {
    if (res.status !== 200) {
        const error: ApiError = await res.json();
        throw new Error(error.message);
    }
    const data: T = await res.json();
    return data;
}


export interface SearchByNameParams {
    name: string;
}

export interface SearchByDistanceParams {
    color: string | number[];
    format: ColorFormat;
    colorSpace?: ColorSpace;
    distance: number;
}

export interface RandomColor<T = number[]> {
    color: T;
}

interface ApiError {
    error: string;
    statusCode: number;
    message: string;
}

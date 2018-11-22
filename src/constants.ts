import {ColorFormat, ColorSpace} from './types';

export const API_URL = 'https://api.colormaps.io';

export const COLOR_SPACE: ColorSpace[] = ['cmyk', 'gl', 'hcl', 'hsi', 'hsl', 'hsv', 'lab', 'lch', 'rgb'];

export const COLOR_FORMAT: ColorFormat[] = [
    ...COLOR_SPACE,
    'hex'
];

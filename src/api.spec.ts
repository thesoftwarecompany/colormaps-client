require('isomorphic-fetch');
import * as fetchMock from 'fetch-mock';

import {
    getColormap,
    getList,
    randomColor,
    randomColormap,
    search,
    SearchByDistanceParams
} from './api';
import {API_URL} from './constants';

afterEach(() => {
    fetchMock.reset();
});

afterAll(() => {
    fetchMock.restore();
});

describe('getList()', () => {
    it('should return a list of colormaps', async () => {
        fetchMock.get(`${API_URL}/colormap`, ['viridis']);
        const items = await getList();
        expect(items).toEqual(['viridis']);
    });

    it('should throw if response status is not 200', async done => {
        fetchMock.get(`${API_URL}/colormap`, {
            throws: true,
            body: {
                message: 'Method not found'
            }
        });

        try {
            await getList();
            done.fail('Should have thrown an error');
        } catch (e) {
            done();
        }
    });
});

describe('getColormap()', () => {
    it('should return a colormap', async () => {
        const viridis = [
            [0, 0, 0],
            [1, 1, 1]
        ];
        fetchMock.get(url => url.includes(`${API_URL}/colormap/viridis`), viridis);
        const colormap = await getColormap('viridis');
        expect(colormap).toEqual(viridis);
    });

    it('should return a colormap in the requested format', async () => {
        const viridis = [
            '#000',
            '#fff'
        ];
        fetchMock.get(url => url.includes(`${API_URL}/colormap/viridis`) && url.includes('format=hex'), viridis);
        const colormap = await getColormap('viridis', 'hex');
        expect(colormap).toEqual(viridis);
    });

    it('uses "gl" format by default', async () => {
        fetchMock.get(url => url.includes(`${API_URL}/colormap/viridis`) && url.includes('format=gl'), []);
        await getColormap('viridis');
    });

    it('should throw if response status is not 200', async done => {
        fetchMock.get(url => url.includes(`${API_URL}/colormap/viridis`), {
            throws: true,
            body: {
                message: 'Method not found'
            }
        });

        try {
            await getColormap('viridis');
            done.fail('Should have thrown an error');
        } catch (e) {
            done();
        }
    });
});

describe('randomColormap()', () => {
    it('should return a colormap with the requested length', async () => {
        const data = [
            [0, 0, 0],
            [1, 1, 1]
        ];
        fetchMock.get(url => url.includes(`${API_URL}/colormap/random`) && url.includes('length=2'), data);
        const colormap = await randomColormap(2);
        expect(colormap).toEqual(data);
    });

    it('should return a colormap in the requested format', async () => {
        const data = [
            '#000',
            '#fff'
        ];
        fetchMock.get(url => url.includes(`${API_URL}/colormap/random`) && url.includes('format=hex'), data);
        const colormap = await randomColormap(2, 'hex');
        expect(colormap).toEqual(data);
    });

    it('uses "gl" format by default', async () => {
        fetchMock.get(url => url.includes(`${API_URL}/colormap/random`) && url.includes('format=gl'), []);
        await randomColormap(2);
    });

    it('should throw if response status is not 200', async done => {
        fetchMock.get(url => url.includes(`${API_URL}/colormap/random`), {
            throws: true,
            body: {
                message: 'Method not found'
            }
        });

        try {
            await randomColormap(2);
            done.fail('Should have thrown an error');
        } catch (e) {
            done();
        }
    });
});

describe('randomColor()', () => {
    it('should return a color object', async () => {
        const color = [0, 0, 0];
        fetchMock.get(url => url.includes(`${API_URL}/color/random`), {color});
        const res = await randomColor();
        expect(res).toEqual({color});
    });

    it('should return a color in the requested format', async () => {
        const color = '#000';
        fetchMock.get(url => url.includes(`${API_URL}/color/random`) && url.includes('format=hex'), {color});
        const res = await randomColor('hex');
        expect(res).toEqual({color});
    });

    it('uses "gl" format by default', async () => {
        fetchMock.get(url => url.includes(`${API_URL}/color/random`) && url.includes('format=gl'), []);
        await randomColor();
    });

    it('should throw if response status is not 200', async done => {
        fetchMock.get(url => url.includes(`${API_URL}/color/random`), {
            throws: true,
            body: {
                message: 'Method not found'
            }
        });

        try {
            await randomColor();
            done.fail('Should have thrown an error');
        } catch (e) {
            done();
        }
    });
});

describe('search()', () => {
    it('can search by name', async () => {
        const query = {name: 'viridis'};
        fetchMock.post(`${API_URL}/colormap/search`, (url, req) => {
            const data = JSON.parse(req.body!.toString());
            expect(data).toEqual(query);
            return {
                body: [],
                status: 200
            };
        });

        await search(query);
    });

    it('can search by distance', async () => {
        const query: SearchByDistanceParams = {
            color: '#fff',
            format: 'hex',
            distance: 0.2,
            colorSpace: 'hsv'
        };

        fetchMock.post(`${API_URL}/colormap/search`, (url, req) => {
            const data = JSON.parse(req.body!.toString());
            expect(data).toEqual(query);
            return {
                body: [],
                status: 200
            };
        });

        await search(query);
    });

    it('should throw if response status is not 200', async done => {
        fetchMock.post(`${API_URL}/colormap/search`, {
            throws: true,
            body: {
                message: 'Method not found'
            }
        });

        try {
            await search({name: 'viridis'});
            done.fail('Should have thrown an error');
        } catch (e) {
            done();
        }
    });
});

import { ajax } from "../tools/ajax";

const key = import.meta.env.VITE_MOVIEDB;
export const getMovies = async ({ opt, type, page }) => {

    /* Opciones */

    // Popular movies
    const optionsPopular = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
        params: {
            language: 'es',
            page: page
        }
    }

    //Top-rated movies
    const optionTop = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
        params: {
            language: 'es',
            page: 2
        }
    }

    //Peliculas por tipo
    const optionType = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
        params: {
            language: 'es',
            query: type,
            page: 1,
            include_adult: false
        }
    }

    //Up coming
    const optionProximos = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
        params: {
            language: 'es',
            page: 1
        }
    }
    //Cases= popular(page)-top()-categoria(type) coming()
    switch (opt) {
        case 'popular':
            const popular = await ajax(optionsPopular);
            return popular.results;
        case 'top':
            const topRated = await ajax(optionTop);
            return topRated.results;
        case 'categoria':
            const categoriaMovies = await ajax(optionType);
            return categoriaMovies.results;
        case 'soon':
            const upComing = await ajax(optionProximos);
            return upComing.results;
        default:
            return;
    }
}
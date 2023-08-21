import { useHttp } from "../components/hooks/http.hooks";


const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

   const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
   const _apiKey = `apikey=b4e99c5feecbc58cf8b09dc8585dac81`;
   const _offset = 210;
   

    const getAllCharacters = async(offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter )

    }

    const getCharacter = async (id) => {
        const res =  await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async(offset = 256) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }
   

   const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, no description', 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10)
            // comics: (char.comics.items.length === 0) ? 'This character has no comics' : char.comics.items.slice(0, 10)
        }
    }

    const _transformComics = (comic) => {
        return{
            id: comic.id,
            title: comic.title,
            urls: comic.urls[0].url, 
            prices: comic.prices[0].price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            descr: comic.description,
            pageCount: comic.pageCount,
            // language: comic.textObjects[0].language
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics }
}

export default useMarvelService;
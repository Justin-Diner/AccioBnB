export const GET_SEARCH_RESULTS = 'search/searchResults';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});

export const fetchSearchResults = (query) => async dispatch => {
    const res = await fetch(`/api/listings/search?q=${query}`);
    const data = await res.json();
    dispatch(receiveSearchResults(data));
};

export const getSearchResults = (state) => {
	return state.searchResults ? Object.values(state.searchResults) : null;
}
const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return action.searchResults.search || null;
        default:
            return state;
    }
};

export default searchReducer;
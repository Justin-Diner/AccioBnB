import { useSelector } from "react-redux"
import { fetchSearchResults } from "../../store/search"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react";
const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const query = history.location.search.split("=")[1];
        dispatch(fetchSearchResults(query))
    }, []);

    const searchResults = useSelector((state) => state.searchResults);
    return(
        <>
        {Object.values(searchResults).map((ele) => {
            return <div>{ele.title}</div>
        })}
        </>
    );
}
export default Search;
import ResultCard from "../components/ResultCard"

export default function Search() {
    return (
        <>
            <div className="search-container">
                <form>
                    <input type="text" className="search-input" placeholder="Search"></input>
                    <button className="search-button" >Search</button>
                </form>
            </div>
            <h1 className="query-name">Search Results for "Hiking"</h1>
            <div className="results-container">
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
            </div>
        </>
    )
}
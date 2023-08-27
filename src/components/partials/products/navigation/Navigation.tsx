import { Search } from "./search/Search"
import CustomSelect from "./select/Select"



export const Navigation = () => {
    return (
        <section className="navigation">
            <CustomSelect />
            <Search />
        </section>
    )
}
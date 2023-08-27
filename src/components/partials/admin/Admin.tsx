

import { useAppSelector } from "@/redux/hooks";
import { AdminProducts } from "./adminProducts/AdminProducts"
import { RootState } from "@/redux/store";
import { AdminCategories } from "./adminCategory/AdminCategory";
import { AdminLinks } from "./adminLinks/AdminLink";
import { AdminVideos } from "./adminVideos/AdminVideo";
import { AdminContacts } from "./adminContact/AdminContact";
import { AdminIcons } from "./adminIcons/AdminIcon";
import { AdminLogo } from "./adminLogo/AdminLogo";


export const Admin = () => {

    const chooseValue = useAppSelector((state: RootState) => state.adminChoose.chooseValue);

    return(
        <section className="admin">
            {
                chooseValue == "products" ?
                <AdminProducts />
                : chooseValue == "categories" ?
                <AdminCategories />
                : chooseValue == "links" ?
                <AdminLinks />
                : chooseValue == "videos" ?
                <AdminVideos />
                : chooseValue == "contacts" ?
                <AdminContacts />
                : chooseValue == "icons" ?
                 <AdminIcons />
                : <AdminLogo />
            }
        </section>
    )
}
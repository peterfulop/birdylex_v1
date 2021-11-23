import { state } from "./state.js";

import NotFound from "./views/NotFound.js";
import HomeView from "./views/HomeView.js";
import ProfileView from "./views/ProfileView.js";
import SearchView from "./views/SearchView.js";
import DictionariesView from "./views/DictionariesView.js";
import AddNewView from "./views/AddNewView.js";
import BrainteaserView from "./views/BrainteaserView.js";
import ReaderView from "./views/ReaderView.js";

import homeControl from "./controllers/homeControl.js";
import profileControl from "./controllers/profileControl.js";
import searchControl from "./controllers/searchControl.js";
import dictionariesControl from "./controllers/dictionariesControl.js";
import addNewControl from "./controllers/addNewControl.js";
import brainteaserControl from "./controllers/brainteaserControl.js";
import readerControl from "./controllers/readerControl.js";

import { mobileMenuShowHide } from "./helper.js";

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        (result) => result[1]
    );
    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        })
    );
};

export const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");


export const router = async () => {

    const routes = [
        { path: "/", view: HomeView, init: homeControl },
        { path: "/profile", view: ProfileView, init: profileControl },
        { path: "/search", view: SearchView, init: searchControl },
        {
            path: "/dictionaries",
            view: DictionariesView,
            init: dictionariesControl,
        },
        { path: "/addnew", view: AddNewView, init: addNewControl },
        { path: "/brainteaser", view: BrainteaserView, init: brainteaserControl },
        { path: "/reader", view: ReaderView, init: readerControl },

    ];

    // Test each route for potential match
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            init: route.init,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
    );

    if (!match) {
        match = {
            route: routes[0],
            init: routes[0],
            result: [location.pathname],
        };
    }
    const view = new match.route.view(getParams(match));
    await view.loadPage();

    if (typeof match.init === "function") await match.init();
    else {
        console.log(
            "404 Error! This page has no init function, becouse the page is not exist!"
        );
        const notFoundView = new NotFound();
        await notFoundView.loadPage();
    }
};

const navigateTo = (sendState, url) => {
    history.pushState(sendState, null, url);
    router();
};

export async function pageNavigation() {

    const dashboardLinks = document.querySelectorAll("[data-link]");
    const actualPageContainer = document.getElementById("active-page-name");
    const actualPageIcon = document.getElementById("active-page-icon");

    window.addEventListener("popstate", (e) => {
        if (e.state !== null) {
            actualPageIcon.className = e.state.icon;
            actualPageContainer.innerHTML = e.state.text;
            router();
        }
    });

    for (let i = 0; i < dashboardLinks.length; i++) {
        dashboardLinks[i].addEventListener("click", () => {
            actualPageIcon.className =
                state.generalSettings.dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML =
                state.generalSettings.dashboardMenuItems[i].text;

            let link = dashboardLinks[i].dataset.href;
            let sendState = {
                icon: state.generalSettings.dashboardMenuItems[i].icon,
                text: state.generalSettings.dashboardMenuItems[i].text,
                id: i,
            };
            navigateTo(sendState, link);
        });
    }

    const mobileMenuElements = document.querySelectorAll(".mobile-menu-item");

    for (let i = 0; i < mobileMenuElements.length; i++) {
        mobileMenuElements[i].addEventListener("click", () => {
            actualPageIcon.className =
                state.generalSettings.dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML =
                state.generalSettings.dashboardMenuItems[i].text;

            let link = mobileMenuElements[i].dataset.href;
            let sendState = {
                icon: state.generalSettings.dashboardMenuItems[i].icon,
                text: state.generalSettings.dashboardMenuItems[i].text,
                id: i,
            };
            navigateTo(sendState, link);

            mobileMenuShowHide();
        });
    }
};

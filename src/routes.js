import {CHANGE_BOOK_ROUTE, CREATE_BOOK_ROUTE, ORDER_ROUTE, PANEL_ROUTE, SIGNIN_ROUTE} from "./utils/consts";
import SignIn from "./pages/signin";
import Panel from "./pages/panel";
import CreateBook from "./pages/create-book";
import ChangeBook from "./pages/change-book";
import Order from "./pages/order";

export const routes = [
    {
        path: SIGNIN_ROUTE,
        Component: SignIn
    },
    {
        path: PANEL_ROUTE + ':id',
        Component: Panel
    },
    {
        path: CREATE_BOOK_ROUTE,
        Component: CreateBook,
    },
    {
        path: CHANGE_BOOK_ROUTE + ':token',
        Component: ChangeBook
    },
    {
        path: ORDER_ROUTE + ':id',
        Component: Order
    }
]
import React from "react";
import { render, screen } from "@testing-library/react";

import FcmMessagesPage from "../FcmMessagesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders fcmMessages page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FcmMessagesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fcmMessages-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fcmMessages-add-button")).toBeInTheDocument();
});

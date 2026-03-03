import React from "react";
import { render, screen } from "@testing-library/react";

import LoginHistoriesPage from "../LoginHistoriesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders loginHistories page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginHistoriesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("loginHistories-datatable")).toBeInTheDocument();
    expect(screen.getByRole("loginHistories-add-button")).toBeInTheDocument();
});

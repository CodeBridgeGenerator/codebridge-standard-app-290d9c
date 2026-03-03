import React from "react";
import { render, screen } from "@testing-library/react";

import FcmsPage from "../FcmsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders fcms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FcmsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fcms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fcms-add-button")).toBeInTheDocument();
});

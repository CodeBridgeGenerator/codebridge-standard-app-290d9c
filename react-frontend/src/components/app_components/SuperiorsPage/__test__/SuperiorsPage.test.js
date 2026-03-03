import React from "react";
import { render, screen } from "@testing-library/react";

import SuperiorsPage from "../SuperiorsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders superiors page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SuperiorsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("superiors-datatable")).toBeInTheDocument();
    expect(screen.getByRole("superiors-add-button")).toBeInTheDocument();
});

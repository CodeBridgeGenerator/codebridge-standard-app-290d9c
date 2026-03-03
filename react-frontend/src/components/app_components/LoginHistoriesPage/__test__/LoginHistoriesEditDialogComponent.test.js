import React from "react";
import { render, screen } from "@testing-library/react";

import LoginHistoriesEditDialogComponent from "../LoginHistoriesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders loginHistories edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginHistoriesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("loginHistories-edit-dialog-component")).toBeInTheDocument();
});

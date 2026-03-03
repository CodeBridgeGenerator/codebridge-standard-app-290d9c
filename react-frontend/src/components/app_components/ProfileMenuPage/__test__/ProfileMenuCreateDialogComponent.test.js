import React from "react";
import { render, screen } from "@testing-library/react";

import ProfileMenuCreateDialogComponent from "../ProfileMenuCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders profileMenu create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProfileMenuCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("profileMenu-create-dialog-component")).toBeInTheDocument();
});

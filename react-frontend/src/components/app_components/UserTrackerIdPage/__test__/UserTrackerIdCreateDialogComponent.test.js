import React from "react";
import { render, screen } from "@testing-library/react";

import UserTrackerIdCreateDialogComponent from "../UserTrackerIdCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userTrackerId create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserTrackerIdCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userTrackerId-create-dialog-component")).toBeInTheDocument();
});

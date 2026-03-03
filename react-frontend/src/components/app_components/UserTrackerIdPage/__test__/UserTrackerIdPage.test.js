import React from "react";
import { render, screen } from "@testing-library/react";

import UserTrackerIdPage from "../UserTrackerIdPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userTrackerId page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserTrackerIdPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userTrackerId-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userTrackerId-add-button")).toBeInTheDocument();
});

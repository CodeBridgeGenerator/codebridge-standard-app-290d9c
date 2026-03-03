import React from "react";
import { render, screen } from "@testing-library/react";

import ProfileMenuPage from "../ProfileMenuPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders profileMenu page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProfileMenuPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("profileMenu-datatable")).toBeInTheDocument();
    expect(screen.getByRole("profileMenu-add-button")).toBeInTheDocument();
});

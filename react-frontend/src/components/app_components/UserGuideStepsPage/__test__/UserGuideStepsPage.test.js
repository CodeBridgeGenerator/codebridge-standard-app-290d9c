import React from "react";
import { render, screen } from "@testing-library/react";

import UserGuideStepsPage from "../UserGuideStepsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userGuideSteps page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserGuideStepsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userGuideSteps-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userGuideSteps-add-button")).toBeInTheDocument();
});

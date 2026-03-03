import React from "react";
import { render, screen } from "@testing-library/react";

import UploaderPage from "../UploaderPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders uploader page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UploaderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("uploader-datatable")).toBeInTheDocument();
    expect(screen.getByRole("uploader-add-button")).toBeInTheDocument();
});

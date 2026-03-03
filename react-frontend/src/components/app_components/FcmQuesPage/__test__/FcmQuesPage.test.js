import React from "react";
import { render, screen } from "@testing-library/react";

import FcmQuesPage from "../FcmQuesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders fcmQues page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FcmQuesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fcmQues-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fcmQues-add-button")).toBeInTheDocument();
});

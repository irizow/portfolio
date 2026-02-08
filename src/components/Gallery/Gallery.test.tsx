import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Gallery from "./Gallery.tsx";
import userEvent from "@testing-library/user-event";

describe("Gallery", () => {
  it("shows three pictures", () => {
    const mockImages = [
      { src: "a", alt: "alt1" },
      { src: "a", alt: "alt2" },
      { src: "c", alt: "alt3" },
      { src: "d", alt: "alt0" },
    ];

    render(<Gallery images={mockImages} />);
    const renderedImages = screen.getAllByTestId("carousel-img");
    expect(renderedImages).toHaveLength(3);
  });
  it("Shows next and previous images according to user clicks", async () => {
    const firstImage = screen.getByAltText("alt0");
    const lastImage = screen.queryByAltText("alt3");
    expect(firstImage).toBeInTheDocument();
    expect(lastImage).not.toBeInTheDocument();
    const nextButton = screen.getByAltText(
      "icon of arrow to see the next picture",
    );
    const prevButton = screen.getByAltText(
      "icon of arrow to see the previous picture",
    );

    await userEvent.click(nextButton);
    await waitFor(
      () => {
        const firstImage = screen.queryByAltText("alt0");
        const lastImage = screen.queryByAltText("alt3");
        expect(firstImage).not.toBeInTheDocument();
        expect(lastImage).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    await userEvent.click(prevButton);
    await waitFor(
      () => {
        const firstImage = screen.queryByAltText("alt0");
        const lastImage = screen.queryByAltText("alt3");
        expect(firstImage).toBeInTheDocument();
        expect(lastImage).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});

import PlanetaryImage from './index.svelte';
import { render, fireEvent } from '@testing-library/svelte'
import "../../services/Planetary/Planetary.mocks";

const setImage = jest.fn();

const renderComponent = () => {
    return render(PlanetaryImage, {
        setCurrentImage: setImage
    });
};

describe('PlanetaryImage', () => {
    it("matches snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
    
    it('renders input', () => {
        const { container } = renderComponent();
        expect(container.querySelectorAll("input").length).toEqual(1);
    });
    
    it('renders "Search" button', () => {
        const { container, getAllByText } = renderComponent();
        expect(container.querySelectorAll("button[data-cy='SearchButton']").length).toEqual(1);
        expect(getAllByText("Search").length).toEqual(1);
    });

    it('renders "Photo of the Day" button', () => {
        const { container, getAllByText } = renderComponent();
        expect(container.querySelectorAll("button[data-cy='ApodButton']").length).toEqual(1);
        expect(getAllByText("Photo of the Day").length).toEqual(1);
    });

    it("should make a search request for given keyword", async () => {
        const { container } = renderComponent();
        const input = container.querySelector("input");
        await fireEvent.change(input, {target: {value: 'iapetus'}});

        const searchButton = container.querySelector("button[data-cy='SearchButton']");
        await fireEvent.click(searchButton);

        expect(setImage).toHaveBeenCalled();
    });
});

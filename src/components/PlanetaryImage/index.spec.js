import PlanetaryImage from './index.svelte';
import { render } from '@testing-library/svelte'

const renderComponent = () => {
    return render(PlanetaryImage, {
        setCurrentImage: () => {
            console.log("set current image");
        }
    });
}

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
});

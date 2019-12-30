import PlanetaryImage from "./index";
import { imageUrl, imageType, imageTitle, copyright, photoOfTheDay } from "@Store";

const apod = {
    url:"https://apod.nasa.gov/apod/image/1912/M20_volskiy1024.jpg",
    title:"Messier 20 and 21",
    type:"apod",
    copyright:"Stanislav Volskiy"
};

const setImage = image => {
    imageUrl.set(image.url);
    imageTitle.set(image.title);
    imageType.set(image.type);
    copyright.set(image.copyright);
};

photoOfTheDay.set(apod);
setImage(apod);

export default { title: "PlanetaryImage" }

export const basic = () => ({
    Component: PlanetaryImage,
    props:{
        setCurrentImage: setImage
    }
});

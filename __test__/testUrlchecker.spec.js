import { checkForUrl } from "../src/client/js/urlchecker";

describe("testing a valid url", () => {
    test("testing checkForUrl", () => {
        expect(checkForUrl("https://en.wikipedia.org/wiki/Hansel_and_Gretel")).toBe(true);
    });
    test("testing checkForUrl", () => {
        expect(checkForUrl("https://www.shortkidstories.com/story/pandora-boxed/")).toBe(true);
    });
    test("testing checkForUrl", () => {
        expect(checkForUrl("www.nytimes.com/2021/02/20/opinion/sunday/picture-books-reading.html")).toBe(true);
    });
    test("testing checkForUrl", () => {
        expect(checkForUrl("nytimes.com/2021/02/20/opinion/sunday/picture-books-reading.html")).toBe(true);
    });
    test("testing checkForUrl", () => {
        expect(checkForUrl("bad url")).toBe(false);
    });
});
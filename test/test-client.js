import {updateTime, getTime, parseApiResponse} from "../public/js/weather.js";
const assert = chai.assert;

describe("updateTime", () => {
    it("returns '05'", () => {
        const input = "5";
        const expected = "05";
        const result = updateTime(input);
        assert.equal(result, "05");
    });
    it("returns '10'", () => {
        const input = "10";
        const expected = "10";
        const result = updateTime(input);
        assert.equal(result, "10");
    });
});

describe("getTime", () => {
    it("returns object", () => {
        const expected = "object";
        const result = getTime();
        assert.equal(typeof result, expected);
    });
    it("returns object with a length of 2", () => {
        const expected = 2;
        const result = getTime();
        assert.equal(Object.keys(result).length, expected);
    });
});

describe("parseApiResponse", () => {
    const rawInput = `{
        "coord": {
          "lon": -122.08,
          "lat": 37.39
        },
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 282.55,
          "feels_like": 281.86,
          "temp_min": 280.37,
          "temp_max": 284.26,
          "pressure": 1023,
          "humidity": 100
        },
        "visibility": 16093,
        "wind": {
          "speed": 1.5,
          "deg": 350
        },
        "clouds": {
          "all": 1
        },
        "dt": 1560350645,
        "sys": {
          "type": 1,
          "id": 5122,
          "message": 0.0139,
          "country": "US",
          "sunrise": 1560343627,
          "sunset": 1560396563
        },
        "timezone": -25200,
        "id": 420006353,
        "name": "Mountain View",
        "cod": 200
        }`;

    it("returns an object", () => {
            const input = JSON.parse(rawInput);
            const expected = "object";
            const result = typeof parseApiResponse(input);
            assert.equal(result, expected);
    });
    it("returns object with a length of 8", () => {
        const input = JSON.parse(rawInput);
        const expected = 8;
        const result = Object.keys(parseApiResponse(input)).length;
        assert.equal(result, expected);
    });
});
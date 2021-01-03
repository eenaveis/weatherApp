/*-----------------------------------------------------------
Module imports*/

import {updateTime, 
  getTime, 
  parseApiResponse, 
  getWeatherCondition,
  updateWeather,
  createWeatherTable,
  getWeather} from "../public/js/weather.js";
const assert = chai.assert;
import {weatherApiResponse} from "./data/weather-api-response.js";
import {weatherData} from "./data/weather-data.js";

/*-----------------------------------------------------------
Test cases*/

describe("updateTime", () => {
    it("Returns '05'", () => {
      const input = "5";
      const expected = "05";
      const result = updateTime(input);
      assert.equal(result, "05");
    });
    it("Returns '10'", () => {
      const input = "10";
      const expected = "10";
      const result = updateTime(input);
      assert.equal(result, "10");
    });
});

describe("getTime", () => {
    it("Returns object", () => {
      const expected = "object";
      const result = getTime();
      assert.equal(typeof result, expected);
    });
    it("Returns object with a length of 2", () => {
      const expected = 2;
      const result = getTime();
      assert.equal(Object.keys(result).length, expected);
    });

    it("Returns correct time", () => {
      const clock = sinon.useFakeTimers(new Date(1995, 0, 1, 20, 20, 20));
      const expected = {hours: 20, minutes: 20};
      const result = getTime();
      assert.deepEqual(result, expected);
      clock.restore();
    });
});

describe("parseApiResponse", () => {
    it("Returns an object", () => {
      const input = weatherApiResponse;
      const expected = "object";
      const result = typeof parseApiResponse(input);
      assert.equal(result, expected);
    });
    it("Returns object with a length of 8", () => {
      const input = weatherApiResponse;
      const expected = 8;
      const result = Object.keys(parseApiResponse(input)).length;
      assert.equal(result, expected);
    });
});

describe("getWeatherCondition", () => {
  it("Returns string", () => {
    const result = getWeatherCondition("101");
    assert.equal(typeof result, "string");
  });
});

// Reset DOM objects
function resetElements() {
  const elements = [
    "city", "date", "temp", "condition", "feels-like", "secondary-data-table"];
  elements.forEach(element => {
    document.getElementById(element).innerHTML = "";
  });  
}

describe("updateWeather", () => {
  beforeEach(() => {
    updateWeather(weatherData);
  });

  afterEach(() => {
    resetElements();
  });

  it("Renders time", () => {
    const expected = 2;
    const result = document.getElementById("date")
      .innerHTML
      .split(" ")[2]
      .split(":")
      .length;
    assert.equal(result, expected);
  })
  
  it("Renders city", () => {
    const expected = true;
    const result = document.getElementById("city")
      .innerHTML
      .includes("Helsinki");
    assert.equal(result, expected);
  });

  it("Renders temperature", () => {
    const expected = true;
    const result = document.getElementById("temp")
      .innerHTML
      .includes("-10");
      assert.equal(result, expected);
  });

  it("Renders condition", () => {
    const expected = true;
    const result = document.getElementById("condition")
      .innerHTML
      .includes("breeze");
    assert.equal(result, expected);
  });

  it("Renders feels like", () => {
    const expected = true;
    const result = document.getElementById("feels-like")
      .innerHTML
      .includes("-12");
    assert.equal(result, expected);
  });

  it("Renders table with 3 rows", () => {
    const expected = 3;
    const result = document.getElementById("secondary-data-table").rows.length;
    assert.equal(result, expected);
  });
});

describe("createWeatherTable", () => {

  beforeEach(() => {
    createWeatherTable(1000, 77, 7.8);
  });

  afterEach(() => {
    resetElements();
  });

  it("Renders table with 3 rows", () => {
    const expected = 3;
    const result = document.getElementById("secondary-data-table").rows.length;
    assert.equal(result, expected);
  });
});

/*-----------------------------------------------------------
Module imports*/

import {updateTime, getTime, parseApiResponse} from "../public/js/weather.js";
const assert = chai.assert;
import {weatherApiResponse} from "./weather-api-response.js";

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
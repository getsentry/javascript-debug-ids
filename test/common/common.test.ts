import { describe, expect, test } from "vitest";
import { addDebugIdToSource } from "../../src/common";

describe("common", () => {
  describe("addDebugIdToSource", () => {
    test("adds debugId to source", () => {
      expect(addDebugIdToSource(`console.log('nothing')`, "000-000-000-000"))
        .toMatchInlineSnapshot(`
        "console.log('nothing')
        //# debugId=000-000-000-000
        "
      `);
    });

    test("adds debugId to source with sourceMapURL", () => {
      expect(
        addDebugIdToSource(
          `console.log('nothing');
//# sourceMappingURL=main.js.map`,
          "000-000-000-000"
        )
      ).toMatchInlineSnapshot(`
        "console.log('nothing');
        //# debugId=000-000-000-000
        //# sourceMappingURL=main.js.map"
      `);
    });
  });
});

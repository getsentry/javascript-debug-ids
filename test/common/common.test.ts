import { describe, expect, test } from 'vitest';
import { addDebugIdToSource } from '../../src/common';

describe('common', () => {
  describe('addDebugIdToSource', () => {
    test('adds debugId to source', () => {
      expect(addDebugIdToSource(`console.log('nothing')`, '000-000-000-000')).toMatchInlineSnapshot(`
        "console.log('nothing')
        //# debugId=000-000-000-000
        "
      `);
    });

    test('adds debugId to source with existing debugId', () => {
      expect(
        addDebugIdToSource(
          `console.log('nothing')
//# debugId=302a139c-0c62-4af7-bfd3-03d083925e5e`,
          '000-000-000-000',
        ),
      ).toMatchInlineSnapshot(`
        "console.log('nothing')
        //# debugId=000-000-000-000
        "
      `);
    });

    test('adds debugId to source with sourceMapURL', () => {
      expect(
        addDebugIdToSource(
          `console.log('nothing');
//# sourceMappingURL=main.js.map`,
          '000-000-000-000',
        ),
      ).toMatchInlineSnapshot(`
        "console.log('nothing');
        //# debugId=000-000-000-000
        //# sourceMappingURL=main.js.map"
      `);
    });
  });

  test('adds debugId to source with sourceMapURL and existing debugId', () => {
    expect(
      addDebugIdToSource(
        `console.log('nothing');
//# debugId=302a139c-0c62-4af7-bfd3-03d083925e5e
//# sourceMappingURL=main.js.map`,
        '000-000-000-000',
      ),
    ).toMatchInlineSnapshot(`
      "console.log('nothing');
      //# debugId=000-000-000-000
      //# sourceMappingURL=main.js.map"
    `);
  });
});

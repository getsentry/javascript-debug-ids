import { describe, expect, test } from 'vitest';
import { addDebugIdToSource, getDebugIdFromString } from '../../src/common';

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

  describe('getDebugIdFromString', () => {
    test('simple', () => {
      expect(
        getDebugIdFromString(`
console.log('here')
//# debugId=797b2e77-cda7-4d05-b93f-e4df1d24b5f6`),
      ).toBe('797b2e77-cda7-4d05-b93f-e4df1d24b5f6');
    });

    test('with sourcemap url', () => {
      expect(
        getDebugIdFromString(`
console.log('here')
//# debugId=b4b9bc99-7b69-4204-a399-e1899a41fc94
//# sourceMappingURL=main.js.map`),
      ).toBe('b4b9bc99-7b69-4204-a399-e1899a41fc94');
    });

    test('only matches last occurrence', () => {
      expect(
        getDebugIdFromString(`
console.log('here')
//# debugId=797b2e77-cda7-4d05-b93f-e4df1d24b5f6
console.log('here')
//# debugId=b4b9bc99-7b69-4204-a399-e1899a41fc94
//# sourceMappingURL=main.js.map`),
      ).toBe('b4b9bc99-7b69-4204-a399-e1899a41fc94');
    });
  });
});

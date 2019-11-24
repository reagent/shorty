import { UrlHasher } from './url-hasher.helper';

describe('UrlHasher', () => {
  describe('normalizedUrl', () => {
    it('downcases the URL', () => {
      const subject = new UrlHasher('HTTP://GOOGLE.COM');
      expect(subject.normalizedUrl).toEqual('http://google.com/');
    });

    it('does not change the case of the query string', () => {
      const subject = new UrlHasher('HTTP://GOOGLE.COM/?A=B&C=D');
      expect(subject.normalizedUrl).toEqual('http://google.com/?A=B&C=D');
    });

    it('reorders the GET params', () => {
      const subject = new UrlHasher('http://google.com/?c=d&a=b');
      expect(subject.normalizedUrl).toEqual('http://google.com/?a=b&c=d');
    });
  });

  describe('hash', () => {
    it('generates the same hash for the same URL', () => {
      const one = new UrlHasher('http://google.com');
      const two = new UrlHasher('http://google.com');

      expect(one.hash).toEqual(two.hash);
    });

    it('generates the same hash regardless of URL casing', () => {
      const one = new UrlHasher('http://google.com');
      const two = new UrlHasher('HTTP://GOOGLE.COM');

      expect(one.hash).toEqual(two.hash);
    });

    it('generates a different hash for trailing vs. no trailing slash', () => {
      const one = new UrlHasher('http://google.com/path/');
      const two = new UrlHasher('http://google.com/path');

      expect(one.hash).not.toEqual(two.hash);
    });

    it('generates the same hash for the same GET parameters in a different order', () => {
      const one = new UrlHasher('http://google.com/?a=b&c=d');
      const two = new UrlHasher('http://google.com/?c=d&a=b');

      expect(one.hash).toEqual(two.hash);
    });
  });
});

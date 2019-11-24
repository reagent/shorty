import { URLHasher } from './link.service';

describe('URLHasher', () => {
  describe('normalizedUrl', () => {
    it('downcases the URL', () => {
      let subject = new URLHasher('HTTP://GOOGLE.COM');
      expect(subject.normalizedUrl).toEqual('http://google.com/');
    });

    it('does not change the case of the query string', () => {
      let subject = new URLHasher('HTTP://GOOGLE.COM/?A=B&C=D');
      expect(subject.normalizedUrl).toEqual('http://google.com/?A=B&C=D');
    });

    it('reorders the GET params', () => {
      let subject = new URLHasher('http://google.com/?c=d&a=b');
      expect(subject.normalizedUrl).toEqual('http://google.com/?a=b&c=d');
    });
  });

  describe('hash', () => {
    it('generates the same hash for the same URL', () => {
      let one = new URLHasher('http://google.com');
      let two = new URLHasher('http://google.com');

      expect(one.hash).toEqual(two.hash);
    });

    it('generates the same hash regardless of URL casing', () => {
      let one = new URLHasher('http://google.com');
      let two = new URLHasher('HTTP://GOOGLE.COM');

      expect(one.hash).toEqual(two.hash);
    });

    it('generates a different hash for trailing vs. no trailing slash', () => {
      let one = new URLHasher('http://google.com/path/');
      let two = new URLHasher('http://google.com/path');

      expect(one.hash).not.toEqual(two.hash);
    });

    it('generates the same hash for the same GET parameters in a different order', () => {
      let one = new URLHasher('http://google.com/?a=b&c=d');
      let two = new URLHasher('http://google.com/?c=d&a=b');

      expect(one.hash).toEqual(two.hash);
    });
  });
});

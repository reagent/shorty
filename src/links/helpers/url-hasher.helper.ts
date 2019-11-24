import * as md5 from 'md5';
import * as URI from 'uri-js';

export class UrlHasher {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  get hash(): string {
    return md5(this.normalizedUrl);
  }

  get normalizedUrl(): string {
    const uri = URI.parse(this.url);

    if (uri.query) {
      uri.query = this.reorderQueryParams(uri.query);
    }

    return URI.normalize(URI.serialize(uri));
  }

  private reorderQueryParams(params: string): string {
    return params
      .split('&')
      .sort((a, b) => {
        const ax = a.split('=');
        const bx = b.split('=');

        if (ax[0] > bx[0]) {
          return 1;
        }
        if (ax[0] < bx[0]) {
          return -1;
        }

        return 0;
      })
      .join('&');
  }
}

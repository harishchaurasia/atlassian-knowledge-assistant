import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getContent', async (req) => {
  try {
    const response = await api.asApp().requestConfluence(
      route`/wiki/rest/api/content/search?cql=type=page`
    );
    const data = await response.json();

    if (response.ok && data.results.length > 0) {
      const titles = data.results.map((item) => item.title); // Return as an array
      return titles;
    } else if (response.ok) {
      return []; // Return an empty array if no content is found
    } else {
      return [`Failed to fetch content: ${data.message}`];
    }
  } catch (error) {
    return [`An unexpected error occurred: ${error.message}`];
  }
});

export const handler = resolver.getDefinitions();

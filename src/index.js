import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// resolver.define('searchContent', async (req) => {
//   const { cql } = req.payload; // Get CQL query from the frontend
//   console.log('Received CQL query:', cql);

//   try {
//     const response = await api.asApp().requestConfluence(
//       route`/wiki/rest/api/content/search?cql=${cql}`
//     );
//     const data = await response.json();

//     if (response.ok && data.results.length > 0) {
//       const titles = data.results.map((item) => item.title); // Return titles as an array
//       return titles;
//     } else if (response.ok) {
//       return []; // No results found
//     } else {
//       console.error(`Error fetching content: ${data.message}`);
//       return [`Failed to fetch content: ${data.message}`];
//     }
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return [`An unexpected error occurred: ${error.message}`];
//   }
// });

resolver.define('searchContent', async (req) => {
  const { cql } = req.payload; // Get CQL query from the frontend
  console.log('Received CQL query:', cql);

  try {
    const response = await api.asApp().requestConfluence(
      route`/wiki/rest/api/content/search?cql=${cql}`
    );
    const data = await response.json();

    if (response.ok && data.results.length > 0) {
      // Include more details in the results
      const contentDetails = data.results.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        url: `${req.context.siteUrl}/wiki${item._links.webui}`,
        createdDate: item.history.createdDate,
      }));
      return contentDetails;
    } else if (response.ok) {
      return []; // No results found
    } else {
      console.error(`Error fetching content: ${data.message}`);
      return [`Failed to fetch content: ${data.message}`];
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return [`An unexpected error occurred: ${error.message}`];
  }
});


export const handler = resolver.getDefinitions();

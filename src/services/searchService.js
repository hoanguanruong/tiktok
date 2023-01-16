import * as request from '~/utils/httpRequest';

export const search = async (search) => {
  try {
    const res = await request.get('product/search', {
      params: {
        search,
      },
    });
    return res.products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

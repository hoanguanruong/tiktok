import * as request from '~/utils/request';

export const search = async (search) => {
  try {
    const res = await request.get('search/getSearch', {
      params: {
        search,
      },
    });
    return res.products;
  } catch (error) {
    console.log(error);
  }
};

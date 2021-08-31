 import axios from 'axios';

const KEY = '22309735-f1ff37d55971be81fb077216b';

 const serviceApi = async (findImage, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${findImage}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data;
};
export default serviceApi;
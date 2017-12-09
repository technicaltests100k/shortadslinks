import Home from '../rootsContainers/Home';
import Advert from '../rootsContainers/Advert';

const staticRoutes = [
  {
    path: '/',
    exact: true,
    component: Home,
    routes: []
  },
  {
    path: '/:id',
    exact: true,
    component: Advert,
    routes: []
  }
];
export default staticRoutes;

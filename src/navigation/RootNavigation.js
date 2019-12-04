import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { zoomIn, fromRight } from 'react-navigation-transitions';


import Search from '../screen/Search';
import Details from '../screen/Details';
import SearchData from '../screen/SearchData';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Search'
    && nextScene.route.routeName === 'Details') {
    return zoomIn(500);
  } else if (prevScene
    && prevScene.route.routeName === 'Search'
    && nextScene.route.routeName === 'SearchData') {
    return fromRight(600);
  }
  return fromRight();
};

const RootNavigation = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: () => ({
      header: null
    }),
  },
  Details: {
    screen: Details,
    navigationOptions: () => ({
      headerTintColor: '#fff',
      headerTransparent: true
    }),
  },
  SearchData: {
    screen: SearchData,
    navigationOptions: () => ({
      headerTintColor: '#fff',
      header: null
    })
  },
}, { initialRouteName: 'Search', transitionConfig: (nav) => handleCustomTransition(nav) });

export default createAppContainer(RootNavigation);

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
    },
    {
        defaultNavigationOptions: {
            headerTitle: 'All Products',
            headerTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: 'white',
        },
    }
);

export default createAppContainer(ProductsNavigator);

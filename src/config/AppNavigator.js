import { StackNavigator } from 'react-navigation';

import Position from "../components/Position";
import ShowMap from "../components/ShowMap";

export const AppNavigator = StackNavigator({
    Position: { screen: Position },
    ShowMap: { screen: ShowMap }
});

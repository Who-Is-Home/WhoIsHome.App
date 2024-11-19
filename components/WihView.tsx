import {View, ViewStyle, type ViewProps} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  center?: "full" | "horizontal" | "vertical";
  flex?: "row" | "column";
  gap?: number;
  lightColor?: string;
  darkColor?: string;
};

const WihView = ({ style, center, gap, flex, lightColor, darkColor, ...otherProps }: ThemedViewProps) => {
  const backgroundColor = useThemeColor('background', { light: lightColor, dark: darkColor });

  const cStyle = center ? centerStyle[center] : {}
  const fStyle = flex ? flexStyle[flex] : {}
  const gStyle = gap ? {gap} : {};

  return <View style={[{ backgroundColor }, cStyle, fStyle, gStyle, style]} {...otherProps} />;
}

type CenterStyle = {
  full: ViewStyle;
  horizontal: ViewStyle;
  vertical: ViewStyle;
}

type FlexStyle = {
  row: ViewStyle;
  column: ViewStyle;
}

const flexStyle: FlexStyle = {
  row: {
    display: "flex",
    flexDirection: "row"
  },
  column: {
    display: "flex",
    flexDirection: "column"
  }
}

const centerStyle: CenterStyle = {
  full: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  horizontal: {
    flex: 1,
    alignItems: "center"
  },
  vertical: {
    flex: 1,
    justifyContent: "center"
  }
}

export default WihView;

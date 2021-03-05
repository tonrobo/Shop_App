import React from "react";
import { HeaderButton } from "react-navigation-header-buttons"; //remember these packages that need to be installed
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/color";

const MaterialHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={23}
      color="white"
    />
  );
};

const IosHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.primary}
    />
  );
};

export { MaterialHeaderButton, IosHeaderButton };

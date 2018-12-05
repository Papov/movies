import React from "react";
import { TabContext } from "../pages/Tabs/Tabs";

export default Component =>
  class TabsConsumer extends React.Component {
    render() {
      return (
        <TabContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </TabContext.Consumer>
      );
    }
  };

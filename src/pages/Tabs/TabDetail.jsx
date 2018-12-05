import React from "react";
import TabsConsumer from "../../HOC/TabsConsumer";
import { Table } from "reactstrap";

class TabDetail extends React.Component {
  render() {
    const { status } = this.props;
    return (
      <Table>
        <tbody>
          <tr>
            <th>Статус</th>
            <th>{status}</th>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default TabsConsumer(TabDetail);

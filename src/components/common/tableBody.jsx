import React, { Component } from "react";
import { withGetScreen } from "react-getscreen";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (item[column.path]) return _.get(item, column.path).toString();
    else return "";
  };

  renderColumnDependOnScreenSize = (props, item) => {
    const isMobile = props.isMobile();
    const { columns } = props;

    return columns.map(column => {
      return isMobile && !column.isResponsive ? null : (
        <td key={item.id + column.id}>{this.renderCell(item, column)}</td>
      );
    });
  };

  render() {
    const { items, isColored } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item.id} className={isColored && `${item.status}-bg`}>
            {this.renderColumnDependOnScreenSize(this.props, item)}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default withGetScreen(TableBody);
